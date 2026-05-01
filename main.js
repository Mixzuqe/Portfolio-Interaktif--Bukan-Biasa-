document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorRing.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
        });
    }

    // 2. Navigation Burger Menu
    const navBurger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navBurger && mobileMenu) {
        navBurger.addEventListener('click', () => {
            navBurger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-timeline, .skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // 4. Typing Effect for Hero
    const typingTarget = document.getElementById('typingTarget');
    if (typingTarget) {
        const words = ["Software Engineer", "Data Analyst", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }
});

// Function to copy email
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    });
}
