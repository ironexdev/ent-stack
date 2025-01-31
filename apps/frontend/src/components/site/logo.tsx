import { Link } from "expo-router"
import { Text } from "react-native"

export default function Logo() {
  return (
    <Link href="/" className="flex-row items-center">
      <Text>ENT Stack</Text>
    </Link>
  )
}
