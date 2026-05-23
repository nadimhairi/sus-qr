import '@/global.css'
import { Image } from 'expo-image'
import { ScrollView, Text, View } from 'react-native'

const detectedQRCards = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  bank: 'BANK ISLAM',
  name: 'ENCIK AHMAD ATIF BIN MOHA',
}))

export default function App() {
  return (
    <ScrollView
      className="flex-1 bg-[#f43f72]"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="px-4 pt-10">
        <View className="rounded-[42px] bg-white/12 border border-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: '/assets/images/logo-sus-qr.png' }}
                className="h-14 w-14 rounded-3xl bg-white/10"
              />
              <View className="ml-4">
                <Text className="text-2xl font-bold text-white">sus QR</Text>
                <Text className="text-sm text-white/70">
                  Scan and review detected codes
                </Text>
              </View>
            </View>
            <View className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
              <Text className="text-[10px] uppercase tracking-[0.24em] text-white/75">
                Live
              </Text>
            </View>
          </View>

          <View className="mt-6 flex-row items-center justify-between rounded-[24px] bg-white/10 p-2">
            <View className="flex-1 rounded-[24px] bg-white/20 px-4 py-3">
              <Text className="text-center text-sm font-semibold text-white">
                QR
              </Text>
            </View>
            <View className="mx-2 h-10 w-[1px] bg-white/20" />
            <View className="flex-1 items-center rounded-[24px] bg-transparent px-4 py-3">
              <Text className="text-center text-sm font-semibold text-white/80">
                Flag
              </Text>
            </View>
            <View className="mx-2 h-10 w-[1px] bg-white/20" />
            <View className="flex-1 items-center rounded-[24px] bg-transparent px-4 py-3">
              <Text className="text-center text-sm font-semibold text-white/80">
                Filter
              </Text>
            </View>
          </View>

          <View className="mt-6 rounded-[34px] border border-white/15 bg-white/10 p-7 shadow-lg shadow-black/10">
            <View className="flex-row items-center justify-center rounded-[28px] border border-dashed border-white/20 bg-white/7 px-5 py-12">
              <View className="items-center justify-center rounded-3xl bg-white/15 p-4">
                <Text className="text-2xl font-extrabold text-white/80">+</Text>
              </View>
            </View>
            <Text className="mt-4 text-center text-lg font-semibold text-white">
              Scan new QR
            </Text>
            <Text className="mt-1 text-center text-sm text-white/70">
              Place the QR code inside the camera area to start scanning
            </Text>
          </View>
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-white">Detected QR</Text>
          <Text className="text-sm font-medium text-white/70">6 items</Text>
        </View>

        <View className="mt-4 flex-row flex-wrap justify-between gap-3">
          {detectedQRCards.map((card) => (
            <View
              key={card.id}
              className="w-[48%] rounded-[28px] bg-white p-4 shadow-lg shadow-black/10"
            >
              <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.bank}
              </Text>
              <Text className="mt-3 text-sm font-semibold text-slate-900">
                {card.name}
              </Text>
              <View className="mt-4 h-24 items-center justify-center rounded-[24px] bg-pink-50">
                <Text className="text-3xl font-bold text-pink-600">QR</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
