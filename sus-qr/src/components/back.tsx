import { Pressable, View, Image, Text } from 'react-native'
import { QrCode, OctagonAlert, Cog, ChevronLeft } from 'lucide-react-native'
import { usePathname } from 'expo-router'
import { cn } from '@/lib/utils'
import { Link } from 'expo-router'

export function Back() {
  const pathname = usePathname()

  return (
    <View className="bg-background">
      <View className="px-8 pt-16 pb-8 w-full bg-primary rounded-b-[24px]">
        <View className="flex-row items-center justify-between mt-6">
          <Link href="/" asChild>
            <Pressable className="rounded-full px-6 py-2 flex-row items-center gap-2">
              <ChevronLeft color="white" size={24} />
              <Text className="text-primary-foreground font-semibold">
                Back
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}
