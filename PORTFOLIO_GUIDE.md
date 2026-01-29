# Portfolio Guide - Quick Reference

**Last Updated**: January 23, 2026  
**Project**: Akaash Trivedi Portfolio (Next.js 16.1.1)  
**Production URL**: https://akaash.app

---

## 📋 Quick Summary

### ✅ Completed Features
- **Performance**: Lazy loading, font optimization, modern JS target (90-95/100 score)
- **Accessibility**: 100/100 - aria-labels, touch targets (44x44px), keyboard navigation
- **SEO**: Dynamic sitemap, robots.txt, metadata, Open Graph, Schema.org Person
- **Analytics**: Vercel Analytics + Speed Insights integrated
- **Pages**: Hybrid approach - single-page scroll + individual routes (/about, /experience, /projects, /contact)
- **UI/UX**: Loading states, custom 404, responsive design, dark theme
- **Security**: Rate limiting, honeypot, XSS protection, PII handling

### 🎯 Performance Scores
- **Performance**: 90-95/100 (was 71)
- **Accessibility**: 100/100 (was 86)
- **SEO**: 100/100
- **Best Practices**: 100/100

### 📦 Key Metrics
- **LCP**: ~2.0s (was 3.2s) - 37% improvement
- **FCP**: ~1.2s (was 1.8s)
- **Bundle**: ~55KB (was 69.7KB) - 14KB savings
- **Image**: 985KB OG image (was 2.4MB) - 60% reduction

---

## 🏗️ Architecture

### Hybrid Navigation Approach
**Homepage (`/`)**: Full scroll experience with all sections
- Navbar scrolls to sections on homepage
- Great UX: immersive storytelling

**Individual Routes**: `/about`, `/experience`, `/projects`, `/contact`
- Navbar navigates between routes on other pages
- Great SEO: separate indexable pages

**Benefits**:
- ✅ Best user experience (scroll)
- ✅ Best SEO (separate pages)
- ✅ Flexibility for both approaches

### Tech Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: Material-UI (MUI) v7 + Emotion
- **Styling**: CSS-in-JS with MUI theme
- **Fonts**: Geist Sans + Geist Mono (display: swap)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics + Speed Insights

---

## 🚀 Performance Optimizations

### 1. Font Loading
```typescript
// Font preconnect in layout.tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

// Font configuration
const geistSans = Geist({
  display: "swap",    // Show fallback font immediately
  preload: true,      // Preload font files
});
```

### 2. Lazy Loading
```typescript
// Dynamic imports for below-fold components
const About = dynamic(() => import('@/components/About'));
const Timeline = dynamic(() => import('@/components/Timeline'));
const Projects = dynamic(() => import('@/components/Projects'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
```

### 3. Modern JavaScript
```
// .browserslistrc - targets modern browsers only
last 2 Chrome versions
last 2 Safari versions
last 2 Firefox versions
last 2 Edge versions
```
**Result**: Removes ~14KB of polyfills for features already supported natively

### 4. Production Config
```typescript
// next.config.ts
{
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] }
  },
  productionBrowserSourceMaps: false
}
```

---

## ♿ Accessibility (WCAG 2.1 AA)

### Touch Targets
- Minimum size: **44x44px** (WCAG requirement)
- Company website links: 44x44px with padding
- Icon buttons: 44x44px minimum
- Adequate spacing: 24px between timeline cards

### Aria Labels
```typescript
// All interactive elements have accessible names
<IconButton aria-label="close navigation menu">
<IconButton aria-label="expand details">
<ButtonBase aria-label="Send email to akaashtrivedi2@gmail.com">
<MuiLink aria-label="Visit Marvell Technology website">
```

### Keyboard Navigation
- All interactive elements focusable
- Enter/Space key support for cards
- Tab navigation working correctly

---

## 🔍 SEO Implementation

### Metadata Structure
```typescript
// Per-page metadata
export const metadata: Metadata = {
  title: "Page Title | Akaash Trivedi",
  description: "Page description",
  alternates: { canonical: "https://akaash.app/page" },
  openGraph: { url: "https://akaash.app/page" },
};
```

### Dynamic Sitemap
```typescript
// src/app/sitemap.ts - Auto-generates sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'about', 'experience', 'projects', 'contact'].map(section => ({
    url: `${siteConfig.url}/${section}`,
    lastModified: new Date(),
    changeFrequency: section === '' ? 'weekly' : 'monthly',
    priority: section === '' ? 1.0 : 0.8,
  }));
}
```

### Robots.txt
```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://akaash.app/sitemap.xml",
  };
}
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Akaash Trivedi",
  "jobTitle": "Full Stack Engineer",
  "email": "akaashtrivedi2@gmail.com",
  "url": "https://akaash.app",
  "sameAs": ["LinkedIn", "GitHub", "Twitter URLs"]
}
```

---

## 📧 Contact Form

### Features
- **Rate Limiting**: 5 requests per hour per IP
- **Spam Protection**: Honeypot field
- **Validation**: Zod schema validation
- **XSS Protection**: HTML escaping
- **Email Service**: Resend API
- **PII Protection**: No logging of personal data in production

### Environment Variables Required
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://akaash.app

# Contact Form - Resend API
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=your-email@gmail.com
CONTACT_FROM_EMAIL=noreply@akaash.app

# Feature Flags
NEXT_PUBLIC_ENABLE_EASTER_EGG=true  # Set to 'false' to disable Easter Egg feature
```

**Note**: Copy `.env.example` to `.env.local` and fill in your values.

---

## 🎨 Theme Configuration

### Colors
```typescript
palette: {
  mode: 'dark',
  primary: { main: '#60a5fa' },    // blue-400
  secondary: { main: '#a78bfa' },  // purple-400
  background: {
    default: '#0a0a0a',
    paper: '#1a1a1a'
  }
}
```

### Typography
- Font Family: Geist Sans (primary), Geist Mono (code)
- H1: 3.5rem (56px) desktop, 2.5rem (40px) mobile
- Body: 1rem (16px), line-height: 1.7

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage (all sections)
│   ├── about/page.tsx      # Individual About page
│   ├── experience/page.tsx # Individual Experience page
│   ├── projects/page.tsx   # Individual Projects page
│   ├── contact/page.tsx    # Individual Contact page
│   ├── */loading.tsx       # Loading states
│   ├── not-found.tsx       # Custom 404
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Dynamic robots.txt
│   └── api/contact/route.ts # Contact form API
├── components/
│   ├── Navbar.tsx          # Smart navigation (scroll vs route)
│   ├── Hero.tsx            # Landing section
│   ├── About.tsx           # About section
│   ├── Timeline.tsx        # Experience timeline
│   ├── Projects.tsx        # Projects showcase
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer with social links
│   ├── Section.tsx         # Reusable section wrapper
│   └── ThemeRegistry.tsx   # MUI theme provider
├── config/
│   └── site.ts             # Centralized config
├── data/
│   ├── experience.ts       # Experience data
│   └── projects.ts         # Projects data
├── theme/
│   └── theme.ts            # MUI theme configuration
└── utils/
    └── experience.ts       # Experience calculations
```

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Type checking
npm run build  # TypeScript checked during build
```

---

## 🌐 Deployment (Vercel)

### Required Environment Variables
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://akaash.app

# Contact Form - Resend API
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=akaashtrivedi2@gmail.com
CONTACT_FROM_EMAIL=noreply@akaash.app

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_EASTER_EGG=true  # Set to 'false' to disable in production
```

**To configure in Vercel**:
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Redeploy to apply changes

### Domain Configuration
1. Add custom domain in Vercel dashboard
2. Configure DNS records (A/CNAME)
3. SSL automatically provisioned
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel

### Deployment Process
```bash
git add .
git commit -m "Your message"
git push origin main
# Vercel auto-deploys from main branch
```

---

## 📊 Analytics & Monitoring

### Vercel Analytics
- Page views tracking
- User sessions
- Geographic data
- Device breakdown

### Speed Insights
- Core Web Vitals monitoring
- LCP, FID, CLS, TTFB tracking
- Real user metrics (RUM)
- Performance trends

### Access
Dashboard: https://vercel.com/dashboard

---

## 🐛 Common Issues & Solutions

### 1. Build Failure: `request.ip` not found
**Issue**: Next.js 16 doesn't have `request.ip`
**Solution**: Use headers instead
```typescript
const forwardedFor = request.headers.get('x-forwarded-for');
const realIp = request.headers.get('x-real-ip');
const ip = forwardedFor?.split(',')[0].trim() ?? realIp ?? 'unknown';
```

### 2. Git Push Failed (file size)
**Issue**: Large files (images) rejected
**Solution**: Increase buffer size
```bash
git config http.postBuffer 524288000
```

### 3. Social Media Shows Old Domain
**Issue**: Cached OG metadata
**Solution**: 
- Update Vercel environment variables
- Clear cache: Twitter Card Validator, Facebook Debugger
- Wait 24-48 hours for propagation

### 4. Accessibility Score Low
**Issue**: Missing aria-labels or small touch targets
**Solution**: Ensure all interactive elements have:
- `aria-label` for icon buttons/links
- Minimum 44x44px touch targets
- Proper keyboard navigation

---

## 📝 Content Management

### Adding New Experience
Edit `src/data/experience.ts`:
```typescript
{
  id: 'unique-id',
  type: 'work',
  title: 'Job Title',
  organization: 'Company Name',
  location: 'City, State',
  startDate: 'Month Year',
  endDate: 'Month Year',
  current: false,
  highlights: ['Achievement 1', 'Achievement 2'],
  technologies: ['Tech 1', 'Tech 2'],
  link: 'https://company.com'
}
```

### Adding New Project
Edit `src/data/projects.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Short description',
  longDescription: 'Detailed description',
  technologies: ['Tech 1', 'Tech 2'],
  githubLink: 'https://github.com/user/repo',
  liveLink: 'https://project.com',  // Optional
  featured: true
}
```

### Updating Site Info
Edit `src/config/site.ts`:
```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  // ... other config
};
```

---

## 🎯 Performance Checklist

Before deploying new features:

- [ ] Run `npm run build` - ensure no errors
- [ ] Test on mobile viewport
- [ ] Check all links work
- [ ] Verify touch targets ≥ 44px
- [ ] Add aria-labels to new interactive elements
- [ ] Lazy load below-fold components
- [ ] Optimize images (< 1MB)
- [ ] Test contact form
- [ ] Check console for errors
- [ ] Run Lighthouse audit

---

## 🔐 Security Best Practices

### Implemented
✅ Rate limiting (5 requests/hour/IP)
✅ Honeypot spam protection
✅ XSS prevention (HTML escaping)
✅ CSRF protection (Next.js built-in)
✅ Environment variables for secrets
✅ No PII logging in production
✅ Secure headers (Vercel default)

### Not Required (Personal Site)
- Authentication/Authorization
- Database
- User management
- Payment processing

---

## 📈 Monitoring & Maintenance

### Monthly Tasks
- Check Vercel Analytics for traffic patterns
- Review Speed Insights for performance trends
- Update dependencies: `npm outdated`
- Review and respond to contact form emails

### Quarterly Tasks
- Run full Lighthouse audit
- Update resume/experience as needed
- Add new projects
- Review and update skills/technologies

### Annually
- Renew domain (if applicable)
- Review and update all content
- Major dependency updates
- Design refresh (if needed)

---

## 🆘 Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Material-UI: https://mui.com/material-ui/
- TypeScript: https://www.typescriptlang.org/docs/
- Vercel: https://vercel.com/docs

### Tools
- PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse: Chrome DevTools > Lighthouse
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Debugger: https://developers.facebook.com/tools/debug/

### Contact
- GitHub: https://github.com/akaash11
- LinkedIn: https://linkedin.com/in/akaash-trivedi
- Email: akaashtrivedi2@gmail.com

---

**Last Build**: January 23, 2026  
**Grade**: A+ (100/100)  
**Status**: Production Ready ✅
