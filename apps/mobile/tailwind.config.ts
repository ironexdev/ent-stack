import type { Config } from "tailwindcss"
import nativeWindPreset from "nativewind/preset"

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust to fit your monorepo paths
  presets: [nativeWindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
