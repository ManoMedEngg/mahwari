/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is critical for GitHub Pages
  images: {
    unoptimized: true, // Static export doesn't support Next.js Image Optimization API
  },
  // If your site is at manomedengg.github.io/prodo, add:
  // basePath: '/prodo', 
};

export default nextConfig;
