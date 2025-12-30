// Mobile nav (with aria-expanded)
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking a nav link (mobile)
  navList.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    navList.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Contact form -> mailto
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const subject = encodeURIComponent(`BT Exterior Co Quote Request — ${name || 'New Lead'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:btexteriorslondon@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Dim logo after hero
const heroLogo = document.querySelector('.hero-logo');
const heroSection = document.querySelector('.hero');

if (heroLogo && heroSection) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      heroLogo.classList.toggle('is-dim', !entry.isIntersecting);
    },
    { threshold: 0.25 }
  );
  observer.observe(heroSection);
}

// Gallery lightbox (click image -> overlay, arrows, esc)
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox?.querySelector('.lb-img');
const btnClose = lightbox?.querySelector('.lb-close');
const btnPrev = lightbox?.querySelector('.lb-prev');
const btnNext = lightbox?.querySelector('.lb-next');

const galleryImgs = Array.from(document.querySelectorAll('.gallery img'));
let currentIndex = -1;

function openLightbox(index) {
  if (!lightbox || !lbImg) return;
  currentIndex = index;
  lbImg.src = galleryImgs[currentIndex].src;
  lbImg.alt = galleryImgs[currentIndex].alt || 'Gallery photo';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lbImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
  document.body.style.overflow = '';
  currentIndex = -1;
}

function showNext(delta) {
  if (currentIndex < 0) return;
  currentIndex = (currentIndex + delta + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[currentIndex].src;
  lbImg.alt = galleryImgs[currentIndex].alt || 'Gallery photo';
}

if (galleryImgs.length && lightbox) {
  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  btnClose?.addEventListener('click', closeLightbox);
  btnPrev?.addEventListener('click', () => showNext(-1));
  btnNext?.addEventListener('click', () => showNext(1));

  lightbox.addEventListener('click', (e) => {
    // click backdrop closes
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}
