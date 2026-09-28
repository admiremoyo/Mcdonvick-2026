// Templates for the inner pages: services, industries, guides and 404.

import { esc, waLink, pageHero, ctaBand, breadcrumbJsonLd, SITE } from '../layout.mjs';
import { guideCard } from './home.mjs';

const fmtDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/* ── /services/ ───────────────────────────────────────────── */
export function servicesIndex({ services }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Services', href: '/services/' }];
  return {
    path: '/services/',
    title: 'Accounting, Tax & Payroll Services in Harare',
    description: 'Accounting and bookkeeping, ZIMRA tax advisory, payroll, company secretarial and business consultancy services for Zimbabwean businesses.',
    section: 'services',
    jsonld: [breadcrumbJsonLd(trail)],
    main: `${pageHero({
      trail,
      eyebrow: 'Our services',
      title: 'Everything your business needs, <em>under one roof</em>.',
      lead: 'Five core services that cover the full financial life of a Zimbabwean business, from registration to year-end and beyond.',
      actions: `<a href="/#contact" class="btn btn-gold">Book a free consultation <i class="fas fa-arrow-right"></i></a>`,
    })}
        <section class="section">
            <div class="wrap">
                <div class="svc-cards">
                    ${services.map((s, i) => `
                    <a class="svc-card reveal" href="/services/${s.slug}/">
                        <span class="svc-card-num">${String(i + 1).padStart(2, '0')}</span>
                        <span class="svc-card-icon"><i class="${s.icon}"></i></span>
                        <h2>${esc(s.name)}</h2>
                        <p>${esc(s.summary)}</p>
                        <ul>${s.included.slice(0, 4).map(it => `<li>${esc(it.title)}</li>`).join('')}</ul>
                        <span class="svc-card-link">View service <i class="fas fa-arrow-right"></i></span>
                    </a>`).join('')}
                    <div class="svc-card svc-card-cta reveal">
                        <h2>Not sure what you need?</h2>
                        <p>Tell us where your business is today and we'll recommend the right mix of services, with a fixed price.</p>
                        <a href="${waLink('Hi McDonvick, I\'m not sure which services I need. Can you advise?')}" class="btn btn-gold" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> Ask on WhatsApp</a>
                    </div>
                </div>
            </div>
        </section>
${ctaBand()}`,
  };
}

/* ── /services/<slug>/ ────────────────────────────────────── */
export function servicePage(s, { services, guides }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Services', href: '/services/' }, { name: s.name, href: `/services/${s.slug}/` }];
  const wa = `Hi McDonvick, I'd like to find out more about your ${s.name} service.`;
  const related = s.guides.map(slug => guides.find(g => g.slug === slug)).filter(Boolean);
  const others = services.filter(o => o.slug !== s.slug);
  return {
    path: `/services/${s.slug}/`,
    title: `${s.name} in Harare, Zimbabwe`,
    description: `${s.lead} McDonvick, 37 Lawson Avenue, Milton Park, Harare.`,
    section: 'services',
    jsonld: [breadcrumbJsonLd(trail), {
      '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name,
      description: s.lead, areaServed: 'Zimbabwe', provider: { '@id': `${SITE.url}/#business` },
    }, {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: s.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }],
    main: `${pageHero({
      trail,
      eyebrow: 'Service',
      title: esc(s.name),
      lead: esc(s.lead),
      actions: `<a href="/#contact" class="btn btn-gold">Book a free consultation <i class="fas fa-arrow-right"></i></a>
                    <a href="${waLink(wa)}" class="btn btn-glass" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp us</a>`,
    })}
        <section class="section">
            <div class="wrap detail-grid">
                <div class="detail-main">
                    <div class="prose reveal">
                        ${s.intro.map(p => `<p>${esc(p)}</p>`).join('\n                        ')}
                    </div>

                    <h2 class="detail-h reveal">What's <em>included</em></h2>
                    <div class="included-grid">
                        ${s.included.map(it => `
                        <div class="included reveal">
                            <span class="included-icon"><i class="${it.icon}"></i></span>
                            <h3>${esc(it.title)}</h3>
                            <p>${esc(it.text)}</p>
                        </div>`).join('')}
                    </div>

                    <div class="two-lists">
                        <div class="list-card reveal">
                            <h2>Who it's <em>for</em></h2>
                            <ul class="checklist">${s.forWho.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
                        </div>
                        <div class="list-card reveal">
                            <h2>What we'll <em>need</em></h2>
                            <ul class="checklist">${s.need.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
                        </div>
                    </div>

                    <h2 class="detail-h reveal">Common <em>questions</em></h2>
                    <div class="faq-list">
                        ${s.faqs.map(f => `
                        <details class="faq-item reveal">
                            <summary>${esc(f.q)}</summary>
                            <p>${esc(f.a)}</p>
                        </details>`).join('')}
                    </div>
                </div>

                <aside class="detail-side">
                    <div class="side-card">
                        <p class="eyebrow">Get started</p>
                        <h3>Free, no-obligation consultation</h3>
                        <p>Tell us about your business and we'll send a fixed-fee proposal.</p>
                        <a href="/#contact" class="btn btn-gold btn-block">Book a consultation</a>
                        <a href="${waLink(wa)}" class="btn btn-wa btn-block" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                        <a href="tel:${SITE.phoneIntl}" class="side-phone"><i class="fas fa-phone"></i> ${SITE.phone}</a>
                    </div>
                    ${related.length ? `
                    <div class="side-links">
                        <p class="eyebrow">Related guides</p>
                        ${related.map(g => `<a href="/guides/${g.slug}/"><i class="${g.icon}"></i> ${esc(g.short)}</a>`).join('')}
                    </div>` : ''}
                    <div class="side-links">
                        <p class="eyebrow">Other services</p>
                        ${others.map(o => `<a href="/services/${o.slug}/"><i class="${o.icon}"></i> ${esc(o.name)}</a>`).join('')}
                    </div>
                </aside>
            </div>
        </section>
${ctaBand(`Let's get your <em>${esc(s.name)}</em> sorted.`, wa)}`,
  };
}

/* ── /industries/ ─────────────────────────────────────────── */
export function industriesPage({ industries, services }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Industries', href: '/industries/' }];
  const svc = Object.fromEntries(services.map(s => [s.slug, s]));
  return {
    path: '/industries/',
    title: 'Industries We Serve',
    description: 'Accounting, tax and payroll support tailored to Zimbabwean SMEs, retail, construction, agriculture, NGOs, transport, healthcare and professional services.',
    section: 'industries',
    jsonld: [breadcrumbJsonLd(trail)],
    main: `${pageHero({
      trail,
      eyebrow: 'Industries',
      title: 'Accounting that understands <em>your</em> sector.',
      lead: 'Every industry has its own records, tax issues and pressures. Here is how we help businesses like yours stay compliant and in control.',
      actions: `<a href="/#contact" class="btn btn-gold">Talk to us about your business <i class="fas fa-arrow-right"></i></a>`,
    })}
        <section class="section">
            <div class="wrap industry-list">
                ${industries.map(ind => `
                <article class="industry reveal" id="${ind.id}">
                    <div class="industry-head">
                        <span class="industry-icon"><i class="${ind.icon}"></i></span>
                        <h2>${esc(ind.name)}</h2>
                    </div>
                    <div class="industry-body">
                        <p class="industry-challenge"><strong>The challenge:</strong> ${esc(ind.challenges)}</p>
                        <ul class="checklist">${ind.help.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
                        <p class="industry-services">${ind.services.map(sl => `<a href="/services/${sl}/">${esc(svc[sl].name)}</a>`).join('')}</p>
                    </div>
                </article>`).join('')}
            </div>
        </section>
${ctaBand('Don\'t see your industry? <em>We can still help.</em>')}`,
  };
}

/* ── /guides/ ─────────────────────────────────────────────── */
export function guidesIndex({ guides }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Tax Guides', href: '/guides/' }];
  return {
    path: '/guides/',
    title: 'Zimbabwe Tax Guides for Businesses',
    description: 'Free plain-English guides to ZIMRA QPDs, tax clearance (ITF263), VAT registration, PAYE and NSSA, and company registration in Zimbabwe.',
    section: 'guides',
    jsonld: [breadcrumbJsonLd(trail)],
    main: `${pageHero({
      trail,
      eyebrow: 'Tax guides',
      title: 'Plain-English answers to <em>ZIMRA</em> questions.',
      lead: 'Free guides from the McDonvick team on the tax and compliance questions Zimbabwean businesses ask us most.',
    })}
        <section class="section">
            <div class="wrap">
                <div class="guide-grid">
                    ${guides.map(g => guideCard(g)).join('')}
                </div>
                <p class="fineprint guides-note">These guides are general information, not advice for your specific situation. Tax rules change, so always confirm with us or ZIMRA before acting.</p>
            </div>
        </section>
${ctaBand('Prefer someone to just <em>handle it</em>?')}`,
  };
}

/* ── /guides/<slug>/ ──────────────────────────────────────── */
export function guidePage(g, { guides, services }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Tax Guides', href: '/guides/' }, { name: g.short, href: `/guides/${g.slug}/` }];
  const toc = [...g.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map(m => ({ id: m[1], text: m[2] }));
  const words = g.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const mins = Math.max(2, Math.round(words / 200));
  const svcs = g.services.map(sl => services.find(s => s.slug === sl)).filter(Boolean);
  const more = guides.filter(o => o.slug !== g.slug).slice(0, 3);
  return {
    path: `/guides/${g.slug}/`,
    title: g.title,
    description: g.summary,
    section: 'guides',
    jsonld: [breadcrumbJsonLd(trail), {
      '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.summary,
      dateModified: g.reviewed, author: { '@type': 'Organization', name: 'McDonvick' },
      publisher: { '@id': `${SITE.url}/#business` }, mainEntityOfPage: `${SITE.url}/guides/${g.slug}/`,
    }],
    main: `${pageHero({
      trail,
      eyebrow: `Tax guide &middot; ${mins} min read`,
      title: esc(g.title),
      lead: esc(g.summary),
    })}
        <section class="section">
            <div class="wrap detail-grid">
                <article class="detail-main">
                    <p class="article-meta"><i class="far fa-calendar-check"></i> Last reviewed ${fmtDate(g.reviewed)}</p>
                    <div class="prose article">
                        ${g.body}
                    </div>
                    <div class="sources">
                        <p class="eyebrow">Sources</p>
                        <ul>${g.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)} <i class="fas fa-arrow-up-right-from-square"></i></a></li>`).join('')}</ul>
                        <p class="fineprint">This guide is general information, not advice for your specific situation. Tax rules change, so confirm with us or ZIMRA before acting.</p>
                    </div>
                </article>

                <aside class="detail-side">
                    <nav class="side-links toc" aria-label="On this page">
                        <p class="eyebrow">On this page</p>
                        ${toc.map(t => `<a href="#${t.id}">${esc(t.text)}</a>`).join('')}
                    </nav>
                    <div class="side-card">
                        <p class="eyebrow">Need help with this?</p>
                        <h3>Let McDonvick handle it</h3>
                        <p>We deal with ZIMRA every day. Send us your question and a qualified accountant will reply within 24 hours.</p>
                        <a href="${waLink(`Hi McDonvick, I read your guide "${g.short}" and need some help.`)}" class="btn btn-wa btn-block" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> Ask on WhatsApp</a>
                        <a href="/#contact" class="btn btn-gold btn-block">Book a consultation</a>
                    </div>
                    <div class="side-links">
                        <p class="eyebrow">Related services</p>
                        ${svcs.map(s => `<a href="/services/${s.slug}/"><i class="${s.icon}"></i> ${esc(s.name)}</a>`).join('')}
                    </div>
                </aside>
            </div>
        </section>

        <section class="section tint">
            <div class="wrap">
                <div class="split-head reveal">
                    <div><p class="eyebrow">Keep reading</p><h2>More <em>tax guides</em></h2></div>
                    <div><a href="/guides/" class="text-link">All tax guides <i class="fas fa-arrow-right"></i></a></div>
                </div>
                <div class="guide-grid">${more.map(o => guideCard(o)).join('')}</div>
            </div>
        </section>
${ctaBand()}`,
  };
}

/* ── 404 ──────────────────────────────────────────────────── */
export function notFound() {
  return {
    path: '/404.html',
    title: 'Page not found',
    description: 'The page you were looking for could not be found.',
    main: `${pageHero({
      trail: [{ name: 'Home', href: '/' }, { name: 'Page not found', href: '/404.html' }],
      eyebrow: 'Error 404',
      title: 'That page <em>isn\'t here</em>.',
      lead: 'It may have moved, or the link may be mistyped. These pages might help:',
      actions: `<a href="/" class="btn btn-gold">Go to the homepage</a>
                    <a href="/services/" class="btn btn-glass">Our services</a>
                    <a href="/guides/" class="btn btn-glass">Tax guides</a>`,
    })}`,
  };
}
