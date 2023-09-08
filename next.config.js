/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        strapi_domain: process.env.BACKEND_API_DOMAIN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname: process.env.BACKEND_API_DOMAIN,
                port: '',
                pathname: '/*/**',
            }
        ],
    },
}

module.exports = nextConfig