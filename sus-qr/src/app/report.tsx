import { useCallback, useState } from 'react'
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ScanQrCode } from 'lucide-react-native'
import { Navbar } from '@/components/navbar'

export default function Report() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState('')

  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'We need access to your photo library to upload QR images.',
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
      base64: false,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }, [])

  const handleSubmit = useCallback(() => {
    if (!selectedImage) {
      Alert.alert(
        'Missing image',
        'Please upload the QR image before sending the report.',
      )
      return
    }

    if (!reportReason.trim()) {
      Alert.alert('Missing reason', 'Please add a brief reason for the report.')
      return
    }

    Alert.alert('Report submitted', 'Thank you for reporting this QR code.')
    setSelectedImage(null)
    setReportReason('')
  }, [reportReason, selectedImage])

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="px-8"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mt-8 rounded-[24px] border border-border bg-surface p-6 shadow-sm">
          <Text className="text-3xl font-bold text-foreground">
            Report QR Code
          </Text>
          <Text className="mt-2 text-sm text-foreground/70">
            Upload the QR image and add a reason for the report. We will review
            it soon.
          </Text>
        </View>

        <Pressable
          onPress={handlePickImage}
          className="mt-8 rounded-[24px] border border-dashed border-primary/40 bg-primary/5 p-8 items-center"
        >
          <ScanQrCode color="#EE3872" size={36} />
          <Text className="mt-3 text-center text-lg font-semibold text-primary">
            Upload QR image
          </Text>
          <Text className="mt-1 text-center text-sm text-foreground/70">
            Select an image from your library
          </Text>
        </Pressable>

        {selectedImage ? (
          <View className="mt-6 overflow-hidden rounded-[24px] border border-border bg-surface">
            <Image
              source={{ uri: selectedImage }}
              className="h-52 w-full"
              resizeMode="contain"
            />
          </View>
        ) : null}

        <View className="mt-8">
          <Text className="mb-3 text-base font-semibold text-foreground">
            Report reason
          </Text>
          <TextInput
            value={reportReason}
            onChangeText={setReportReason}
            placeholder="Describe why this QR code should be reported"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={5}
            className="h-36 rounded-[20px] border border-border bg-surface px-4 py-4 text-base text-foreground"
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          className="mt-8 rounded-[24px] bg-primary px-6 py-4 items-center"
        >
          <Text className="text-base font-semibold text-primary-foreground">
            Submit report
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
