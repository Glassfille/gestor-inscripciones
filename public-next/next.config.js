/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: new URL('..', import.meta.url).pathname,
  output: 'standalone'
};

export default nextConfig;
