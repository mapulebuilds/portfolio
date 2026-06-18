document.addEventListener('DOMContentLoaded', () => {

  // ─── REVEAL ON SCROLL (STAGGERED) ───

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentNode;
          const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── 3D CARD TILT (ENHANCED) ───

  const tiltCards = document.querySelectorAll('.skill-card, .project-card, .side-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      const shadowX = ((x - centerX) / centerX) * 10;
      const shadowY = ((y - centerY) / centerY) * 10;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 28px rgba(11, 165, 233, 0.12), 0 4px 12px rgba(0,0,0,0.06)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // ─── PROFILE IMAGE 3D TILT (ENHANCED) ───

  const photoFrame = document.querySelector('.photo-frame');
  if (photoFrame) {
    photoFrame.addEventListener('mousemove', (e) => {
      const rect = photoFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((y - centerY) / centerY) * -6;
      photoFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      const shadowX = ((x - centerX) / centerX) * 12;
      const shadowY = ((y - centerY) / centerY) * 12;
      photoFrame.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(11, 165, 233, 0.15)`;
    });
    photoFrame.addEventListener('mouseleave', () => {
      photoFrame.style.transform = '';
      photoFrame.style.boxShadow = '';
    });
  }

  // ─── HERO SCROLL PARALLAX ───

  const heroCopy = document.querySelector('.hero-copy');
  const heroImage = document.querySelector('.hero-image');
  if (heroCopy && heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroCopy.style.transform = `translateY(${scrolled * 0.06}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.12}px)`;
      }
    });
  }

  // ─── ACTIVE NAV LINK ───

  const links = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');

  function updateActive() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
