/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //     config.resolve.fallback = {
  //       fs: false
  //     };
  //   }
  //   return config;
  // }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
