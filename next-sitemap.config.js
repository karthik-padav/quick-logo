/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => [
    { loc: "/", lastmod: new Date().toISOString() },
    { loc: "/privacy-policy", lastmod: new Date().toISOString() },
    { loc: "/terms-and-conditions", lastmod: new Date().toISOString() },
  ],
};

// "postbuild": "next-sitemap"
