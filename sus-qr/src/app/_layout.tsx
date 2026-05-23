import { Stack } from 'expo-router'
import '@/global.css'
import { View, Image } from 'react-native'
import { Navbar } from '@/components/navbar'

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
