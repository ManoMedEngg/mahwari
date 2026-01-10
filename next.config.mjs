/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // 1. Enable static export
  output: 'export',
  
  // 2. Set the base path (replace 'mahwari' with your actual repo name)
  basePath: isProd ? '/mahwari' : '',
  
  // 3. Required for GitHub Pages to serve images correctly
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
