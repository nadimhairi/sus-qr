import { Link } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'

export function QrCard({ card }: { card: { id: number } }) {
  return (
    <Link href={`/detail/${card.id}`} asChild>
      <Pressable className="w-[48%] mb-6 rounded-4xl shadow-lg">
        <Image
          source={require('@/../assets/images/qr-example1.png')}
          className="w-full h-48 rounded-4xl"
          resizeMode="cover"
        />
      </Pressable>
    </Link>
  )
}
