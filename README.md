# Bitcoinomics Website

A modern, responsive website inspired by Jeton's design, customized for cryptocurrency and Bitcoin services.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Elements**: 
  - Animated process steps
  - Live cryptocurrency exchange widget
  - Smooth scrolling navigation
  - Mobile hamburger menu
- **Bitcoin Focus**: Cryptocurrency-themed content and branding
- **Performance Optimized**: Fast loading with optimized assets

## File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Getting Started

1. Open `index.html` in any modern web browser
2. No server setup required - it's a static website
3. All assets are self-contained or loaded from CDNs

## Key Sections

- **Header**: Fixed navigation with dropdown menus
- **Hero**: Main banner with app download buttons
- **Features**: Cryptocurrency services overview
- **Process**: Step-by-step user journey
- **Bitcoin Card**: Product showcase
- **Exchange**: Interactive currency converter
- **Testimonials**: Customer reviews
- **Footer**: Links and legal information

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Customization

### Colors
The main brand colors can be updated in `styles.css`:
- Primary gradient: `#ff6b35` to `#f39c12`
- Background gradient: `#667eea` to `#764ba2`

### Content
Update text content directly in `index.html` to match your brand.

### Logo
Replace the logo source in the header:
```html
<img src="../marketing/logo/bitcoinomics_logo_no_background.svg" alt="Bitcoinomics" class="logo">
```

## Features in Detail

### Interactive Process Steps
- Auto-progressing steps every 3 seconds
- Click to manually navigate
- Hover to pause progression
- Restart button to begin again

### Exchange Widget
- Real-time price simulation
- Click arrow to swap currencies
- Automatic calculations
- Price updates every 10 seconds

### Mobile Menu
- Hamburger menu for mobile devices
- Smooth slide-in animation
- Backdrop blur effect
- Click outside to close

## Performance Features

- CSS animations with `will-change` for optimization
- Intersection Observer for scroll animations
- Throttled scroll events
- Lazy loading animations
- Reduced motion support for accessibility

## Accessibility

- Focus states for keyboard navigation
- High contrast mode support
- Reduced motion preferences
- Semantic HTML structure
- ARIA labels where needed

## License

This website template is for demonstration purposes. Replace with your own content and branding before commercial use.
