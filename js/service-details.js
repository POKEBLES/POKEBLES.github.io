/* ===================================
   MANFOREST GRAPHICS - Service Details JavaScript
   =================================== */

// Get service type from URL parameter
function getServiceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('service') || 'fabrication'; // default to fabrication
}

// Show the appropriate service section
function showServiceSection(serviceType) {
    // Hide all service sections
    const sections = document.querySelectorAll('.service-detail-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected service section
    const selectedSection = document.getElementById(serviceType);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        
        // Update page title
        updatePageTitle(serviceType);
        
        // Update active state in sidebar
        updateSidebarActive(serviceType);
        
        // Update browser history
        const newURL = `${window.location.pathname}?service=${serviceType}`;
        window.history.replaceState({service: serviceType}, '', newURL);
    } else {
        // If service not found, show fabrication as default
        const defaultSection = document.getElementById('fabrication');
        if (defaultSection) {
            defaultSection.style.display = 'block';
            updatePageTitle('fabrication');
        }
    }
}

// Update page title based on service
function updatePageTitle(serviceType) {
    const titles = {
        'fabrication': 'Signage Fabrication Services',
        'printing': 'Digital Printing Services',
        'installation': 'Professional Installation Services',
        'delivery': 'Delivery & Logistics Services'
    };

    const pageTitle = document.querySelector('.page-header h1');
    const documentTitle = document.querySelector('title');
    
    if (pageTitle) {
        pageTitle.textContent = titles[serviceType] || 'Service Details';
    }
    
    if (documentTitle) {
        documentTitle.textContent = `${titles[serviceType] || 'Service Details'} - Manforest Graphics`;
    }
}

// Update active state in sidebar navigation
function updateSidebarActive(serviceType) {
    const sidebarLinks = document.querySelectorAll('.related-services a');
    
    sidebarLinks.forEach(link => {
        const linkService = link.getAttribute('href').split('=')[1];
        if (linkService === serviceType) {
            link.style.background = 'var(--lighter-gray)';
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        } else {
            link.style.background = 'transparent';
            link.style.color = 'var(--dark)';
            link.style.fontWeight = '400';
        }
    });
}

// Handle service navigation clicks
function setupServiceNavigation() {
    const serviceLinks = document.querySelectorAll('a[href*="service-details.html?service="]');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = link.getAttribute('href').split('=')[1];
            showServiceSection(serviceType);
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Quick Facts Animation
function animateQuickFacts() {
    const facts = document.querySelectorAll('.fact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    facts.forEach(fact => observer.observe(fact));
}

// Service Feature Hover Effects
function setupFeatureHovers() {
    const features = document.querySelectorAll('.feature-card');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'translateY(-5px)';
            feature.style.boxShadow = 'var(--shadow-lg)';
        });
        
        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'translateY(0)';
            feature.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// Request Quote Button with Pre-filled Service
function setupQuoteButtons() {
    const quoteButtons = document.querySelectorAll('.btn-quote');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceType = getServiceFromURL();
            
            // Store selected service in sessionStorage for quote form
            sessionStorage.setItem('selectedService', serviceType);
            
            // Redirect to quote page
            window.location.href = 'request-quote.html';
        });
    });
}

// Image Gallery Lightbox
function setupImageGallery() {
    const galleryImages = document.querySelectorAll('.process-gallery img, .result-gallery img');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 10px;
        z-index: 10001;
    `;
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Close on click
    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.remove();
    });
    
    // Close on ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// FAQ Toggle (if exists on page)
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.style.maxHeight = '0';
                    if (icon) icon.style.transform = 'rotate(0)';
                }
            });
        }
    });
}

// Related Services Recommendations
function setupRelatedServices() {
    const serviceType = getServiceFromURL();
    
    const recommendations = {
        'fabrication': ['printing', 'installation'],
        'printing': ['fabrication', 'installation'],
        'installation': ['fabrication', 'delivery'],
        'delivery': ['installation', 'fabrication']
    };
    
    // Highlight recommended services
    const related = recommendations[serviceType] || [];
    related.forEach(service => {
        const link = document.querySelector(`a[href*="service=${service}"]`);
        if (link) {
            const badge = document.createElement('span');
            badge.textContent = 'Recommended';
            badge.style.cssText = `
                display: inline-block;
                background: var(--primary-color);
                color: white;
                font-size: 0.75rem;
                padding: 0.125rem 0.5rem;
                border-radius: 10px;
                margin-left: 0.5rem;
            `;
            link.appendChild(badge);
        }
    });
}

// Initialize all functionality
function init() {
    const serviceType = getServiceFromURL();
    showServiceSection(serviceType);
    setupServiceNavigation();
    animateQuickFacts();
    setupFeatureHovers();
    setupQuoteButtons();
    setupImageGallery();
    setupFAQ();
    setupRelatedServices();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('Service details functionality initialized');
