import { Text, View } from "react-native"
import { t_homeTitle } from "@shared/i18n/messages/t-home"
import { LocaleEnum } from "@shared/enums/locale-enum"

export default function Index() {
  return (
    <View>
      <Text>{t_homeTitle(LocaleEnum.EN)}</Text>
      <Text className="text-xs text-purple-600">Hello, NativeWind!</Text>
    </View>
  )
}
