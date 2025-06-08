const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */

const remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
  },
  {
    protocol: "https",
    hostname: "strapi-production-d28d.up.railway.app",
  },
  {
    protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https") ? "https" : "http",
    hostname: process.env.NEXT_PUBLIC_BASE_URL
      ? process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, "")
      : "example.com",
  },
  {
    protocol: "https",
    hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
      ? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.replace("https://", "")
      : "localhost",
  },
  {
    protocol: "https",
    hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "medusa-server-testing.s3.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
  },
]

if (process.env.NEXT_PUBLIC_MINIO_ENDPOINT) {
  remotePatterns.push({
    protocol: "https",
    hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
  })
}

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns,
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },
}

module.exports = nextConfig
