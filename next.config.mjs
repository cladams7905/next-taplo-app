/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF + ".supabase.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
        pathname: '/links/**',
      },
    ],
  },
};

export default nextConfig;
