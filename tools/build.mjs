// Builds the static site from src/ into the repo root (which Azure deploys as-is).
// Usage: node tools/build.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { page, NAV, SITE } from '../src/layout.mjs';
import { services } from '../src/content/services.mjs';
import { industries } from '../src/content/industries.mjs';
import { guides } from '../src/content/guides.mjs';
import { home } from '../src/pages/home.mjs';
import { servicesIndex, servicePage, industriesPage, guidesIndex, guidePage, notFound } from '../src/pages/inner.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = { services, industries, guides };

NAV.services = services;
NAV.guides = guides;

const pages = [
  {
    path: '/',
    title: 'McDonvick | Accountants & Tax Advisors, Harare',
    description: 'McDonvick – bookkeeping, accounting, ZIMRA tax advisory, payroll and company secretarial services for Zimbabwean businesses. 37 Lawson Avenue, Milton Park, Harare.',
    main: home(data),
  },
  servicesIndex(data),
  ...services.map(s => servicePage(s, data)),
  industriesPage(data),
  guidesIndex(data),
  ...guides.map(g => guidePage(g, data)),
  notFound(),
];

for (const p of pages) {
  const file = p.path.endsWith('.html') ? join(root, p.path) : join(root, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(p));
  console.log('wrote', p.path);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(p => !p.path.endsWith('.html')).map(p => p.path);
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`wrote sitemap.xml (${urls.length} URLs) and robots.txt`);
