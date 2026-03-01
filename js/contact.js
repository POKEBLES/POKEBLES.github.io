/* ===================================
   MANFOREST GRAPHICS - Contact Form JavaScript
   =================================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check authentication
        if (!window.AuthManager || !window.AuthManager.isAuthenticated()) {
            if (window.AuthManager) {
                window.AuthManager.showLoginRequired('Please log in or sign up to send us a message.');
            } else {
                alert('Please log in or sign up to send us a message.');
                window.location.href = 'login.html';
            }
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!window.ManforestUtils.validateForm(contactForm)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await simulateAPICall(formData);

            // Show success message
            showSuccessMessage();
            contactForm.reset();

            // Show toast notification
            if (window.ManforestUtils && window.ManforestUtils.showToast) {
                window.ManforestUtils.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            }
        } catch (error) {
            // Show error message
            if (window.ManforestUtils && window.ManforestUtils.showToast) {
                window.ManforestUtils.showToast('Failed to send message. Please try again.', 'error');
            }
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate API call (replace with actual backend integration)
function simulateAPICall(data) {
    return new Promise((resolve, reject) => {
        console.log('Sending contact form:', data);
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Message sent successfully' });
            } else {
                reject({ success: false, message: 'Failed to send message' });
            }
        }, 1500);
    });
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 1rem;
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        ">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <strong>Message sent successfully!</strong>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.9375rem;">
                    Thank you for contacting Manforest Graphics. We'll respond to your inquiry within 24 hours.
                </p>
            </div>
        </div>
    `;

    contactForm.parentElement.insertBefore(successDiv, contactForm);

    // Remove success message after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Phone number formatting
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as Philippine mobile number
        if (value.startsWith('63')) {
            // +63 format
            if (value.length <= 2) {
                e.target.value = '+' + value;
            } else if (value.length <= 5) {
                e.target.value = '+' + value.slice(0, 2) + ' ' + value.slice(2);
            } else if (value.length <= 8) {
                e.target.value = '+' + value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5);
            } else {
                e.target.value = '+' + value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 12);
            }
        } else if (value.startsWith('0')) {
            // 09xx format
            if (value.length <= 4) {
                e.target.value = value;
            } else if (value.length <= 7) {
                e.target.value = value.slice(0, 4) + ' ' + value.slice(4);
            } else {
                e.target.value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 11);
            }
        }
    });
}

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // Toggle active class
            item.classList.toggle('active');

            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.marginTop = '0.5rem';
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                answer.style.marginTop = '0';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    }
});

// Initialize map (Google Maps or similar)
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (mapElement && typeof google !== 'undefined') {
        // Manforest Graphics location (replace with actual coordinates)
        const location = { lat: 14.5995, lng: 120.9842 }; // Manila coordinates
        
        const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: location,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });

        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'Manforest Graphics',
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 0.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Manforest Graphics</h3>
                    <p style="margin: 0; font-size: 0.875rem;">44 Bacood, Sta. Mesa, Manila</p>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem;">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=14.5995,120.9842" target="_blank" style="color: var(--primary-color);">
                            Get Directions
                        </a>
                    </p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }
}

// Load map if Google Maps API is available
if (document.getElementById('map')) {
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        // Wait for Google Maps API to load
        window.initMap = initMap;
    }
}

// Copy contact info on click
const copyButtons = document.querySelectorAll('[data-copy]');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-copy');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            if (window.ManforestUtils && window.ManforestUtils.showToast) {
                window.ManforestUtils.showToast('Copied to clipboard!', 'success');
            }
            
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }).catch(() => {
            if (window.ManforestUtils && window.ManforestUtils.showToast) {
                window.ManforestUtils.showToast('Failed to copy', 'error');
            }
        });
    });
});

// Business hours highlight current day
const highlightCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    const currentDayElement = document.querySelector(`[data-day="${today}"]`);
    
    if (currentDayElement) {
        currentDayElement.style.background = 'var(--lighter-gray)';
        currentDayElement.style.fontWeight = '600';
        currentDayElement.style.padding = '0.5rem';
        currentDayElement.style.borderRadius = 'var(--radius-sm)';
    }
};

// Initialize
highlightCurrentDay();

console.log('Contact page functionality initialized');
