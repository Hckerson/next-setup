import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://{{APP_URL}}"; // Replace with actual domain

    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/waitlist`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        // Add dynamic routes as your app grows
        // {
        //   url: `${baseUrl}/mentor/some-code`,
        //   lastModified: new Date(),
        //   changeFrequency: 'daily',
        //   priority: 0.7,
        // },
    ];
}
