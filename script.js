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
                // Handle page navigation with quick smooth transition
                e.preventDefault();

                window.requestAnimationFrame(() => {
                    document.body.style.transition = 'opacity 0.2s ease';
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 150);
                });
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

    // Contact form success state handler
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm && contactSuccess) {
        contactSuccess.style.opacity = '0';
        contactSuccess.style.transform = 'translateY(10px)';

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.reset();
            contactSuccess.style.opacity = '1';
            contactSuccess.style.transform = 'translateY(0)';

            setTimeout(() => {
                contactSuccess.style.opacity = '0';
                contactSuccess.style.transform = 'translateY(10px)';
            }, 4000);
        });
    }

    // Apply to cards and sections with staggered animation
    const animateElements = document.querySelectorAll('.card, section > h1, section > h2');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        el.style.transitionDelay = `${Math.min(index * 0.05, 0.15)}s`;
        el.style.willChange = 'opacity, transform';

        observer.observe(el);
    });

    // Create floating particles
    createParticles();

    // Initialize chatbot and top button
    initChatbot();
    initBackToTop();
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

// Chatbot functionality
function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    if (!toggle || !window || !close || !input || !messages) return;

    // Toggle chat window
    toggle.addEventListener('click', () => {
        window.style.display = window.style.display === 'none' ? 'flex' : 'none';
    });

    // Close chat window
    close.addEventListener('click', () => {
        window.style.display = 'none';
    });

    // Handle input
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            const userMessage = input.value.trim();
            addMessage(userMessage, 'user');
            input.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage.toLowerCase());
                addMessage(botResponse, 'bot');
            }, 500);
        }
    });

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(message) {
        if (message.includes('about')) {
            return "I'm Praveen, a BSc (Hons) Computer Science student at the University of Westminster. I specialize in client-side web development, mobile applications, and creating impactful digital solutions.";
        } else if (message.includes('project') || message.includes('work')) {
            return "My projects include: MUC Digital (Flutter app for municipal services), AquaTech (UI/UX design for water conservation), and Traffic Analyzer (Python tool for urban planning). Check out my Projects page for more details!";
        } else if (message.includes('contact')) {
            return "You can reach me at: Email: praveenwijesundara0909@gmail.com, Phone: +94 763878653. I'm based in Seeduwa, Sri Lanka.";
        } else if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I help you learn more about Praveen's portfolio?";
        } else {
            return "I'm here to help with information about Praveen's portfolio. Try asking about 'about', 'projects', or 'contact'!";
        }
    }
}

function initBackToTop() {
    const backButton = document.createElement('button');
    backButton.id = 'back-to-top';
    backButton.type = 'button';
    backButton.title = 'Scroll to top';
    backButton.textContent = '↑';
    document.body.appendChild(backButton);

    backButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const updateVisibility = () => {
        backButton.classList.toggle('visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', updateVisibility);
    updateVisibility();
}
