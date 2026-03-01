/* ===================================
   MANFOREST GRAPHICS - Main JavaScript
   =================================== */

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Navigation Hamburger Menu
const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    $$('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = $('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// Smooth Scrolling
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = $(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
$$('.fade-in').forEach(el => observer.observe(el));

// Stats Counter Animation
const statsCounters = $$('[data-target]');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsCounters.forEach(counter => statsObserver.observe(counter));

// Form Validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s+()-]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const validateForm = (form) => {
    let isValid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;
        
        // Remove previous error styling
        input.classList.remove('error');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }

        // Validate
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
};

const showError = (input, message) => {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentElement.appendChild(errorDiv);
};

// Generic Form Submission
$$('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        // Only validate if form doesn't have novalidate attribute
        if (!this.hasAttribute('novalidate')) {
            if (!validateForm(this)) {
                e.preventDefault();
                return;
            }
        }
    });
});

// Modal Functionality
const openModal = (modalId) => {
    const modal = $(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = (modalId) => {
    const modal = $(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Close modal on background click
$$('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(`#${modal.id}`);
        }
    });
});

// Close modal on close button click
$$('.modal-close, .close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
            closeModal(`#${modal.id}`);
        }
    });
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        $$('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(`#${modal.id}`);
            }
        });
    }
});

// Image Lazy Loading
if ('loading' in HTMLImageElement.prototype) {
    const images = $$('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Back to Top Button
const createBackToTop = () => {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--white);
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        transition: var(--transition-fast);
        z-index: 999;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
};

// Initialize back to top button
createBackToTop();

// Toast Notifications
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--white);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };

    toast.querySelector('i').style.color = colors[type];

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .error {
        border-color: #e74c3c !important;
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.ManforestUtils = {
    validateEmail,
    validatePhone,
    validateForm,
    showError,
    openModal,
    closeModal,
    showToast
};

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Quick Quote Form Handler
const quickQuoteForm = document.getElementById('quickQuoteForm');
if (quickQuoteForm) {
    quickQuoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check authentication
        if (!window.AuthManager || !window.AuthManager.isAuthenticated()) {
            if (window.AuthManager) {
                window.AuthManager.showLoginRequired('Please log in or sign up to request a quote.');
            } else {
                alert('Please log in or sign up to request a quote.');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }
            return;
        }

        // If authenticated, redirect to full quote form
        window.location.href = 'request-quote.html';
    });
}

console.log('Manforest Graphics website loaded successfully!');
