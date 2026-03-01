/* ===================================
   MANFOREST GRAPHICS - Portfolio JavaScript
   =================================== */

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter value
            const filter = button.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio Modal
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
const portfolioCards = document.querySelectorAll('.portfolio-card');

// Sample project data (in a real app, this would come from a database)
const projectData = {
    1: {
        title: "Retail Store Signage - SM Megamall",
        category: "Retail",
        client: "Fashion Boutique Inc.",
        date: "March 2024",
        description: "Complete signage solution for a high-end retail store, including illuminated channel letters, wayfinding signs, and promotional displays.",
        images: ["images/portfolio/retail-1.jpg", "images/portfolio/retail-2.jpg", "images/portfolio/retail-3.jpg"],
        services: ["Design & Consultation", "Fabrication", "Installation"],
        materials: ["Acrylic", "LED Lighting", "Aluminum"],
        testimonial: "Manforest Graphics delivered exceptional signage that perfectly represents our brand. The quality and attention to detail are outstanding!",
        testimonialAuthor: "Maria Santos, Store Manager"
    },
    2: {
        title: "Restaurant Menu Boards - BGC",
        category: "Restaurant",
        client: "Urban Eats Restaurant",
        date: "February 2024",
        description: "Modern digital and printed menu boards with custom branding elements for a popular restaurant chain.",
        images: ["images/portfolio/restaurant-1.jpg", "images/portfolio/restaurant-2.jpg"],
        services: ["Design", "Digital Printing", "Installation"],
        materials: ["PVC Board", "Vinyl Graphics", "LED Backlighting"],
        testimonial: "The menu boards are stunning! Our customers love the new look and it's made ordering so much easier.",
        testimonialAuthor: "Chef Roberto Cruz"
    }
    // Add more projects as needed
};

if (portfolioCards.length) {
    portfolioCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project') || (index + 1);
            openProjectModal(projectId);
        });
    });
}

function openProjectModal(projectId) {
    const project = projectData[projectId];

    if (project && modal) {
        // Update modal content
        modal.querySelector('.modal-title').textContent = project.title;
        modal.querySelector('.project-category').textContent = project.category;
        modal.querySelector('.project-client').textContent = `Client: ${project.client}`;
        modal.querySelector('.project-date').textContent = project.date;
        modal.querySelector('.project-description').textContent = project.description;

        // Update services list
        const servicesList = modal.querySelector('.project-services');
        if (servicesList) {
            servicesList.innerHTML = project.services.map(service => `<li><i class="fas fa-check"></i> ${service}</li>`).join('');
        }

        // Update materials list
        const materialsList = modal.querySelector('.project-materials');
        if (materialsList) {
            materialsList.innerHTML = project.materials.map(material => `<li><i class="fas fa-check"></i> ${material}</li>`).join('');
        }

        // Update testimonial
        const testimonialElement = modal.querySelector('.project-testimonial');
        if (testimonialElement && project.testimonial) {
            testimonialElement.innerHTML = `
                <i class="fas fa-quote-left"></i>
                <p>${project.testimonial}</p>
                <cite>- ${project.testimonialAuthor}</cite>
            `;
        }

        // Update images gallery
        const gallery = modal.querySelector('.project-gallery');
        if (gallery && project.images) {
            gallery.innerHTML = project.images.map(img => `
                <img src="${img}" alt="${project.title}" loading="lazy">
            `).join('');
        }

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal on background click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Image Gallery Navigation (if multiple images)
const initGalleryNavigation = () => {
    const gallery = document.querySelector('.project-gallery');
    if (!gallery) return;

    let currentIndex = 0;
    const images = gallery.querySelectorAll('img');

    if (images.length <= 1) return;

    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-nav gallery-prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.style.cssText = `
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-nav gallery-next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.style.cssText = prevBtn.style.cssText.replace('left: 10px', 'right: 10px');

    gallery.style.position = 'relative';
    gallery.appendChild(prevBtn);
    gallery.appendChild(nextBtn);

    // Hide all images except first
    images.forEach((img, i) => {
        if (i !== 0) img.style.display = 'none';
    });

    // Navigation functions
    const showImage = (index) => {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    };

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
};

// Initialize gallery navigation when modal opens
if (modal) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style' && modal.style.display === 'block') {
                setTimeout(initGalleryNavigation, 100);
            }
        });
    });

    observer.observe(modal, { attributes: true });
}

// Load More Functionality (if implemented)
const loadMoreBtn = document.getElementById('loadMore');
let visibleItems = 12;

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const hiddenItems = Array.from(portfolioItems).slice(visibleItems, visibleItems + 6);
        
        hiddenItems.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        });

        visibleItems += 6;

        // Hide button if all items are visible
        if (visibleItems >= portfolioItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// Search Functionality (if search box exists)
const searchInput = document.getElementById('portfolioSearch');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        portfolioItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const category = item.getAttribute('data-category')?.toLowerCase() || '';

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}

console.log('Portfolio functionality initialized');
