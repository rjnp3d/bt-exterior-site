
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
// --- Simple Lightbox for Gallery Images 
    // --- Enhanced Lightbox with Left/Right Navigation ---
(function () {
  const imgs = document.querySelectorAll('.gallery img');
  if (!imgs.length) return;

  let currentIndex = 0;

  const openLightbox = (index) => {
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,.9);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; padding: 20px; cursor: default;
    `;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // big image
    const big = document.createElement('img');
    big.src = imgs[index].src;
    big.alt = imgs[index].alt || '';
    big.style.cssText = `
      max-width: min(1200px, 90vw);
      max-height: 90vh;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,.5);
      display: block;
    `;

    // caption
    const caption = document.createElement('div');
    caption.textContent = imgs[index].alt || '';
    caption.style.cssText = `
      color: #e9ecef; font-size: 14px; margin-top: 10px; text-align: center;
    `;

    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';
    wrap.appendChild(big);
    if (imgs[index].alt) wrap.appendChild(caption);
    overlay.appendChild(wrap);

    // left/right arrows
    const arrowStyle = `
      position: absolute; top: 50%; transform: translateY(-50%);
      font-size: 40px; color: #fff; cursor: pointer; user-select: none;
      padding: 12px; border-radius: 8px; transition: background .2s;
    `;
    const prev = document.createElement('div');
    prev.innerHTML = '&#10094;'; // ‹
    prev.style.cssText = arrowStyle + 'left: 30px;';
    const next = document.createElement('div');
    next.innerHTML = '&#10095;'; // ›
    next.style.cssText = arrowStyle + 'right: 30px;';
    overlay.appendChild(prev);
    overlay.appendChild(next);

    const close = () => {
      overlay.remove();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };

    const show = (newIndex) => {
      currentIndex = (newIndex + imgs.length) % imgs.length;
      big.src = imgs[currentIndex].src;
      caption.textContent = imgs[currentIndex].alt || '';
    };

    prev.onclick = (e) => { e.stopPropagation(); show(currentIndex - 1); };
    next.onclick = (e) => { e.stopPropagation(); show(currentIndex + 1); };
    overlay.onclick = (e) => {
      if (e.target === overlay) close();
    };

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    };
    window.addEventListener('keydown', onKey);

    document.body.appendChild(overlay);
  };

  imgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });
})();

