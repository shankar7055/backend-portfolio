/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;