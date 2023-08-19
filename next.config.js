/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.imagin.studio"]
    },
    //Server actions
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
