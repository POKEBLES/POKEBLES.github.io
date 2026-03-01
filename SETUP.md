# MANFOREST GRAPHICS - Quick Setup Guide

## 🚀 Getting Started

This guide will help you set up and customize the Manforest Graphics website.

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Local web server (Python, Node.js, or VS Code Live Server)
- Image editing software (optional, for logo/assets)

## 🔧 Initial Setup

### Step 1: Project Files Verification

Ensure all files are present:

```
✅ 16 HTML pages
✅ 3 CSS files (style.css, responsive.css, auth.css)
✅ 5 JavaScript files (main.js, portfolio.js, contact.js, quote-request.js, auth.js, service-details.js)
✅ README.md documentation
✅ Images folder structure
```

### Step 2: Add Your Logo and Images

**Required Images:**

1. **Company Logo**
   - Path: `images/logo.png`
   - Size: 300x100px or similar aspect ratio
   - Format: PNG with transparent background
   - Update path in HTML if different

2. **Portfolio Images** (place in `images/portfolio/`)
   - retail-1.jpg, retail-2.jpg, retail-3.jpg
   - restaurant-1.jpg, restaurant-2.jpg
   - resort-1.jpg, resort-2.jpg
   - corporate-1.jpg, corporate-2.jpg
   - Size: 1200x800px recommended
   - Format: JPG or WebP (optimized)

3. **Client Photos** (place in `images/clients/`)
   - client1.jpg through client10.jpg
   - Size: 200x200px (square)
   - Format: JPG

4. **Service Images** (place in `images/services/`)
   - fabrication.jpg
   - printing.jpg
   - installation.jpg
   - delivery.jpg
   - Size: 800x600px
   - Format: JPG

5. **Signage Type Images** (place in `images/types/`)
   - channel-letters.jpg
   - acrylic-signs.jpg
   - neon-signs.jpg
   - led-signs.jpg
   - pylon-signs.jpg
   - vehicle-wraps.jpg
   - Size: 600x400px
   - Format: JPG

### Step 3: Update Contact Information

**Files to update:**

#### 1. All HTML files (Footer section)
```html
<li><i class="fas fa-map-marker-alt"></i> 44 Bacood, Sta. Mesa, Manila</li>
<li><i class="fas fa-phone"></i> (02) 8715-3004</li>
<li><i class="fas fa-envelope"></i> manforestcorp@yahoo.com</li>
<li><i class="fab fa-viber"></i> +63 917 812 3456</li>
```

#### 2. contact.html
- Update address
- Update phone numbers
- Update email
- Update Google Maps coordinates (line ~200)
- Update business hours

#### 3. privacy-policy.html
- Update Data Protection Officer email (line ~150)

### Step 4: Customize Color Scheme (Optional)

Edit `css/style.css` (lines 8-18):

```css
:root {
    --primary-color: #1a7f37;      /* Your brand color */
    --secondary-color: #e67e22;    /* Accent color */
    --accent-color: #f39c12;       /* Highlight color */
    /* ... */
}
```

### Step 5: Update Company Information

#### About Page (`about.html`)
- Line 50-80: Company story
- Line 100-130: Mission, Vision, Values
- Line 200-250: Timeline events

#### Services Page (`services.html`)
- Line 60-100: Service descriptions
- Line 150-200: Process steps

## 🌐 Running Locally

### Option 1: Python (Built-in)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser
http://localhost:8000
```

### Option 2: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 3: Node.js

```bash
# Install http-server globally
npm install -g http-server

# Run from project directory
http-server -p 8000

# Open browser
http://localhost:8000
```

## 🔗 Backend Integration

### Form Submissions

**1. Contact Form (`js/contact.js`)**

Replace line 35-45 with your backend endpoint:

```javascript
// Replace simulateAPICall with:
async function submitContact(formData) {
    const response = await fetch('https://your-api.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Submission failed');
    return response.json();
}
```

**2. Quote Request (`js/quote-request.js`)**

Update line 200-210:

```javascript
async function submitQuote(formData) {
    const response = await fetch('https://your-api.com/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    return response.json();
}
```

**3. Authentication (`js/auth.js`)**

Update authentication functions (lines 150-200):

```javascript
// Login
async function authenticateUser(credentials) {
    const response = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    // Store token
    localStorage.setItem('authToken', data.token);
    
    return data;
}

// Register
async function registerUser(userData) {
    const response = await fetch('https://your-api.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    
    return response.json();
}
```

### Google Maps Integration

Add to `contact.html` before `</body>`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

Update coordinates in `js/contact.js` (line 150):

```javascript
// Manforest Graphics actual location
const location = { 
    lat: 14.5995,  // Replace with actual latitude
    lng: 120.9842  // Replace with actual longitude
};
```

## 📧 Email Service Setup

### Option 1: EmailJS (Easy, No Backend)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create email template
3. Add to HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

4. Update form submission:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(() => console.log('Email sent!'));
```

### Option 2: FormSpree (Simple)

Update form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 3: Custom Backend

Create API endpoint to handle form submissions and send emails using:
- **PHP:** PHPMailer
- **Node.js:** Nodemailer
- **Python:** smtplib or SendGrid

## 🎨 Customization Tips

### Changing Fonts

Edit `css/style.css`:

```css
/* Import new Google Font */
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');

body {
    font-family: 'YourFont', sans-serif;
}
```

### Adding Animations

Use the existing animation classes:

```html
<div class="fade-in">Content fades in on scroll</div>
```

Or create custom animations in `css/style.css`:

```css
@keyframes yourAnimation {
    from { transform: scale(0); }
    to { transform: scale(1); }
}

.your-class {
    animation: yourAnimation 0.5s ease;
}
```

### Responsive Customization

Edit breakpoints in `css/responsive.css`:

```css
@media (max-width: 768px) {
    /* Your mobile styles */
}
```

## 🔍 SEO Optimization

### 1. Update Meta Tags

Each HTML file has meta tags to customize:

```html
<meta name="description" content="Your page description">
<meta name="keywords" content="signage, manila, custom signs">
<meta property="og:title" content="Your Title">
<meta property="og:image" content="images/og-image.jpg">
```

### 2. Add Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yoursite.com/</loc>
        <priority>1.0</priority>
    </url>
    <!-- Add all pages -->
</urlset>
```

### 3. Add robots.txt

Create `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

### 4. Google Analytics

Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID');
</script>
```

## 🚀 Deployment

### Option 1: Traditional Hosting (cPanel)

1. Compress project folder to .zip
2. Upload to server via FTP/cPanel File Manager
3. Extract in public_html directory
4. Set file permissions (644 for files, 755 for folders)
5. Test all pages

### Option 2: GitHub Pages (Free)

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository
# Push to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Site will be live at: username.github.io/repo
```

### Option 3: Netlify (Free, Easy)

1. Create account at [netlify.com](https://www.netlify.com/)
2. Drag and drop project folder
3. Site is live instantly
4. Custom domain supported

### Option 4: Vercel (Free, Fast)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

## ✅ Pre-Launch Checklist

- [ ] All images added and optimized
- [ ] Contact information updated
- [ ] Logo uploaded
- [ ] Colors customized
- [ ] Forms tested (submission works)
- [ ] All links checked (no broken links)
- [ ] Mobile responsive tested
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Google Maps working
- [ ] Email notifications working
- [ ] SEO meta tags updated
- [ ] Analytics installed
- [ ] Privacy policy updated with correct info
- [ ] Terms & conditions reviewed
- [ ] SSL certificate installed (HTTPS)
- [ ] 404 page tested
- [ ] Performance optimized (images compressed)

## 🐛 Troubleshooting

### Images not loading
- Check file paths (case-sensitive on Linux servers)
- Verify images exist in correct folders
- Check file extensions (.jpg vs .JPG)

### Forms not submitting
- Check browser console for errors (F12)
- Verify backend API is running
- Check CORS settings if using external API
- Ensure form action/endpoint is correct

### JavaScript not working
- Open browser console (F12) for error messages
- Verify all `.js` files are loaded (Network tab)
- Check for typos in function names
- Ensure jQuery is not required (this is vanilla JS)

### Styles not applying
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check CSS file paths in HTML
- Verify no CSS syntax errors
- Check browser DevTools for conflicts

## 📞 Support Resources

- **HTML/CSS:** [MDN Web Docs](https://developer.mozilla.org/)
- **JavaScript:** [JavaScript.info](https://javascript.info/)
- **Responsive Design:** [CSS-Tricks](https://css-tricks.com/)
- **Icons:** [Font Awesome](https://fontawesome.com/)

## 📈 Next Steps

1. ✅ Complete initial setup
2. 🔧 Connect to backend/database
3. 📧 Setup email service
4. 🔐 Implement real authentication
5. 🎨 Add more portfolio projects
6. 📱 Test on real devices
7. 🚀 Deploy to production
8. 📊 Monitor analytics
9. 🔄 Regular updates and maintenance

---

**Need Help?**
Refer to the main [README.md](README.md) for detailed project documentation.

Good luck with your Manforest Graphics website! 🎨🚀
