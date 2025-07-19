// Animation and interaction logic for AZU website

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupScrollAnimations();
    setupHoverEffects();
});

// Initialize basic animations
function initializeAnimations() {
    // Add fade-in animation class
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
            animation: fadeIn 1s ease-out 0.3s both;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #8b5cf6;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #6366f1;
        }
    `;
    document.head.appendChild(style);
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and content blocks
    setTimeout(() => {
        const cards = document.querySelectorAll('.bg-gray-700, .bg-gray-800');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }, 1000);
}

// Setup hover effects
function setupHoverEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover\\:scale-105');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Smooth reveal animation for content
function revealContent(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Loading animation helper
function showLoadingAnimation(container) {
    container.innerHTML = `
        <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-azu-purple"></div>
        </div>
    `;
}

// Remove loading animation
function hideLoadingAnimation(container) {
    const loader = container.querySelector('.animate-spin');
    if (loader) {
        loader.parentElement.remove();
    }
}

// Stagger animation for multiple elements
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in');
        }, index * delay);
    });
}

// Text typing animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Export functions for use in other scripts
window.animationUtils = {
    revealContent,
    showLoadingAnimation,
    hideLoadingAnimation,
    staggerAnimation,
    typeWriter
};