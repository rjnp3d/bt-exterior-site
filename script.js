
// Mobile nav toggle
const toggle = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');
if (toggle) {
  toggle.addEventListener('click', ()=> menu.classList.toggle('open'));
}

// Basic contact validation + mailto fallback
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      alert('Please fill in your name, email, and message.');
      return;
    }
    const to = 'btexteriorslondon@gmail.com'; // TODO: replace with your real email
    const subject = encodeURIComponent('New inquiry from BT Exterior Co. website');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${form.phone.value}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
// --- Simple Lightbox for Gallery Images ---
(function () {
  const imgs = document.querySelectorAll('.gallery img');
  if (!imgs.length) return;

  const openLightbox = (src, alt = '') => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,.85);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; padding: 20px; cursor: zoom-out;
    `;

    // Prevent page scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Big image
    const big = document.createElement('img');
    big.src = src;
    big.alt = alt || '';
    big.style.cssText = `
      max-width: min(1200px, 90vw);
      max-height: 90vh;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,.5);
      display:block;
    `;

    // Optional caption from alt text
    const caption = document.createElement('div');
    caption.textContent = alt || '';
    caption.style.cssText = `
      color: #e9ecef; font-size: 14px; margin-top: 10px; text-align: center;
    `;

    // Container to stack image + caption
    const wrap = document.createElement('div');
    wrap.appendChild(big);
    if (alt) wrap.appendChild(caption);

    overlay.appendChild(wrap);
    document.body.appendChild(overlay);

    // Close handlers: click overlay or press ESC
    const close = () => {
      overlay.remove();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    overlay.addEventListener('click', (e) => {
      // allow clicks on image without closing if you want; currently click anywhere closes
      close();
    });
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey, { once: true });
  };

  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
})();
