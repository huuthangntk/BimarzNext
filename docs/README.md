# VPN Landing Page - Typography Emotion Journey

A stunning Next.js landing page that tells a story through typography and animations. This project showcases a 7-page emotional journey from fear to freedom, perfect for VPN services.

## Features

- 🎨 **7 Unique Pages** - Each with its own emotional story and animations
- 🌓 **Dark/Light Theme** - Smooth theme transitions with ripple effects
- 🌍 **Multi-language Support** - 6 languages (English, Farsi, Chinese, Russian, Ukrainian, Hindi)
- 📱 **Fully Responsive** - Mobile-first design with swipe gestures
- ⚡ **Performance Optimized** - Smooth 60fps animations
- ♿ **Accessible** - WCAG compliant with reduced motion support

## Pages Overview

1. **Threats and Dangers** - Fear and urgency through glitch effects
2. **Tracked and Monitored** - Surveillance anxiety with circular scanning
3. **Restrictions and Censorship** - Frustration with censor bars
4. **Affordable for All** - Hope emerging through warm light
5. **VPN Solution** - Confidence with flowing aurora effects
6. **Open Source Philosophy** - Trust through transparency
7. **Product and Pricing** - Joy and freedom with celebration animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Project Structure

```
claude/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main page with navigation logic
├── components/            # Reusable components
│   ├── pages/            # Individual page components (Page1-Page7)
│   ├── Header.tsx        # Header with navigation
│   ├── Footer.tsx        # Footer with links
│   ├── PageIndicator.tsx # Vertical page indicator
│   ├── ScrollIndicator.tsx # Animated scroll hint
│   └── GlassCard.tsx     # Glass morphism card component
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme and language state management
├── public/               # Static assets (shared root folder)
│   ├── Lalezar.otf       # Primary font
│   ├── logo-*.png        # Logo files
│   └── *.svg/*.png       # Open source VPN icons
└── theme.json            # Design system specifications

```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **CSS Custom Properties** - Dynamic theming

## Navigation

- **Desktop**: Mouse scroll or page indicator clicks
- **Mobile**: Swipe up/down gestures
- **Page 7**: Normal scrolling within the page

## Customization

### Colors

Edit `app/globals.css` to modify theme colors using CSS variables:

```css
:root {
  --color-primary: #2563EB;
  /* ... */
}
```

### Typography

The project uses the Lalezar font. To change fonts, update:
1. Font import in `app/globals.css`
2. Font family in `tailwind.config.ts`

### Content

Each page component (`components/pages/Page*.tsx`) can be individually customized for content and animations.

## Performance

- All animations are GPU-accelerated
- Images are optimized with Next.js Image component
- Lazy loading for off-screen content
- Reduced motion support for accessibility

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is private and proprietary.

## Acknowledgments

- Design inspired by modern web animation trends
- Icons from open source VPN projects
- Font: Lalezar by Borna Izadpanah

