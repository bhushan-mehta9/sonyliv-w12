/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    API_BASE_PATH: process.env.API_BASE_PATH,
  }
});

module.exports = nextConfig
