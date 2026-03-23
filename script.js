// Smooth page transitions for navigation
// Define this flag so animations don't break when undefined
let shouldShowLoading = false;
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle same-page anchors
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href && href !== window.location.pathname.split('/').pop()) {
                // Handle page navigation with smooth transition
                e.preventDefault();

                // Create a subtle loading overlay
                const transitionOverlay = document.createElement('div');
                transitionOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: linear-gradient(135deg, var(--bg), var(--bg-secondary));
                    z-index: 9998;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                transitionOverlay.innerHTML = '<div style="color: var(--primary); font-size: 1.2rem;">Loading...</div>';
                document.body.appendChild(transitionOverlay);

                // Fade in overlay
                setTimeout(() => {
                    transitionOverlay.style.opacity = '1';
                }, 10);

                // Navigate after overlay appears
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply to cards and sections with staggered animation
    const animateElements = document.querySelectorAll('.card, section > h1, section > h2');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;

        // Trigger animation after a short delay for returning visits
        if (!shouldShowLoading) {
            setTimeout(() => {
                observer.observe(el);
            }, 200);
        } else {
            observer.observe(el);
        }
    });

    // Create floating particles
    createParticles();
});

// Particle creation function
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';

        particlesContainer.appendChild(particle);
    }
}