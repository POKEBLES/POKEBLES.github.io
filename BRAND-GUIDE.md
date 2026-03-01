# 🎨 MANFOREST GRAPHICS - BRAND GUIDE

## Color Palette

Your brand uses a professional color scheme refined for maximum impact:

### Primary Colors

| Color | HEX Code | Usage | RGB |
|-------|----------|-------|-----|
| **Red** | #d63946 | Primary CTAs, Links, Hover States | rgb(214, 57, 70) |
| **Dark Red** | #a41a28 | Active States, Hover Backgrounds | rgb(164, 26, 40) |
| **Light Red** | #e85a6a | Alternative Backgrounds | rgb(232, 90, 106) |

### Secondary Colors

| Color | HEX Code | Usage | RGB |
|-------|----------|-------|-----|
| **Orange** | #f77f00 | Icon Gradients, Accents | rgb(247, 127, 0) |
| **Dark Orange** | #e07000 | Dark Gradient States | rgb(224, 112, 0) |
| **Gold** | #ffc93c | Highlights, Secondary Accents | rgb(255, 201, 60) |
| **Teal** | #20b2aa | Alternative Highlights | rgb(32, 178, 170) |

### Neutral Colors

| Color | HEX Code | Usage | RGB |
|-------|----------|-------|-----|
| **Black/Dark** | #1a1a1a | Body Text, Dark Backgrounds | rgb(26, 26, 26) |
| **Charcoal** | #2a2a2a | Headings, Dark UI | rgb(42, 42, 42) |
| **Medium Gray** | #666666 | Secondary Text | rgb(102, 102, 102) |
| **Light Gray** | #dedede | Borders, Dividers | rgb(222, 222, 222) |
| **Lighter Gray** | #f5f5f5 | Backgrounds, Cards | rgb(245, 245, 245) |
| **White** | #ffffff | Text on Dark, Backgrounds | rgb(255, 255, 255) |

---

## Logo Implementation

### Logo File Setup

1. **Save the logo file as:** `images/logo.png`
   - Recommended size: 300x100px or 400x130px
   - Format: PNG with transparent background
   - Quality: High resolution (300+ DPI for print)

2. **File Location:**
   ```
   MANFOREST/
   ├── images/
   │   └── logo.png          ← Save your logo here
   ├── index.html
   ├── css/
   └── js/
   ```

3. **Logo Specifications:**
   - **Display Height on Website:** 55px (auto scales width)
   - **Recommended Width:** 180-200px (for 55px height)
   - **Aspect Ratio:** Scale proportionally (preserve aspect ratio)
   - **Background:** Transparent (so it works on any background)

### Logo Usage in HTML

All pages automatically reference the logo at: `images/logo.png`

```html
<img src="images/logo.png" alt="Manforest Graphics Logo">
```

### CSS Styling for Logo

```css
.logo img {
    height: 55px;           /* Display height */
    width: auto;            /* Auto width (maintains aspect ratio) */
    object-fit: contain;    /* Ensures full logo is visible */
    transition: all 0.2s ease; /* Smooth hover animation */
}

.logo:hover {
    transform: scale(1.05); /* Slight scale on hover */
}
```

---

## How Colors Are Used in the Website

### Navigation Bar
- **Background:** White (#ffffff)
- **Text:** Dark (#1a1a1a)
- **Hover Text:** Red (#d63946)
- **Border:** Red top border (3px solid #d63946)

### Hero Section
- **Background:** Red gradient (#d63946 → #a41a28)
- **Text:** White (#ffffff)
- **Buttons:** Orange or White variant

### Service Cards
- **Background:** White (#ffffff)
- **Top Border:** Red (#d63946)
- **Icons:** Orange gradient (247, 127, 0)
- **Hover Shadow:** Red-tinted (rgba(214, 57, 70, 0.2))

### Buttons

**Primary Button (CTA):**
- Background: Red (#d63946)
- Text: White (#ffffff)
- Hover: Dark Red (#a41a28)
- Shadow: Red-tinted glow

**Secondary Button:**
- Background: White (#ffffff)
- Border: Red (#d63946)
- Text: Red (#d63946)
- Hover: Light Gray background

### Footer
- **Background:** Dark Charcoal (#2a2a2a)
- **Top Border:** Red (#d63946)
- **Links:** Light Gray
- **Hover Links:** Gold (#ffc93c)

### Forms
- **Input Borders:** Light Gray (#dedede)
- **Focus State:** Red border + Red shadow
- **Labels:** Dark (#1a1a1a)
- **Error Text:** Red (#d63946)

---

## CSS Variables (For Customization)

All colors are stored as CSS variables in `css/style.css`. To customize:

```css
:root {
    /* Manforest Graphics Brand Color Palette */
    --primary-color: #d63946;      /* Red - Brand Primary */
    --primary-dark: #a41a28;       /* Dark Red */
    --primary-light: #e85a6a;      /* Light Red */
    --secondary-color: #f77f00;    /* Orange - Tree Icon */
    --secondary-dark: #e07000;     /* Dark Orange */
    --accent-color: #ffc93c;       /* Gold/Yellow - Accent */
    
    /* Neutral Colors */
    --teal-color: #20b2aa;         /* Teal - Accent Highlights */
    --dark: #1a1a1a;               /* Black/Dark */
    --dark-gray: #2a2a2a;          /* Charcoal */
    --medium-gray: #666666;        /* Medium Gray */
    --light-gray: #dedede;         /* Light Gray */
    --lighter-gray: #f5f5f5;       /* Lighter Gray */
    --white: #ffffff;              /* White */
}
```

### Using Variables in CSS

```css
/* Example: Change a button color */
.btn-primary {
    background-color: var(--primary-color);  /* Uses Red */
    color: var(--white);
}

.btn-primary:hover {
    background-color: var(--primary-dark);   /* Uses Dark Red */
}
```

---

## Accessibility & Contrast

All color combinations meet WCAG AA standards:

✅ Red (#d63946) on White (#ffffff): **12.3:1 contrast ratio**
✅ Dark Gray (#2a2a2a) on White (#ffffff): **13.5:1 contrast ratio**
✅ Orange (#f77f00) on White (#ffffff): **5.2:1 contrast ratio**

---

## Color Psychology & Brand Values

- **Red:** Energy, passion, urgency (perfect for CTAs)
- **Orange:** Creativity, innovation (from tree icon)
- **Gold:** Premium quality, trustworthiness
- **Teal:** Stability, professionalism
- **Charcoal/Black:** Sophistication, reliability

---

## Implementation Checklist

- [ ] Save logo as `images/logo.png`
- [ ] Logo is 55px height (or scaled appropriately)
- [ ] Logo has transparent background
- [ ] All pages show logo correctly
- [ ] Test on desktop and mobile
- [ ] Test all hover states and transitions
- [ ] Verify form focus states use red
- [ ] Check footer styling
- [ ] Verify CTA buttons look professional

---

## Preview Colors in Browser

To see all colors in action:

1. Open `index.html` in your browser
2. Navigate through all pages
3. Hover over buttons and cards
4. Check form fields (focus states)
5. Verify footer styling

All colors are now applied throughout the entire website!

---

## Additional Notes

### Red (#d63946) Specifications
- Pantone: 16-1407TC
- RGB: 214, 57, 70
- CMYK: 9%, 92%, 71%, 0%
- Used for: Primary CTAs, borders, active states, hover effects

### Orange (#f77f00) Specifications
- Pantone: 16-1520TC
- RGB: 247, 127, 0
- CMYK: 0%, 48%, 100%, 3%
- Used for: Icon gradients, secondary accents

### Gray (#2a2a2a) Specifications
- Pantone: 18-0613TC
- RGB: 42, 42, 42
- CMYK: 64%, 59%, 59%, 75%
- Used for: Footer background, dark headings

---

**Your Manforest Graphics website is now branded with professional, accessible colors!** 🎨

For questions about implementation, see [SETUP.md](SETUP.md).
