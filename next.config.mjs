/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/Bike-website' : '';

const nextConfig = {
  ...(isGithubPages
    ? {
        output: 'export',
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isGithubPages ? 'true' : 'false',
  },
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'c02.purpledshub.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'resources.specialized.com' },
      { protocol: 'https', hostname: 'www.yt-industries.com' },
      { protocol: 'https', hostname: 'dma.canyon.com' },
      { protocol: 'https', hostname: 'media.trekbikes.com' },
      { protocol: 'https', hostname: 'yeticycles-prod.zaneray.com' },
      { protocol: 'https', hostname: 'www.commencal.com' },
      { protocol: 'https', hostname: 'ibiscycles.imgix.net' },
      { protocol: 'https', hostname: 'www.santacruzbicycles.com' },
      { protocol: 'https', hostname: 'cdn.media.amplience.net' },
      { protocol: 'https', hostname: 'd1mo5ln9tjltxq.cloudfront.net' },
      { protocol: 'https', hostname: 'static.giant-bicycles.com' },
    ],
  },
};

export default nextConfig;
