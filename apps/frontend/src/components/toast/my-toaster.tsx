"use client"

import { Toaster } from "sonner"

export default function MyToaster() {
  return (
    <>
      <Toaster
        gap={10}
        position="top-center"
        style={{ fontFamily: "inherit" }}
      />
    </>
  )
}
