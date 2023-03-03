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
  env: {
    appName: "Inventorific",
    mongodbUsername: "Tester",
    mongodbPassword: "Testerpassword",
    GOOGLE_CLIENT_ID: "6267564248-vrh1ihqf25o6267lodf84ckk28ao1r7d.apps.googleusercontent.com",
    GOOGLE_CLIENT_SEC: "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"
  }
};

module.exports = nextConfig;
