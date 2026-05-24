import { ScrollView, Text, View } from 'react-native'
import {
  useLocalSearchParams,
  useGlobalSearchParams,
  Link,
  Stack,
} from 'expo-router'
import { Back } from '@/components/back'

export default function Detail() {
  const glob = useGlobalSearchParams()
  const local = useLocalSearchParams()
  return (
    <View className="flex-1 bg-background">
      <Back />
      <ScrollView
        className="px-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text className="mt-6 text-2xl font-bold text-primary">
          {`Detail for QR ID: ${local.id}`}
        </Text>
        <Text className="text-lg text-primary/70">BANK ISLAM</Text>
        <Text className="mt-4 text-xl font-semibold text-primary">
          RM 1,234.56
        </Text>
      </ScrollView>
    </View>
  )
}
