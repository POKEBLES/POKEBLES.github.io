# MANFOREST GRAPHICS - Public Website

Complete public-facing website for **Manforest Graphics**, a 25-year-old family-owned signage company serving Metro Manila's retail, restaurant, and hospitality sectors.

Part of the capstone project: **SYNTRA: AN INTEGRATED JOB ORDER MANAGEMENT SYSTEM FOR MANFOREST GRAPHICS WITH PROPHET-BASED FORECASTING AND SCENARIO ANALYTICS FOR SALES TRENDS**

## 📋 Project Overview

This is the **client-facing public system** designed for visitors and potential clients before logging into the integrated job order management system.

**Primary Goals:**
- 🎨 Branding & Company Presence
- 🤝 Client Acquisition & Lead Generation
- 📊 Convert Visitors into Registered Clients

## 🏢 Business Information

- **Company:** Manforest Graphics Corporation
- **Established:** 1999 (25+ years of experience)
- **Location:** 44 Bacood, Sta. Mesa, Manila, Philippines
- **Industry:** Signage Design, Fabrication, Printing, Installation
- **Target Sectors:** Retail, Restaurant, Hospitality, Corporate

**Contact:**
- 📧 Email: manforestcorp@yahoo.com
- 📱 Phone: (02) 8715-3004
- 📱 Viber: +63 917 812 3456

## 🌐 Website Structure

### 16 Complete Pages

#### 1. Landing Page (`index.html`)
- Hero section with CTA
- Services preview
- Company statistics
- Portfolio showcase
- Quick quote form
- Testimonials preview

#### 2. About (`about.html`)
- Company story (25 years)
- Mission, Vision, Values
- Expertise areas
- Process timeline
- Why choose us

#### 3. Services (`services.html`)
- Service overview
- Fabrication
- Printing
- Installation
- Delivery
- Signage types
- Industries served

#### 4. Service Details (`service-details.html`)
- Dynamic page for each service
- Detailed service information
- Materials & technologies
- Process breakdown
- Quick facts sidebar

#### 5. Portfolio (`portfolio.html`)
- Project gallery
- Filter by category (Retail, Restaurant, Resort, Corporate)
- Project details modal
- 12+ completed projects

#### 6. Testimonials (`testimonials.html`)
- Client reviews
- Rating summary (4.9/5 stars)
- 150+ testimonials
- Client logos

#### 7. Contact (`contact.html`)
- Contact form
- Business information
- Google Maps integration
- FAQ section
- Business hours

#### 8. Request Quote (`request-quote.html`)
- Multi-step form (4 steps)
- Contact information
- Project details
- Requirements specification
- Review & submit

#### 9-12. Authentication Pages
- **Login** (`login.html`) - Client account access
- **Register** (`register.html`) - New account creation
- **Forgot Password** (`forgot-password.html`) - Password reset
- **Email Verification** (`email-verification.html`) - Account confirmation

#### 13-16. Utility Pages
- **404 Error** (`404.html`) - Custom error page
- **Privacy Policy** (`privacy-policy.html`) - Philippine Data Privacy Act compliant
- **Terms & Conditions** (`terms-conditions.html`) - Service agreements

## 🎨 Design System

### Color Palette
```css
--primary-color: #1a7f37;      /* Forest Green */
--primary-dark: #155c2a;       /* Darker Green */
--primary-light: #6fc186;      /* Light Green */
--secondary-color: #e67e22;    /* Orange */
--accent-color: #f39c12;       /* Gold */
--dark: #1a1a1a;               /* Dark Gray */
--medium-gray: #666666;        /* Medium Gray */
--light-gray: #dedede;         /* Light Gray */
--lighter-gray: #f5f5f5;       /* Lighter Gray */
--white: #ffffff;              /* White */
```

### Typography
- **Headings:** Poppins (weights: 400, 500, 600, 700)
- **Body:** Inter (weights: 400, 500, 600)
- Font sizes: 13px-16px base (responsive)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- xxl: 3rem (48px)

## 📁 Project Structure

```
MANFOREST/
├── index.html                    # Landing page
├── about.html                    # About us
├── services.html                 # Services overview
├── service-details.html          # Individual service pages
├── portfolio.html                # Project portfolio
├── testimonials.html             # Client testimonials
├── contact.html                  # Contact page
├── request-quote.html            # Quote request form
├── login.html                    # User login
├── register.html                 # Account registration
├── forgot-password.html          # Password reset
├── email-verification.html       # Email confirmation
├── 404.html                      # Error page
├── privacy-policy.html           # Privacy policy
├── terms-conditions.html         # Terms and conditions
│
├── css/
│   ├── style.css                 # Main stylesheet
│   ├── responsive.css            # Responsive breakpoints
│   └── auth.css                  # Authentication styles
│
├── js/
│   ├── main.js                   # Core functionality
│   ├── portfolio.js              # Portfolio filtering & modal
│   ├── contact.js                # Contact form handling
│   ├── quote-request.js          # Multi-step quote form
│   ├── auth.js                   # Authentication logic
│   └── service-details.js        # Dynamic service content
│
├── images/                       # Image assets
│   ├── logo.png                  # Company logo
│   ├── hero-pattern.svg          # Hero background
│   ├── portfolio/                # Portfolio images
│   ├── clients/                  # Client logos
│   ├── services/                 # Service images
│   └── types/                    # Signage type images
│
└── README.md                     # This file
```

## 🚀 Features

### User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations & transitions
- ✅ Lazy loading images
- ✅ Back to top button
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Form validation
- ✅ Multi-step forms

### Functionality
- ✅ Navigation hamburger menu
- ✅ Portfolio filtering by category
- ✅ Project detail modals
- ✅ Contact form with validation
- ✅ Quote request workflow
- ✅ Authentication system
- ✅ Password strength meter
- ✅ Password visibility toggle
- ✅ Dynamic service pages
- ✅ FAQ accordions
- ✅ Stats counter animation
- ✅ Smooth scrolling
- ✅ Google Maps integration

### SEO & Accessibility
- ✅ Semantic HTML5
- ✅ ARIA labels
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Keyboard navigation support

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS (no frameworks)
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Poppins & Inter
- **Google Maps API** - Location integration (optional)

## 📱 Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

## ⚙️ Setup Instructions

### 1. Local Development

```bash
# Clone or download the project
cd MANFOREST

# Open with a local server (Python example)
python -m http.server 8000

# Or use VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

### 2. Image Assets

Add the following images to complete the website:

**Required Images:**
- `images/logo.png` - Company logo (300x100px recommended)
- `images/hero-pattern.svg` - Hero background pattern
- `images/portfolio/` - Project images (1200x800px)
- `images/clients/` - Client testimonial photos (200x200px)
- `images/services/` - Service category images (800x600px)
- `images/types/` - Signage type images (600x400px)

### 3. External Integrations

**Google Maps API (optional):**
1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `contact.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

**Email Service (for forms):**
- Contact form: Integrate with backend API or service (FormSpree, EmailJS, etc.)
- Quote request: Connect to order management system
- Authentication: Connect to user management backend

## 🔐 Legal Compliance

### Data Privacy Act of 2012 (RA 10173)
- Privacy policy includes DPA compliance
- Data collection disclosure
- User rights (access, correction, deletion)
- Data Protection Officer contact
- National Privacy Commission information

### Terms & Conditions
- Service terms
- Payment terms (50% deposit, 30-day quote validity)
- Production timeline (7-14 business days)
- Warranty (1 year indoor, 6 months outdoor)
- Cancellation policy
- Intellectual property
- Dispute resolution under Philippine law

## 🎯 Next Steps (for Backend Integration)

1. **User Authentication**
   - Connect register/login to database
   - Implement JWT or session management
   - Email verification system

2. **Form Submissions**
   - Contact form → Email/Database
   - Quote request → Job order system
   - Connect to SYNTRA backend

3. **Portfolio Management**
   - Admin panel for adding projects
   - Dynamic content loading from database

4. **Analytics**
   - Google Analytics integration
   - Track quote conversions
   - Monitor user journeys

5. **CMS Integration**
   - Content management for services
   - Blog/news section
   - Dynamic testimonials

## 📊 Performance Optimization

- [ ] Minify CSS/JS files
- [ ] Optimize images (WebP format)
- [ ] Enable gzip compression
- [ ] Implement CDN for assets
- [ ] Add service worker for PWA
- [ ] Enable browser caching

## 🌟 Key Features for Client Acquisition

1. **Clear CTAs** - Multiple touchpoints for quote requests
2. **Trust Signals** - 25 years experience, 1000+ projects, testimonials
3. **Portfolio Showcase** - Visual proof of capabilities
4. **Easy Contact** - Multiple channels (form, phone, email, Viber)
5. **Professional Design** - Modern, clean, industry-appropriate
6. **Quick Quote** - Simple multi-step form reduces friction
7. **Mobile Optimized** - Accessible on all devices

## 📞 Support

For questions about the website implementation:

**Developer Contact:** [Your contact information]

**Client Contact:**
- Manforest Graphics Corporation
- Email: manforestcorp@yahoo.com
- Phone: (02) 8715-3004

## 📄 License

© 2024 Manforest Graphics Corporation. All rights reserved.

---

**Project:** SYNTRA - Integrated Job Order Management System
**Component:** Public-Facing Website (Client View)
**Version:** 1.0.0
**Last Updated:** 2024
