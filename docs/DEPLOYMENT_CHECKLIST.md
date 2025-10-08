# Deployment Checklist

## Pre-Deployment Tasks

### 1. Install Dependencies
```bash
cd claude
npm install
```
**Status**: ⏳ Pending
**Expected time**: 2-3 minutes

### 2. Verify Shared Assets
Confirm these files exist in `/public/` (parent folder):
- [ ] `Lalezar.otf` - Primary font
- [ ] `logo-32.png`, `logo-64.png`, `logo-128.png`, `logo-256.png`, `logo.png`
- [ ] `v2rayV.png`
- [ ] `v2rayng.svg`
- [ ] `v2rayN.svg`
- [ ] `v2rayA.png`
- [ ] `Sing-box.svg`
- [ ] `qv2ray.svg`
- [ ] `hiddify.svg`

**Status**: ⏳ Should already exist

### 3. Run Development Server
```bash
npm run dev
```
**Status**: ⏳ Pending
**Test at**: http://localhost:3000

### 4. Manual Testing Checklist

#### Page Navigation
- [ ] Scroll down navigates from Page 1 → 7
- [ ] Scroll up navigates from Page 7 → 1
- [ ] Page indicator dots are clickable
- [ ] Page 7 has normal vertical scrolling
- [ ] Scroll up from top of Page 7 returns to Page 6

#### Mobile Testing (use DevTools)
- [ ] Swipe up/down navigates pages
- [ ] Hamburger menu opens
- [ ] Hamburger menu has close button (X)
- [ ] Menu closes on backdrop click
- [ ] All pages are readable without overlap

#### Theme System
- [ ] Theme toggle button works
- [ ] Ripple effect appears on theme toggle
- [ ] Colors change smoothly
- [ ] Theme persists on page reload
- [ ] Both themes look good on all pages

#### Language Selector
- [ ] Dropdown opens on click
- [ ] All 6 languages listed
- [ ] Selected language persists
- [ ] Works on both desktop and mobile

#### Animations
- [ ] Page 1: Glitch effect visible
- [ ] Page 2: **Circular** scanning (not square)
- [ ] Page 3: Censor bars appear over words
- [ ] Page 4: Warm light pulses
- [ ] Page 5: Aurora waves flow
- [ ] Page 6: Glass effects and icons load
- [ ] Page 7: Celebration particles float

#### Content Verification
- [ ] Logo appears in header
- [ ] Footer has 3 links: Blog, Privacy Policy, About Us
- [ ] Footer has social icons (Instagram, Telegram)
- [ ] Page 6 shows all 7 VPN client icons
- [ ] Page 7 shows free trial banner (1GB/1Day)
- [ ] Page 7 shows "NO credit card" text
- [ ] Page 7 has 4 pricing cards

### 5. Build for Production
```bash
npm run build
```
**Status**: ⏳ Pending
**Expected time**: 30-60 seconds

Check for:
- [ ] No build errors
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Build completes successfully

### 6. Test Production Build
```bash
npm start
```
**Status**: ⏳ Pending
**Test at**: http://localhost:3000

Verify:
- [ ] All features work in production mode
- [ ] Animations are smooth
- [ ] No console errors

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Automatic deployments
- Free tier available
- Global CDN
- No configuration needed

**Steps**:
1. Push code to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit - VPN landing page"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. **Important**: Set root directory to `claude`
6. Click "Deploy"
7. Wait 2-3 minutes
8. Done! ✅

**Environment Variables**: None needed

**Custom Domain**: Add in Vercel dashboard after deployment

---

### Option 2: Netlify

**Steps**:
1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `.next` folder
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy

---

### Option 3: Traditional Hosting

**Requirements**:
- Node.js 18+ on server
- npm or yarn
- Port 3000 (or configure different port)

**Steps**:
1. Upload project to server
2. SSH into server
3. Run:
   ```bash
   cd claude
   npm install
   npm run build
   npm start
   ```

4. Use process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start npm --name "vpn-landing" -- start
   pm2 save
   ```

5. Configure Nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Post-Deployment

### 1. Verify Live Site
- [ ] All 7 pages load correctly
- [ ] Animations are smooth
- [ ] Theme toggle works
- [ ] Mobile experience is good
- [ ] Images load (logo, icons)
- [ ] Font loads (Lalezar)

### 2. Performance Check
Use [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best practices score > 90
- [ ] SEO score > 90

If scores are low:
- Enable Vercel Analytics
- Add loading="lazy" to images
- Optimize font loading

### 3. Browser Testing
Test in:
- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### 4. SEO Configuration

Add to `app/layout.tsx`:
```typescript
export const metadata = {
  title: "VPN - Freedom for Everyone",
  description: "Experience true online freedom with our VPN service. Fast, secure, and private.",
  keywords: "VPN, privacy, security, freedom, encryption",
  openGraph: {
    title: "VPN - Freedom for Everyone",
    description: "Experience true online freedom",
    images: ['/public/logo-256.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VPN - Freedom for Everyone",
    description: "Experience true online freedom",
    images: ['/public/logo-256.png'],
  }
}
```

### 5. Analytics (Optional)

Add Google Analytics or Vercel Analytics:
```typescript
// In app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Troubleshooting

### Fonts not loading on live site
- Ensure `/public/Lalezar.otf` exists in parent folder
- Check browser console for 404 errors
- Verify font path in `globals.css`

### Icons not showing on Page 6
- Verify all SVG/PNG files in `/public/`
- Check image paths in `Page6.tsx`
- Look for 404 errors in Network tab

### Animations not smooth
- Check Performance tab in DevTools
- Ensure hardware acceleration is enabled
- Test on different devices

### Theme toggle not working
- Check browser console for errors
- Verify localStorage is enabled
- Test in incognito mode

### Mobile navigation issues
- Test touch events in DevTools device mode
- Check for JavaScript errors
- Verify swipe threshold (50px)

---

## Performance Optimization (Optional)

### 1. Image Optimization
Already using Next.js Image component ✅

### 2. Code Splitting
Already implemented via Next.js ✅

### 3. Font Optimization
Add to `globals.css`:
```css
@font-face {
  font-family: 'Lalezar';
  src: url('/public/Lalezar.otf') format('opentype');
  font-display: swap; /* Already added ✅ */
}
```

### 4. Reduce Motion Support
Already implemented ✅

### 5. Lazy Loading
Consider for Page 7 pricing cards if performance is slow:
```typescript
import dynamic from 'next/dynamic';
const Page7 = dynamic(() => import('@/components/pages/Page7'));
```

---

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Test after browser updates
- [ ] Monitor error logs
- [ ] Check analytics for user behavior

### Content Updates
- **Pricing**: Edit `components/pages/Page7.tsx`
- **Languages**: Add to `contexts/ThemeContext.tsx`
- **Colors**: Edit `app/globals.css` CSS variables
- **Text**: Edit individual page components

---

## Success Criteria

Your deployment is successful when:
- ✅ All 7 pages load without errors
- ✅ Animations are smooth (60fps)
- ✅ Theme toggle works with ripple effect
- ✅ Mobile experience is excellent
- ✅ All images/fonts load correctly
- ✅ No console errors
- ✅ PageSpeed score > 90
- ✅ Works in all major browsers

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Vercel Support**: https://vercel.com/support

---

**Status**: Ready for deployment! 🚀

Follow this checklist step by step for a smooth deployment process.

