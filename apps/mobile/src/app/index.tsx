import React from "react"
import { Text, View } from "react-native"
import { TRPCReactProvider } from "@mobile/trpc/trpc-client-react"
import { t_homeTitle } from "@shared/i18n/messages/t-home"
import { LocaleEnum } from "@shared/enums/locale-enum"
import { env } from "@mobile/env"

export default function Index() {
  return (
    <TRPCReactProvider>
      <View style={{ padding: 24 }}>
        <Text>{t_homeTitle(LocaleEnum.EN)}</Text>
        <Text style={{ color: "purple" }}>Hello, NativeWind!</Text>
        <Text>{env.EXPO_PUBLIC_BACKEND_URL}</Text>
      </View>
    </TRPCReactProvider>
  )
}
