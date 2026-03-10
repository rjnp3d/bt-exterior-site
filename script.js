
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

// Contact form -> Netlify
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        alert('Thanks! Your message has been sent.');
        form.reset();
      } else {
        alert('Something went wrong. Please try again or email us directly.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
}

// CHANGED: mobile header icon behavior only (floating hero logo removed)
function updateLogoState() {
  const isMobile = window.innerWidth <= 480;

  if (isMobile && window.scrollY > 20) {
    document.body.classList.add('mobile-scrolled');
  } else {
    document.body.classList.remove('mobile-scrolled');
  }
}

window.addEventListener('scroll', updateLogoState);
window.addEventListener('resize', updateLogoState);
updateLogoState();
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
