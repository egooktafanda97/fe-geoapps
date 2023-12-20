/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        BACKEND_URL_PREFIX: process.env.BACKEND_URL_PREFIX,
    },
}

module.exports = nextConfig
