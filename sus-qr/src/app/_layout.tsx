import { Stack, usePathname } from 'expo-router'
import '@/global.css'
import { View, Image } from 'react-native'
import { Navbar } from '@/components/navbar'

export default function RootLayout() {
  const pathname = usePathname()

  return (
    <>
      {pathname.includes('/detail') ? null : <Navbar />}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
