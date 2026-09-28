// Homepage <main> content. This is the page the owner and most visitors see, so it
// carries a summary of everything: services, reasons, sectors, calendar, guides, contact.

import { SITE, esc, waLink } from '../layout.mjs';

const whyUs = [
  { icon: 'fas fa-user-tie', title: 'Qualified professionals', text: 'Trained accountants who keep up with every change in Zimbabwean tax and company law.' },
  { icon: 'fas fa-landmark', title: 'ZIMRA & TaRMS know-how', text: 'We deal with ZIMRA every day, from TaRMS registrations to audits, so you don\'t have to.' },
  { icon: 'fas fa-tag', title: 'Fixed, honest fees', text: 'A clear monthly or once-off price agreed in writing before we start. No surprise bills.' },
  { icon: 'fas fa-lock', title: 'Strict confidentiality', text: 'Your financial and payroll information is handled with complete discretion.' },
  { icon: 'fas fa-bolt', title: 'Fast turnaround', text: 'We work to your deadlines and ZIMRA\'s, and reply to every enquiry within 24 hours.' },
  { icon: 'fab fa-whatsapp', title: 'Easy to reach', text: 'Share documents and ask questions on WhatsApp or email. No need to take time off to visit us.' },
];

const problems = [
  { icon: 'fas fa-triangle-exclamation', q: 'We\'re behind on our ZIMRA returns', a: 'We find what\'s outstanding, file the missing returns and help you settle with ZIMRA.', service: 'tax-advisory' },
  { icon: 'fas fa-certificate', q: 'We need a tax clearance for a tender', a: 'We find what\'s blocking your ITF263 on TaRMS and fix it before the tender closes.', service: 'tax-advisory' },
  { icon: 'fas fa-rocket', q: 'I\'m starting a new business', a: 'Company or PBC registration, TIN, VAT and NSSA setup, handled from start to finish.', service: 'company-secretarial' },
  { icon: 'fas fa-box-open', q: 'Our books are a mess', a: 'We rebuild your records from bank statements and set up a routine that keeps them clean.', service: 'accounting-bookkeeping' },
  { icon: 'fas fa-user-plus', q: 'We\'re hiring our first employees', a: 'PAYE and NSSA registration, payslips and monthly submissions, all done for you.', service: 'payroll' },
  { icon: 'fas fa-building-columns', q: 'The bank wants a business plan', a: 'A bank-ready plan with credible projections and cash-flow forecasts.', service: 'business-consultancy' },
];

const faqs = [
  { q: 'Do you work with small businesses and start-ups?', a: 'Yes. A large share of our clients are SMEs and new businesses. We can register your company, set up your books and tax registrations, and grow our support as you grow.' },
  { q: 'How much do your services cost?', a: 'It depends on the size of your business and the services you need. After a free consultation we give you a fixed monthly or once-off fee in writing, with no hidden extras.' },
  { q: 'I\'m behind on my ZIMRA returns. Can you help?', a: 'Yes. We regularly help businesses bring overdue returns up to date, work out what is owed and engage ZIMRA on their behalf, including on payment arrangements where possible.' },
  { q: 'Can you help me get a tax clearance certificate?', a: 'Yes. Under ZIMRA\'s TaRMS system, tax clearance (ITF263) is issued to taxpayers who are up to date with all returns and payments. We find and fix whatever is holding yours back.' },
  { q: 'Do I need to register for VAT?', a: 'Registration is compulsory once your taxable supplies exceed, or are expected to exceed, US$25,000 (or the ZiG equivalent) in 12 months. Below that you can register voluntarily. We can advise which makes sense for you.' },
  { q: 'Do I need to come to your office?', a: 'No. Most clients share documents by email or WhatsApp and we meet online when needed. You\'re always welcome at our office at 37 Lawson Avenue, Milton Park.' },
  { q: 'Which accounting software do you use?', a: 'We work extensively with Pastel (Sage) and can work with the system you already use, or recommend one that fits your business.' },
  { q: 'Can I switch to McDonvick from another accountant?', a: 'Yes. We handle the handover: we request your records, check that filings are up to date and pick up from where things stand.' },
];

export function home({ services, industries, guides }) {
  const svcBySlug = Object.fromEntries(services.map(s => [s.slug, s]));
  const pad = n => String(n).padStart(2, '0');

  return `
        <!-- ========== HERO ========== -->
        <section class="hero" id="top">
            <div class="hero-media" aria-hidden="true">
                <img src="/assets/video/hero-poster.jpg" alt="" class="hero-poster" fetchpriority="high">
                <video class="hero-video" id="heroVideo" muted loop playsinline preload="none">
                    <source data-src="/assets/video/hero.webm" type="video/webm">
                    <source data-src="/assets/video/hero.mp4" type="video/mp4">
                </video>
                <div class="hero-shade"></div>
            </div>

            <div class="wrap hero-inner">
                <div class="hero-copy">
                    <p class="kicker anim"><span class="kicker-line"></span> Accountants &amp; Tax Advisors &middot; Harare</p>
                    <h1 class="anim">Your numbers,<br>in <em>expert</em> hands.</h1>
                    <p class="hero-lead anim">Bookkeeping, ZIMRA tax, payroll and company secretarial work for Zimbabwean businesses, done properly, on time and at a fair price.</p>
                    <div class="hero-ctas anim">
                        <a href="#contact" class="btn btn-gold">Book a free consultation <i class="fas fa-arrow-right"></i></a>
                        <a href="${waLink()}" class="btn btn-glass" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp us</a>
                    </div>
                </div>

                <aside class="deadline-card anim" aria-live="polite">
                    <p class="deadline-label"><i class="far fa-calendar"></i> Next ZIMRA deadline</p>
                    <p class="deadline-title" id="nextDeadlineTitle">Checking the calendar&hellip;</p>
                    <div class="deadline-meta">
                        <span id="nextDeadlineDate"></span>
                        <span class="deadline-days" id="nextDeadlineDays"></span>
                    </div>
                    <a href="#calendar" class="deadline-link">See the full tax calendar <i class="fas fa-arrow-right"></i></a>
                </aside>
            </div>

            <div class="hero-foot">
                <div class="wrap hero-foot-inner">
                    <span><i class="fas fa-shield-halved"></i> ZIMRA &amp; NSSA compliant</span>
                    <span><i class="fas fa-user-tie"></i> Qualified accountants</span>
                    <span><i class="fas fa-lock"></i> Strictly confidential</span>
                    <span><i class="fas fa-bolt"></i> Replies within 24 hours</span>
                </div>
            </div>
        </section>

        <!-- ========== MARQUEE ========== -->
        <div class="marquee" aria-hidden="true">
            <div class="marquee-track">
                ${Array(2).fill(['Tax Advisory', 'Bookkeeping', 'Annual Financial Statements', 'Payroll &amp; NSSA', 'Company Registration', 'Business Plans', 'Tax Clearance', 'TaRMS Support'].map(t => `<span>${t}</span><i>&#10022;</i>`).join('')).join('\n                ')}
            </div>
        </div>

        <!-- ========== INTRO + STATS ========== -->
        <section class="intro section" id="about">
            <div class="wrap intro-grid">
                <div class="intro-statement reveal">
                    <p class="eyebrow">About McDonvick</p>
                    <h2>A Zimbabwean practice built on <em>accuracy</em>, integrity and plain-spoken advice.</h2>
                </div>
                <div class="intro-body reveal">
                    <p>McDonvick is a Harare-based consultancy that supports start-ups, SMEs and established companies with the financial work that keeps a business healthy and compliant. We know ZIMRA, NSSA and Zimbabwean company law inside out, and we explain things in plain language so you can make confident decisions.</p>
                    <p>Every client gets a named accountant, a clear monthly routine and honest, fixed pricing agreed up front. Our aim is simple: quality, affordable financial services delivered with the highest ethical standards.</p>
                    <a href="#services" class="text-link">Explore our services <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="wrap">
                <div class="stats reveal">
                    <div class="stat"><strong><span class="count" data-count="10">10</span>+</strong><span>Years of practice</span></div>
                    <div class="stat"><strong><span class="count" data-count="200">200</span>+</strong><span>Businesses served</span></div>
                    <div class="stat"><strong><span class="count" data-count="5">5</span></strong><span>Core service lines</span></div>
                    <div class="stat"><strong><span class="count" data-count="24">24</span>h</strong><span>Response time</span></div>
                </div>
            </div>
            <div class="wrap intro-media reveal">
                <figure class="intro-img intro-img-a"><img src="/assets/images/accounting-892x558.jpg" alt="Accountant reviewing financial documents" loading="lazy"></figure>
                <figure class="intro-img intro-img-b"><img src="/assets/images/accounting.jpg" alt="Financial reports and calculator on a desk" loading="lazy"></figure>
                <blockquote class="intro-quote">
                    &ldquo;Quality, affordable financial services with the highest ethical standards.&rdquo;
                    <cite>Our promise</cite>
                </blockquote>
            </div>
        </section>

        <!-- ========== SERVICES ========== -->
        <section class="services section dark" id="services">
            <div class="wrap services-grid">
                <div class="services-intro reveal">
                    <p class="eyebrow">What we do</p>
                    <h2>Five services. <em>One</em> trusted partner.</h2>
                    <p>From day-to-day bookkeeping to year-end statements and ZIMRA correspondence, one team handles the whole picture, so nothing falls through the cracks.</p>
                    <div class="services-intro-ctas">
                        <a href="#contact" class="btn btn-gold">Get a quote <i class="fas fa-arrow-right"></i></a>
                        <a href="/services/" class="btn btn-glass">All services</a>
                    </div>
                </div>

                <div class="service-list">
                    ${services.map((s, i) => `
                    <details class="service reveal"${i === 0 ? ' open' : ''}>
                        <summary>
                            <span class="service-num">${pad(i + 1)}</span>
                            <span class="service-title">${esc(s.name)}</span>
                            <span class="service-toggle" aria-hidden="true"></span>
                        </summary>
                        <div class="service-body">
                            <p>${esc(s.summary)}</p>
                            <ul>
                                ${s.included.slice(0, 6).map(it => `<li>${esc(it.title)}</li>`).join('\n                                ')}
                            </ul>
                            <a href="/services/${s.slug}/" class="service-more">Learn more about ${esc(s.name)} <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </details>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== WHY US ========== -->
        <section class="why section" id="why">
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">Why McDonvick</p>
                    <h2>The smart choice for <em>your</em> business.</h2>
                    <p>Big-firm expertise with the personal attention and pricing a growing Zimbabwean business needs.</p>
                </div>
                <div class="why-grid">
                    ${whyUs.map(w => `
                    <article class="why-card reveal">
                        <span class="why-icon"><i class="${w.icon}"></i></span>
                        <h3>${esc(w.title)}</h3>
                        <p>${esc(w.text)}</p>
                    </article>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== PROBLEMS WE SOLVE ========== -->
        <section class="problems section tint" id="problems">
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">Sound familiar?</p>
                    <h2>Problems we solve <em>every</em> week.</h2>
                    <p>Whatever brought you here, chances are we've helped a business in the same position.</p>
                </div>
                <div class="problem-grid">
                    ${problems.map(p => `
                    <a class="problem reveal" href="/services/${p.service}/">
                        <span class="problem-icon"><i class="${p.icon}"></i></span>
                        <h3>&ldquo;${esc(p.q)}&rdquo;</h3>
                        <p>${esc(p.a)}</p>
                        <span class="problem-link">${esc(svcBySlug[p.service].name)} <i class="fas fa-arrow-right"></i></span>
                    </a>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== PROCESS ========== -->
        <section class="process section">
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">How we work</p>
                    <h2>Simple from the <em>first</em> conversation.</h2>
                </div>
                <ol class="steps">
                    <li class="step reveal"><span class="step-num">01</span><h3>Free consultation</h3><p>We learn about your business, your deadlines and where you need help.</p></li>
                    <li class="step reveal"><span class="step-num">02</span><h3>Fixed-fee proposal</h3><p>A clear scope and a monthly or once-off price. No surprises.</p></li>
                    <li class="step reveal"><span class="step-num">03</span><h3>Onboarding</h3><p>We collect your records, tidy up any backlog and set a routine.</p></li>
                    <li class="step reveal"><span class="step-num">04</span><h3>Ongoing support</h3><p>Monthly work, deadline reminders and a direct line to your accountant.</p></li>
                </ol>
            </div>
        </section>

        <!-- ========== INDUSTRIES ========== -->
        <section class="sectors-home section dark" id="industries">
            <div class="wrap">
                <div class="split-head reveal">
                    <div>
                        <p class="eyebrow">Industries</p>
                        <h2>We know <em>your</em> sector.</h2>
                    </div>
                    <div>
                        <p>Every industry has its own records, tax issues and pressures. We tailor our work to how your business actually runs.</p>
                        <a href="/industries/" class="btn btn-glass">See how we help each sector <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="sector-grid">
                    ${industries.map(ind => `
                    <a class="sector-tile reveal" href="/industries/#${ind.id}">
                        <i class="${ind.icon}"></i>
                        <span>${esc(ind.name)}</span>
                    </a>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== TEAM ========== -->
        <!-- TODO(client content): replace names, roles, bios and add photos (assets/images/team-*.jpg),
             then remove \`hidden\` here and add "Team" links back to the header and footer -->
        <section class="team section tint" id="team" hidden>
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">Our people</p>
                    <h2>The accountants behind <em>your</em> books.</h2>
                </div>
                <div class="founder reveal">
                    <div class="founder-photo"><span class="monogram">MD</span></div>
                    <div class="founder-copy">
                        <p class="eyebrow">Founder &amp; Principal Accountant</p>
                        <h3>[Founder name]</h3>
                        <p class="founder-quals">[Qualifications, e.g. CA(Z), ACCA, CIMA]</p>
                        <p>[Short bio: background, years in practice, areas of specialism and why they started McDonvick.]</p>
                        <blockquote>&ldquo;[A one-line personal promise to clients from the founder.]&rdquo;</blockquote>
                    </div>
                </div>
                <div class="team-grid">
                    <article class="member reveal"><div class="member-photo"><span class="monogram">TA</span></div><h3>[Team member]</h3><p>Tax Consultant</p></article>
                    <article class="member reveal"><div class="member-photo"><span class="monogram">BK</span></div><h3>[Team member]</h3><p>Senior Bookkeeper</p></article>
                    <article class="member reveal"><div class="member-photo"><span class="monogram">PA</span></div><h3>[Team member]</h3><p>Payroll Administrator</p></article>
                </div>
            </div>
        </section>

        <!-- ========== TAX CALENDAR ========== -->
        <section class="calendar section" id="calendar">
            <div class="wrap calendar-grid">
                <div class="calendar-intro reveal">
                    <p class="eyebrow">Tax calendar</p>
                    <h2>Never miss a <em>ZIMRA</em> deadline.</h2>
                    <p>Late returns and payments attract penalties and interest. These are the key dates most Zimbabwean businesses work to. We track them for every client.</p>
                    <ul class="calendar-key">
                        <li><strong>10th monthly</strong> PAYE &amp; NSSA for the previous month</li>
                        <li><strong>25th monthly</strong> VAT return &amp; payment</li>
                        <li><strong>QPDs</strong> 25 Mar (10%) &middot; 25 Jun (25%) &middot; 25 Sep (30%) &middot; 20 Dec (35%)</li>
                        <li><strong>30 April</strong> Annual income tax return (ITF12C)</li>
                    </ul>
                    <p class="fineprint">General guidance only. Your dates depend on your VAT category and registrations. Ask us to confirm yours. <a href="/guides/qpd-provisional-tax/">How QPDs work &rarr;</a></p>
                </div>
                <div class="calendar-list reveal">
                    <h3>Coming up</h3>
                    <ol id="deadlineList" class="deadlines">
                        <li class="deadline-skeleton">Loading upcoming deadlines&hellip;</li>
                    </ol>
                    <a href="${waLink('Hi McDonvick, I\'d like help staying on top of my ZIMRA deadlines.')}" class="btn btn-navy" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> Get deadline reminders</a>
                </div>
            </div>
        </section>

        <!-- ========== TESTIMONIALS ========== -->
        <!-- TODO(client content): replace with real client testimonials (with their permission), then remove \`hidden\` -->
        <section class="testimonials section dark" hidden>
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">Client stories</p>
                    <h2>Trusted by businesses across <em>Zimbabwe</em>.</h2>
                </div>
                <div class="quotes" tabindex="0" aria-label="Client testimonials">
                    ${[1, 2, 3].map(n => `
                    <figure class="quote reveal">
                        <div class="stars" aria-label="5 out of 5">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                        <blockquote>&ldquo;[Client testimonial: what McDonvick helped them with and the result.]&rdquo;</blockquote>
                        <figcaption><span class="avatar">C${n}</span><span><strong>[Client name]</strong>[Role, Company]</span></figcaption>
                    </figure>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== GUIDES ========== -->
        <section class="guides-home section tint" id="guides">
            <div class="wrap">
                <div class="split-head reveal">
                    <div>
                        <p class="eyebrow">Tax guides</p>
                        <h2>Plain-English answers to <em>ZIMRA</em> questions.</h2>
                    </div>
                    <div>
                        <p>Free guides from our team on the tax and compliance questions Zimbabwean businesses ask us most.</p>
                        <a href="/guides/" class="text-link">All tax guides <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="guide-grid">
                    ${guides.slice(0, 3).map(g => guideCard(g)).join('')}
                </div>
            </div>
        </section>

        <!-- ========== FAQ ========== -->
        <section class="faq section" id="faq">
            <div class="wrap faq-grid">
                <div class="faq-intro reveal">
                    <p class="eyebrow">FAQ</p>
                    <h2>Questions we hear <em>often</em>.</h2>
                    <p>Can't find your answer? Send us a message and a qualified accountant will reply within 24 hours.</p>
                    <a href="#contact" class="text-link">Ask us anything <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="faq-list">
                    ${faqs.map(f => `
                    <details class="faq-item reveal">
                        <summary>${esc(f.q)}</summary>
                        <p>${esc(f.a)}</p>
                    </details>`).join('')}
                </div>
            </div>
        </section>

        <!-- ========== CONTACT ========== -->
        <section class="contact section tint" id="contact">
            <div class="wrap">
                <div class="section-head reveal">
                    <p class="eyebrow">Contact</p>
                    <h2>Book your <em>free</em> consultation.</h2>
                    <p>Tell us a little about your business. We'll reply within 24 hours, usually much sooner.</p>
                </div>
                <div class="contact-grid">
                    <!--
                        FORM: while action contains YOUR_FORM_ID, submissions open WhatsApp with the message pre-filled.
                        To receive submissions by email instead, create a free form at https://formspree.io and paste its URL here.
                    -->
                    <form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
                        <div class="field-row">
                            <label class="field"><span>Full name *</span><input type="text" name="name" id="name" required autocomplete="name"></label>
                            <label class="field"><span>Phone / WhatsApp *</span><input type="tel" name="phone" id="phone" required autocomplete="tel" placeholder="077X XXX XXX"></label>
                        </div>
                        <div class="field-row">
                            <label class="field"><span>Email</span><input type="email" name="email" id="email" autocomplete="email"></label>
                            <label class="field"><span>Service</span>
                                <select name="service" id="service">
                                    <option value="">Choose a service&hellip;</option>
                                    ${services.map(s => `<option>${esc(s.name)}</option>`).join('\n                                    ')}
                                    <option>Something else</option>
                                </select>
                            </label>
                        </div>
                        <label class="field"><span>How can we help? *</span><textarea name="message" id="message" rows="5" required></textarea></label>
                        <button type="submit" class="btn btn-gold btn-block" id="submitBtn"><span>Send message</span> <i class="fas fa-paper-plane"></i></button>
                        <p class="form-status" id="formStatus" role="status" hidden></p>
                    </form>

                    <div class="contact-side reveal">
                        <div class="contact-card">
                            <a href="${waLink()}" class="contact-row" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i><span><small>WhatsApp</small>${SITE.phone}</span></a>
                            <div class="contact-row"><i class="fas fa-phone"></i><span><small>Phone</small><a href="tel:+263773234268">0773 234 268</a> &middot; <a href="tel:+263713944311">0713 944 311</a><br><a href="tel:+263772850542">0772 850 542</a> &middot; <a href="tel:+263775653898">0775 653 898</a></span></div>
                            <a href="mailto:${SITE.email}" class="contact-row"><i class="fas fa-envelope"></i><span><small>Email</small>${SITE.email}</span></a>
                            <div class="contact-row"><i class="fas fa-location-dot"></i><span><small>Office</small>${SITE.address}</span></div>
                            <div class="hours">
                                <div><span>Mon â€“ Fri</span><span>8:00 â€“ 17:00</span></div>
                                <div><span>Saturday</span><span>9:00 â€“ 13:00</span></div>
                                <div><span>Sunday</span><span>Closed</span></div>
                            </div>
                        </div>
                        <div class="map">
                            <iframe title="Map to McDonvick, 37 Lawson Avenue, Milton Park, Harare" src="https://www.google.com/maps?q=37+Lawson+Avenue,+Milton+Park,+Harare,+Zimbabwe&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
}

export function guideCard(g) {
  return `
                    <a class="guide-card reveal" href="/guides/${g.slug}/">
                        <span class="guide-icon"><i class="${g.icon}"></i></span>
                        <h3>${esc(g.title)}</h3>
                        <p>${esc(g.summary)}</p>
                        <span class="guide-link">Read the guide <i class="fas fa-arrow-right"></i></span>
                    </a>`;
}
