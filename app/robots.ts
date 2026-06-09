import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://playwork.vercel.app'; // Replace with actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Example of disallowed routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
