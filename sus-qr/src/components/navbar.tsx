import { Pressable, View, Image } from 'react-native'
import { QrCode, OctagonAlert, Cog } from 'lucide-react-native'
import { usePathname } from 'expo-router'
import { cn } from '@/lib/utils'
import { Link } from 'expo-router'

export function Navbar() {
  const pathname = usePathname()

  return (
    <View className="bg-background">
      <View className="px-8 pt-16 pb-8 w-full bg-primary rounded-b-[24px]">
        <View className="flex-row items-center justify-between mt-6">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/images/logo-sus-qr.png')}
              className="size-20"
            />
          </View>
          <View className="flex flex-row items-center rounded-full bg-white/40 p-1">
            <Link href="/" asChild>
              <Pressable
                className={cn(
                  'rounded-full px-6 py-2',
                  pathname === '/' && 'bg-primary',
                )}
              >
                <QrCode color="white" size={24} />
              </Pressable>
            </Link>

            <Link href="/report" asChild>
              <Pressable
                className={cn(
                  'rounded-full px-6 py-2',
                  pathname === '/report' && 'bg-primary',
                )}
              >
                <OctagonAlert color="white" size={24} />
              </Pressable>
            </Link>

            <Link href="/setting" asChild>
              <Pressable
                className={cn(
                  'rounded-full px-6 py-2',
                  pathname === '/setting' && 'bg-primary',
                )}
              >
                <Cog color="white" size={24} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  )
}
