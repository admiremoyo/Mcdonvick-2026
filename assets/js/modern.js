/* ============================================================
   MCDONVICK — Main JavaScript
   ============================================================ */

'use strict';

/* ── PRELOADER ──────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1500);
});

document.body.style.overflow = 'hidden';

/* ── NAVBAR ─────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  // Transparent/solid toggle on scroll
  function updateNav() {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('solid',       scrolled);
    navbar.classList.toggle('transparent', !scrolled);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Hamburger
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on link click
    navMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

/* ── COUNT-UP ANIMATION ─────────────────────────────────────── */
(function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  function animateCount(el, target, duration = 1800) {
    const start     = performance.now();
    const startVal  = 0;
    const easeOut   = t => 1 - Math.pow(1 - t, 3);

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(startVal + (target - startVal) * easeOut(progress));
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const parent = el.closest('.stat');
        const target = parseInt(parent?.dataset.count ?? el.textContent, 10);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    el.textContent = '0';
    observer.observe(el);
  });
})();

/* ── CONTACT FORM ───────────────────────────────────────────── */
(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Submit state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending…';

    const action = form.getAttribute('action');

    // If Formspree endpoint is set up, submit via fetch
    if (action && action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
      try {
        const data = new FormData(form);
        const res  = await fetch(action, {
          method:  'POST',
          body:    data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          if (success) { success.hidden = false; }
        } else {
          fallbackSubmit();
        }
      } catch {
        fallbackSubmit();
      }
    } else {
      // Fallback: open mailto
      fallbackSubmit();
    }

    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
  });

  function fallbackSubmit() {
    const name    = form.querySelector('#name')?.value    || '';
    const email   = form.querySelector('#email')?.value   || '';
    const phone   = form.querySelector('#phone')?.value   || '';
    const service = form.querySelector('#service')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:mcdonvick@gmail.com?subject=Website Enquiry - ${encodeURIComponent(service || 'General')}&body=${body}`;

    if (success) { success.hidden = false; }
  }

  // Live validation
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.style.borderColor = '';
        field.classList.remove('error');
      }
    });
  });
})();

/* ── BACK TO TOP ────────────────────────────────────────────── */
(function initBackToTop() {
  const btt = document.getElementById('backToTop');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    btt.hidden = window.scrollY < 400;
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── FOOTER YEAR ────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
