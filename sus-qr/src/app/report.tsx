import { Text, View } from 'react-native'
import { Navbar } from '@/components/navbar'

export default function Report() {
  return (
    <View className="flex-1 bg-background">
      <View className="px-8 pt-8 pb-8 w-full rounded-b-[24px]">
        <Text className="text-4xl font-bold text-foreground">Report</Text>
      </View>
    </View>
  )
}
