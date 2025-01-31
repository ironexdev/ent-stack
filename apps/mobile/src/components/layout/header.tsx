import React, { ReactNode } from "react"
import { View } from "react-native"

type HeaderProps = {
  children: ReactNode
  className?: string
}

export default function Header({ children, className = "" }: HeaderProps) {
  return (
    <View
      className={`bg-primary header-based-h border-fade-header absolute left-0 right-0 top-0 z-30 w-full ${className}`}
    >
      <View className="relative w-full flex-row items-center justify-between px-5">
        {children}
      </View>
    </View>
  )
}
