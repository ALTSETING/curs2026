const revealElements = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const hero = document.querySelector('.hero');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  const duration = 1800;
  let start = 0;
  const stepTime = Math.max(Math.floor(duration / target), 20);

  const update = () => {
    start += Math.ceil(target / (duration / stepTime));
    if (start >= target) {
      el.textContent = target + (target >= 100 ? '+' : '');
    } else {
      el.textContent = start;
      window.requestAnimationFrame(update);
    }
  };

  update();
};

const counterObserver = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerInstance.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

counters.forEach((counter) => counterObserver.observe(counter));

window.addEventListener('mousemove', (event) => {
  const { innerWidth, innerHeight } = window;
  const ratioX = (event.clientX / innerWidth - 0.5) * 2;
  const ratioY = (event.clientY / innerHeight - 0.5) * 2;
  const shapes = document.querySelectorAll('.shape');

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 4;
    shape.style.transform = `translate(${ratioX * speed}px, ${ratioY * speed}px)`;
  });
});
