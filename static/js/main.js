// main.js
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Custom Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for the ring
        setTimeout(() => {
          cursorRing.style.left = `${posX}px`;
          cursorRing.style.top = `${posY}px`;
        }, 50);
      });
  } else {
      // Hide cursor on touch devices
      cursorDot.style.display = 'none';
      cursorRing.style.display = 'none';
  }

  // 2. Typing Effect for Hero Title
  const titles = ["Data Application Developer", "Python Backend Engineer", "Creative Problem Solver"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTarget = document.getElementById('typingTarget');
  
  function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      typingTarget.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTarget.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  if(typingTarget) setTimeout(typeEffect, 1000);

  // 3. Navbar Scroll Effect & Mobile Menu
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  if (burger) {
      burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
  }
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-timeline');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if(entry.target.classList.contains('reveal-timeline')) {
             entry.target.classList.add('visible');
        } else {
             entry.target.classList.add('active');
        }
        
        // Number counter animation for hero stats
        const countTargets = entry.target.querySelectorAll('[data-count]');
        countTargets.forEach(target => {
            const finalValue = parseInt(target.getAttribute('data-count'));
            animateValue(target, 0, finalValue, 2000);
            target.removeAttribute('data-count'); // prevent re-animating
        });

        // Skill bar animation
        if(entry.target.classList.contains('skill-card')) {
            const fill = entry.target.querySelector('.skill-card__fill');
            if(fill) {
                const level = fill.getAttribute('data-level');
                fill.style.width = `${level}%`;
            }
        }
        
        observer.unobserve(entry.target);
      }
    });
  };
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));

  // Helper: Number Counter Animation
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end; // ensure exact final value
      }
    };
    window.requestAnimationFrame(step);
  }

  // 5. Hero Particle Canvas Effect (Lightweight)
  const canvas = document.getElementById('particleCanvas');
  if(canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      
      function resize() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resize);
      resize();
      
      class Particle {
          constructor() {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.size = Math.random() * 2;
              this.speedX = Math.random() * 0.5 - 0.25;
              this.speedY = Math.random() * 0.5 - 0.25;
              this.opacity = Math.random() * 0.5;
          }
          update() {
              this.x += this.speedX;
              this.y += this.speedY;
              
              if(this.x > canvas.width) this.x = 0;
              if(this.x < 0) this.x = canvas.width;
              if(this.y > canvas.height) this.y = 0;
              if(this.y < 0) this.y = canvas.height;
          }
          draw() {
              ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
          }
      }
      
      // Reduce particles on mobile for performance
      const particleCount = window.innerWidth < 768 ? 20 : 50;
      
      for(let i=0; i<particleCount; i++) {
          particles.push(new Particle());
      }
      
      function animateParticles() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach(p => {
              p.update();
              p.draw();
          });
          requestAnimationFrame(animateParticles);
      }
      animateParticles();
  }
});

// Global Function for Copy Email
window.copyEmail = function(email) {
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  });
};
