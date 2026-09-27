/* ============================================================
   MCDONVICK — Site script (2026 redesign)
   ============================================================ */

'use strict';

const WHATSAPP_NUMBER = '263773234268';

/* ── HEADER ─────────────────────────────────────────────────── */
(function initHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
  }
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Highlight the nav link for the section in view
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
})();

/* ── HERO VIDEO ─────────────────────────────────────────────── */
(function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;

  // Keep the poster image for reduced motion, data-saver and 2G connections.
  // 3G still gets the video: it's ~0.5 MB and only fades in once it can play.
  const conn = navigator.connection;
  const slow = conn && (conn.saveData || /2g$/.test(conn.effectiveType || ''));
  if (slow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  video.querySelectorAll('source[data-src]').forEach(source => { source.src = source.dataset.src; });
  video.load();
  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });

  // Only play while the hero is on screen
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }).observe(video);
})();

/* ── ZIMRA DEADLINES ────────────────────────────────────────── */
(function initDeadlines() {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const SHORT  = MONTHS.map(m => m.slice(0, 3));

  // Recurring dates most Zimbabwean businesses work to (general guidance only)
  function deadlinesFor(year, month) {
    const prev = MONTHS[(month + 11) % 12];
    const items = [
      { day: 10, name: 'PAYE & NSSA', note: `Remittance for ${prev}` },
      { day: 25, name: 'VAT return', note: 'Return & payment for the previous period' },
    ];
    const qpd = { 2: ['1st QPD', '10%', 25], 5: ['2nd QPD', '25%', 25], 8: ['3rd QPD', '30%', 25], 11: ['4th QPD', '35%', 20] }[month];
    if (qpd) items.push({ day: qpd[2], name: qpd[0], note: `Provisional tax, ${qpd[1]} of the year's estimate` });
    if (month === 3) items.push({ day: 30, name: 'Income tax return', note: `ITF12C for the ${year - 1} tax year` });
    return items.map(i => ({ ...i, date: new Date(year, month, i.day) }));
  }

  const today = new Date(); today.setHours(0, 0, 0, 0);
  let upcoming = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    upcoming.push(...deadlinesFor(d.getFullYear(), d.getMonth()));
  }
  upcoming = upcoming.filter(d => d.date >= today).sort((a, b) => a.date - b.date);

  // Merge deadlines that fall on the same day (e.g. VAT + QPD on the 25th)
  const grouped = [];
  upcoming.forEach(d => {
    const last = grouped[grouped.length - 1];
    if (last && last.date.getTime() === d.date.getTime()) {
      last.name += ' + ' + d.name;
      last.note += ' · ' + d.note;
    } else grouped.push({ ...d });
  });

  const daysUntil = date => Math.round((date - today) / 86400000);
  const inText = n => n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : `in ${n} days`;

  const next = grouped[0];
  const title = document.getElementById('nextDeadlineTitle');
  if (next && title) {
    title.textContent = next.name;
    document.getElementById('nextDeadlineDate').textContent = `${next.date.getDate()} ${MONTHS[next.date.getMonth()]}`;
    document.getElementById('nextDeadlineDays').textContent = inText(daysUntil(next.date));
  }

  const list = document.getElementById('deadlineList');
  if (list) {
    list.innerHTML = '';
    grouped.slice(0, 6).forEach(d => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="dl-date"><b>${d.date.getDate()}</b><small>${SHORT[d.date.getMonth()]}</small></span>
        <span class="dl-name"></span>
        <span class="dl-in">${inText(daysUntil(d.date))}</span>`;
      const name = li.querySelector('.dl-name');
      name.textContent = d.name;
      const note = document.createElement('small');
      note.textContent = d.note;
      name.appendChild(note);
      list.appendChild(li);
    });
  }
})();

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));
})();

/* ── COUNT-UP ───────────────────────────────────────────────── */
(function initCountUp() {
  const counters = document.querySelectorAll('.count');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const start = performance.now();
      const step = now => {
        const t = Math.min((now - start) / 1600, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => { el.textContent = '0'; observer.observe(el); });
})();

/* ── CONTACT FORM ───────────────────────────────────────────── */
(function initContactForm() {
  const form   = document.getElementById('contactForm');
  const button = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  if (!form) return;

  const showStatus = (text, isError) => {
    status.textContent = text;
    status.classList.toggle('error', !!isError);
    status.hidden = false;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const ok = field.value.trim() !== '';
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { showStatus('Please fill in your name, phone number and message.', true); return; }

    const data = new FormData(form);
    const action = form.getAttribute('action') || '';

    // Formspree configured: send by email
    if (action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
      button.disabled = true;
      try {
        const res = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        showStatus('Thank you. Your message has been sent and we will be in touch within 24 hours.');
      } catch {
        showStatus('Sorry, something went wrong. Please WhatsApp or call us on 0773 234 268.', true);
      } finally {
        button.disabled = false;
      }
      return;
    }

    // Otherwise: open WhatsApp with the enquiry pre-filled
    const lines = [
      'Hello McDonvick, I would like to book a free consultation.',
      '',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      data.get('email')   ? `Email: ${data.get('email')}` : '',
      data.get('service') ? `Service: ${data.get('service')}` : '',
      '',
      data.get('message'),
    ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    showStatus('WhatsApp has opened with your message. Just press send.');
  });

  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => { if (field.value.trim()) field.classList.remove('invalid'); });
  });
})();

/* ── FOOTER YEAR ────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
