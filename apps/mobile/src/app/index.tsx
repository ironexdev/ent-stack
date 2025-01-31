import React from "react"
import { Text, View } from "react-native"
import { TRPCReactProvider } from "@mobile/trpc/trpc-client-react"
import { t_homeTitle } from "@shared/i18n/messages/t-home"
import { LocaleEnum } from "@shared/enums/locale-enum"
import Header from "@mobile/components/layout/header"

export default function Index() {
  return (
    <TRPCReactProvider>
      <View className="header-based-pt desktop-w-md:px-10 bg-primary flex min-h-full w-full flex-col items-center px-5">
        <Text className="text-primary">{t_homeTitle(LocaleEnum.EN)}</Text>
      </View>
    </TRPCReactProvider>
  )
}
