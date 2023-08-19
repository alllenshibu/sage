/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.imagin.studio"]
    },
    //Server actions
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            "img.etimg.com",
            "assets.vogue.com",
            "m.media-amazon.com",
            "upload.wikimedia.org",
        ],
    },
}

module.exports = nextConfig
