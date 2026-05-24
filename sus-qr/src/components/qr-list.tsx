import { View } from 'react-native'
import { QrCard } from './qr-card'

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
        <QrCard key={card.id} card={card} />
      ))}
    </View>
  )
}
