/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
