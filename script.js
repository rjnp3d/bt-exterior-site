// Mobile nav
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// Footer year
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
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
