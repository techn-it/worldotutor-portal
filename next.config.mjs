import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
    experimental: {
    appDir: true, // ✅ if you're using the App Router
  },
    eslint: {
    ignoreDuringBuilds: true, // ignore ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: true, // ignore generated type errors
  },
  webpack: (webpackConfig) => {
    
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
