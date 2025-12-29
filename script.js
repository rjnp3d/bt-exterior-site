// Mobile nav toggle
const toggle = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Basic contact validation + mailto fallback
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const to = 'btexteriorslondon@gmail.com';
    const subject = encodeURIComponent('New inquiry from BT Exterior Co. website');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${form.phone.value}\n\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

// Lightbox with Left/Right Navigation
(function () {
  const imgs = document.querySelectorAll('.gallery img');
  if (!imgs.length) return;

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;

    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,.9);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; padding: 20px;
    `;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const big = document.createElement('img');
    big.style.cssText = `
      max-width: min(1200px, 90vw);
      max-height: 90vh;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,.5);
      display: block;
    `;

    const caption = document.createElement('div');
    caption.style.cssText = `
      color: #e9ecef; font-size: 14px; margin-top: 10px; text-align: center;
    `;

    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';
    wrap.appendChild(big);
    wrap.appendChild(caption);

    overlay.appendChild(wrap);

    const arrowBase = `
      position: absolute; top: 50%; transform: translateY(-50%);
      font-size: 40px; color: #fff; cursor: pointer; user-select: none;
      padding: 12px; border-radius: 10px;
      background: rgba(255,255,255,0.08);
    `;

    const prev = document.createElement('div');
    prev.innerHTML = '&#10094;';
    prev.style.cssText = arrowBase + 'left: 18px;';

    const next = document.createElement('div');
    next.innerHTML = '&#10095;';
    next.style.cssText = arrowBase + 'right: 18px;';

    overlay.appendChild(prev);
    overlay.appendChild(next);

    const show = (newIndex) => {
      currentIndex = (newIndex + imgs.length) % imgs.length;
      big.src = imgs[currentIndex].src;
      caption.textContent = imgs[currentIndex].alt || '';
    };

    const close = () => {
      overlay.remove();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };

    prev.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex - 1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex + 1); });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    };
    window.addEventListener('keydown', onKey);

    show(currentIndex);
    document.body.appendChild(overlay);
  };

  imgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });
})();

