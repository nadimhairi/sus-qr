import { QrList } from '@/components/qr-list'
import '@/global.css'
import { Image, Pressable } from 'react-native'
import { ScrollView, Text, View } from 'react-native'
import { ScanQrCode } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState, useCallback } from 'react'
import { Alert } from 'react-native'

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleScanQR = useCallback(async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'We need access to your photo library to upload QR images.',
        )
        return
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        const uri = result.assets[0].uri
        setSelectedImage(uri)
        // TODO: Process the selected image (send to API for QR decoding)
        Alert.alert('Image Selected', `Image ready for processing: ${uri}`)
      }
    } catch (error) {
      console.error('Error picking image:', error)
      Alert.alert('Error', 'Failed to pick image. Please try again.')
    }
  }, [])

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="px-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Pressable
          onPress={handleScanQR}
          className="mt-8 rounded-[24px] bg-primary border border-primary p-12 items-center"
        >
          <ScanQrCode className="mx-auto" color="white" size={40} />
          <Text className="mt-2 text-center text-xl font-bold text-primary-foreground">
            Scan new QR
          </Text>
          <Text className="mt-1 text-center text-sm font-medium text-white/70">
            Upload DuitNow QR image
          </Text>
        </Pressable>
        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-foreground">
            Detected QR
          </Text>
          <Text className="text-sm font-medium text-foreground/70">
            6 items
          </Text>
        </View>

        <QrList />
      </ScrollView>
    </View>
  )
}
