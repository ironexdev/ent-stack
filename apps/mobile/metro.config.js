const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

// https://github.com/t3-oss/t3-env/issues/260
config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = [
  "browser",
  ...config.resolver.unstable_conditionNames,
]

module.exports = withNativeWind(config, { input: "./src/styles/global.css" })
