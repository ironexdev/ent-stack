const nextConfig = {
  output: "standalone",
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/static/favicon.ico",
      },
    ]
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    })

    return config
  },
}

export default nextConfig
