const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  env: {
    BACKEND_DOMAIN: 'https://backend.aaafuria.site',
    NEXT_PUBLIC_GA_ID: 'G-K5LPGWWJL1',
    PUBLIC_AWS_URI: 'https://aaafuria-reborn.s3.sa-east-1.amazonaws.com/public',
  },
});
