const header = document.querySelector('[data-header]');
const revealTargets = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0.1, 0.3, 0.6],
  }
);

sections.forEach((section) => navObserver.observe(section));

const cards = document.querySelectorAll('.task-card');
let activeIndex = 0;

setInterval(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  cards.forEach((card) => card.classList.remove('is-active'));
  cards[activeIndex % cards.length]?.classList.add('is-active');
  activeIndex += 1;
}, 1800);
