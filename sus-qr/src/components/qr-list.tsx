import { Image, View } from 'react-native'

const detectedQRCards = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  bank: 'BANK ISLAM',
  name: 'ENCIK AHMAD ATIF BIN MOHA',
  amount: 'RM 1,234.56',
}))

export function QrList() {
  return (
    <View className="mt-4 flex-row flex-wrap justify-between">
      {detectedQRCards.map((card) => (
        <View key={card.id} className="w-[48%] mb-6">
          <Image
            source={require('@/../assets/images/logo-sus-qr.png')}
            className="w-full h-48 rounded-xl shadow-md shadow-primary/05"
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  )
}
