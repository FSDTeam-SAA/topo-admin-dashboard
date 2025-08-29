/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
        hostname: 'files.edgestore.dev',
        protocol: 'https',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
=======
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
>>>>>>> mamun
      },
    ],
  },
}

export default nextConfig
