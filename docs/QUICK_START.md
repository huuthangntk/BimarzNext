# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies

```bash
cd claude
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- and all other dependencies

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Overview

This is a **7-page Typography Emotion Journey** landing page for a VPN service.

### The Story (Emotional Arc)

1. **Page 1 - EXPOSED** (Fear/Danger)
   - Glitch effects, flashing words, chaotic atmosphere
   - Emotion: "Your data is at risk"

2. **Page 2 - YOU** (Anxiety/Surveillance)
   - Circular scanning animations, orbital tracking words
   - Emotion: "You are being watched"

3. **Page 3 - Blocked** (Frustration/Confinement)
   - Censor bars, stamp effects, restricted access
   - Emotion: "Your freedom is limited"

4. **Page 4 - ?** (Hope/Curiosity)
   - Emerging warm light, "What if..." question
   - Emotion: "There might be a solution"

5. **Page 5 - VPN Solution** (Understanding/Confidence)
   - Flowing aurora, protective dome, building words
   - Emotion: "This is how it works"

6. **Page 6 - OPEN SOURCE** (Trust/Empowerment)
   - Glass cathedral, icon cloud, transparency
   - Emotion: "You can trust this technology"

7. **Page 7 - FREE!** (Joy/Freedom)
   - Celebration animations, pricing cards, free trial
   - Emotion: "Experience true freedom"

## Navigation

### Desktop
- **Mouse Scroll**: Navigate between pages
- **Page Indicator**: Click dots on right side to jump to any page
- **Page 7**: Normal vertical scrolling within the page

### Mobile
- **Swipe Up**: Go to next page
- **Swipe Down**: Go to previous page
- **Page 7**: Normal vertical scrolling, swipe down at top to return to Page 6

## Features

### Theme Toggle
- Click the theme button in header
- Watch the ripple effect spread across the page
- Automatic persistence in localStorage

### Language Support
Languages available:
- English
- Farsi (فارسی)
- Chinese (中文)
- Russian (Русский)
- Ukrainian (Українська)
- Hindi (हिन्दी)

### Free Trial Offer (Page 7)
- **1 GB data for 1 Day**
- Only registration required
- **NO credit card needed**
- No strings attached

### Pricing Plans
1. **Starter** - $2.50/month - 50 GB
2. **Pro** - $5.99/month - 100 GB (Most Popular)
3. **Premium** - $7.99/month - 150 GB
4. **Ultimate** - $9.99/month - 200 GB + Priority Support

## Key Technical Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark/Light theme with smooth transitions
- ✅ Multi-language support
- ✅ Smooth 60fps animations
- ✅ Touch/swipe gestures on mobile
- ✅ Accessibility support (keyboard nav, reduced motion)
- ✅ SEO optimized
- ✅ TypeScript for type safety

## File Structure

```
claude/
├── app/                 # Next.js App Router
├── components/          # React components
│   └── pages/          # Individual page components
├── contexts/            # React Context (Theme, Language)
├── public/             # Static assets (in parent folder)
└── theme.json          # Design system
```

## Customization

### Change Colors
Edit `app/globals.css` CSS variables:
```css
:root {
  --color-primary: #2563EB;
  --color-accent: #10B981;
  /* ... etc */
}
```

### Change Content
Each page component is in `components/pages/Page*.tsx`
Edit the text, animations, or layout as needed.

### Change Pricing
Edit the `PRICING_CARDS` array in `components/pages/Page7.tsx`

## Troubleshooting

### Fonts not loading?
Make sure `Lalezar.otf` is in the shared `/public/` folder (parent directory)

### Icons not showing on Page 6?
Verify all icon files exist in `/public/`:
- v2rayV.png, v2rayng.svg, v2rayN.svg, v2rayA.png
- Sing-box.svg, qv2ray.svg, hiddify.svg

### Animations laggy?
- Check browser DevTools Performance tab
- Ensure hardware acceleration is enabled
- Test in Chrome/Edge for best performance

## Development Tips

### Testing Responsive Design
Use browser DevTools device emulation:
- iPhone 12/13 Pro (390x844)
- iPad Pro (1024x1366)
- Desktop (1920x1080)

### Testing Themes
Click theme toggle and verify:
- All colors transition smoothly
- Text remains readable
- Animations still work
- No visual glitches

### Testing Navigation
- Scroll through all 7 pages
- Test swipe gestures on mobile
- Verify Page 7 scrolls normally
- Check page indicator updates correctly

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Upload `.next` folder and `package.json`
3. Run `npm start` on server

## Support

For issues or questions, refer to:
- `README.md` - Project overview
- `IMPLEMENTATION_NOTES.md` - Technical details
- Next.js documentation
- Tailwind CSS documentation
- Framer Motion documentation

---

**Happy coding!** 🚀

