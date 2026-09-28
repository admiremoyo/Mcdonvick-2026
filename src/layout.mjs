// Shared page shell: <head>, header, footer and reusable blocks.
// Every page on the site is rendered through page() so the menu and footer stay in sync.

export const SITE = {
  url: 'https://mcdonvick.co.zw',
  name: 'McDonvick',
  tagline: 'Accountants & Tax Advisors',
  phone: '0773 234 268',
  phoneIntl: '+263773234268',
  whatsapp: '263773234268',
  email: 'mcdonvick@gmail.com',
  address: '37 Lawson Avenue, Milton Park, Harare',
  // Bump on every CSS/JS change: Cloudflare lets browsers cache assets for 4 hours
  assetVersion: 4,
};

export const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const waLink = text =>
  `https://wa.me/${SITE.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;

// Filled in by build.mjs so the menu and footer can list services and guides
export const NAV = { services: [], guides: [] };

function header(section) {
  const cur = name => (section === name ? ' aria-current="page"' : '');
  return `
    <header class="site-header" id="header">
        <div class="wrap header-inner">
            <a href="/" class="brand" aria-label="McDonvick home">
                <span class="brand-mark">M</span>
                <span class="brand-name">McDonvick<small>${SITE.tagline.replace('&', '&amp;')}</small></span>
            </a>
            <nav class="main-nav" id="mainNav" aria-label="Main">
                <div class="nav-group">
                    <a href="/services/"${cur('services')}>Services <i class="fas fa-chevron-down nav-caret" aria-hidden="true"></i></a>
                    <div class="subnav">
                        ${NAV.services.map(s => `<a href="/services/${s.slug}/"><i class="${s.icon}" aria-hidden="true"></i> ${esc(s.name)}</a>`).join('\n                        ')}
                    </div>
                </div>
                <a href="/industries/"${cur('industries')}>Industries</a>
                <a href="/guides/"${cur('guides')}>Tax Guides</a>
                <a href="/#about">About</a>
                <a href="/#contact">Contact</a>
                <a href="/#contact" class="btn btn-gold nav-mobile-cta">Book a Free Consultation</a>
            </nav>
            <div class="header-actions">
                <a href="tel:${SITE.phoneIntl}" class="header-phone"><i class="fas fa-phone"></i> ${SITE.phone}</a>
                <a href="/#contact" class="btn btn-gold btn-sm">Free Consultation</a>
                <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">
                    <span></span><span></span>
                </button>
            </div>
        </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
        <div class="wrap footer-grid">
            <div class="footer-brand">
                <a href="/" class="brand">
                    <span class="brand-mark">M</span>
                    <span class="brand-name">McDonvick<small>Accountants &amp; Tax Advisors</small></span>
                </a>
                <p>Quality, affordable accounting and tax services for Zimbabwean businesses, with integrity at every step.</p>
                <a href="${waLink()}" class="footer-wa" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
            </div>
            <div>
                <h4>Services</h4>
                <ul>
                    ${NAV.services.map(s => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`).join('\n                    ')}
                </ul>
            </div>
            <div>
                <h4>Tax Guides</h4>
                <ul>
                    ${NAV.guides.slice(0, 5).map(g => `<li><a href="/guides/${g.slug}/">${esc(g.short)}</a></li>`).join('\n                    ')}
                </ul>
            </div>
            <div>
                <h4>Visit</h4>
                <p>37 Lawson Avenue<br>Milton Park, Harare</p>
                <p><a href="tel:${SITE.phoneIntl}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
                <p>Mon â€“ Fri 8:00 â€“ 17:00<br>Sat 9:00 â€“ 13:00</p>
            </div>
        </div>
        <div class="wrap footer-bar">
            <p>&copy; <span id="year">2026</span> McDonvick. All rights reserved.</p>
            <p><a href="/industries/">Industries</a> &middot; <a href="/guides/">Tax Guides</a> &middot; <a href="/#contact">Contact</a></p>
        </div>
    </footer>

    <a href="${waLink()}" class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat with McDonvick on WhatsApp"><i class="fab fa-whatsapp"></i></a>`;
}

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  url: `${SITE.url}/`,
  image: `${SITE.url}/assets/video/hero-poster.jpg`,
  email: SITE.email,
  telephone: SITE.phoneIntl,
  address: { '@type': 'PostalAddress', streetAddress: '37 Lawson Avenue, Milton Park', addressLocality: 'Harare', addressCountry: 'ZW' },
  areaServed: 'Zimbabwe',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
};

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: SITE.url + t.href })),
  };
}

export function breadcrumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((t, i) =>
    i === trail.length - 1
      ? `<li aria-current="page">${esc(t.name)}</li>`
      : `<li><a href="${t.href}">${esc(t.name)}</a></li>`).join('')}</ol></nav>`;
}

export function pageHero({ trail, eyebrow, title, lead, actions = '' }) {
  return `
        <section class="page-hero">
            <div class="page-hero-media" aria-hidden="true">
                <img src="/assets/video/hero-poster.jpg" alt="">
                <div class="page-hero-shade"></div>
            </div>
            <div class="wrap page-hero-inner">
                ${breadcrumbs(trail)}
                ${eyebrow ? `<p class="kicker"><span class="kicker-line"></span> ${eyebrow}</p>` : ''}
                <h1>${title}</h1>
                ${lead ? `<p class="page-hero-lead">${lead}</p>` : ''}
                ${actions ? `<div class="hero-ctas">${actions}</div>` : ''}
            </div>
        </section>`;
}

export function ctaBand(title = 'Ready to take the stress out of <em>tax season</em>?', waText) {
  return `
        <section class="cta-band">
            <div class="wrap cta-inner reveal">
                <h2>${title}</h2>
                <div class="cta-actions">
                    <a href="/#contact" class="btn btn-gold">Book a free consultation</a>
                    <a href="${waLink(waText)}" class="btn btn-glass" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp us</a>
                </div>
            </div>
        </section>`;
}

export function page({ path, title, description, section, main, jsonld = [], ogImage }) {
  const canonical = SITE.url + path;
  const fullTitle = path === '/' ? title : `${title} | McDonvick`;
  const ld = [orgJsonLd, ...jsonld].map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n    ');
  const v = SITE.assetVersion;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(fullTitle)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="theme-color" content="#0b1a2c">
    <link rel="canonical" href="${canonical}">
    <meta property="og:site_name" content="McDonvick">
    <meta property="og:title" content="${esc(fullTitle)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE.url}${ogImage || '/assets/video/hero-poster.jpg'}">
    <link rel="icon" type="image/png" href="/assets/images/macdonvich.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/assets/css/site.css?v=${v}">
    <script>document.documentElement.classList.add('js');</script>
    ${ld}
</head>
<body>
    <!-- Generated by tools/build.mjs from src/ â€” edit the source files, not this output. -->
    <a class="skip-link" href="#main">Skip to content</a>
${header(section)}

    <main id="main">
${main}
    </main>
${footer()}

    <script src="/assets/js/site.js?v=${v}"></script>
</body>
</html>
`;
}
