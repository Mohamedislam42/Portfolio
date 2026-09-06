import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Copy OG Image
const generatedOgPath = 'C:\\Users\\Mohamed Islam\\.gemini\\antigravity-ide\\brain\\f7a63704-cdc5-476a-9052-c33f5e6eb3e2\\og_image_1788655186881.jpg';
if (fs.existsSync(generatedOgPath)) {
  fs.copyFileSync(generatedOgPath, path.join(publicDir, 'og-image.png'));
  console.log('Copied og-image.png to public/');
}

// 2. SVG Favicon / Icon generator with "ME" Monogram
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5EEAD4" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#0A0A0F" />
  <rect x="16" y="16" width="480" height="480" rx="112" fill="none" stroke="url(#grad)" stroke-width="12" stroke-opacity="0.4" />
  <text x="256" y="325" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="200" fill="url(#grad)" text-anchor="middle" filter="url(#glow)">ME</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), svgIcon);

// Create a basic ICO / fallback icon files
// Simple 1x1 / raw PNG writer or SVG wrapper
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);

// 3. site.webmanifest
const manifest = {
  name: "Mohamed Elshourbagy — Portfolio",
  short_name: "Mohamed Elshourbagy",
  description: "Machine Learning Engineer & Computer Science / AI Student Portfolio",
  start_url: "/",
  display: "standalone",
  background_color: "#0A0A0F",
  theme_color: "#5EEAD4",
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml"
    },
    {
      src: "/icon.svg",
      sizes: "512x512",
      type: "image/svg+xml"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('Created site.webmanifest');

// 4. static robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://mohamedelshourbagy.com/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('Created robots.txt');

// 5. static sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mohamedelshourbagy.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
console.log('Created sitemap.xml');
