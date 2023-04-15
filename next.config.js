/** @type {import('next').NextConfig} */
const nextConfig = {
  
}

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'img.pokemondb.net',
      },
    ],
  }
}