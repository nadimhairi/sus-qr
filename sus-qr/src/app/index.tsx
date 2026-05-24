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
  const [lastScanResult, setLastScanResult] = useState<string | null>(null)

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
        quality: 1,
        base64: true,
      })

      if (!result.canceled) {
        const asset = result.assets[0]
        const uri = asset.uri
        const base64 = asset.base64

        if (!base64) {
          Alert.alert(
            'Image error',
            'Could not read image data from the selected file.',
          )
          return
        }

        setSelectedImage(uri)
      }
    } catch (error) {
      console.error('Error scanning QR image:', error)
      Alert.alert('Error', 'Failed to scan the selected image.')
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
          className="mt-8 rounded-[24px] border border-dashed border-primary/40 bg-primary/5 px-8 py-12 items-center"
        >
          <ScanQrCode color="#EE3872" size={36} />
          <Text className="mt-3 text-center text-lg font-semibold text-primary">
            Scan new QR image
          </Text>
          <Text className="mt-1 text-center text-sm text-foreground/70">
            Select an image from your library
          </Text>
        </Pressable>

        {selectedImage ? (
          <View className="mt-6 items-center">
            <Image
              source={{ uri: selectedImage }}
              className="h-48 w-full rounded-[24px]"
              resizeMode="contain"
            />
            {lastScanResult ? (
              <Text className="mt-3 text-center text-sm font-medium text-foreground">
                Decoded QR: {lastScanResult}
              </Text>
            ) : null}
          </View>
        ) : null}

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
