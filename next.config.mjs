/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is required for GitHub Pages
  output: 'export',
  
  // MUST be empty for custom root domains (mahwari.app)
  basePath: '', 
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
