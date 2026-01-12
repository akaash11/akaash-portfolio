# Setup Instructions

## Required Files

### 1. Resume PDF
Add your resume to the `public/` directory:
```
public/resume.pdf
```

The Hero section has a "Resume" button that links to `/resume.pdf`.

### 2. Open Graph Image (Optional but recommended)
Add an Open Graph image for social media sharing:
```
public/og-image.png
```
Recommended size: 1200x630 pixels

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Akaash Trivedi - Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Full Stack Engineer with 7+ years of experience

# Social Links
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/akaash-trivedi
NEXT_PUBLIC_GITHUB_URL=https://github.com/akaash11
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/akaasht
NEXT_PUBLIC_EMAIL=akaashtrivedi2@gmail.com

# Analytics (Optional - uncomment when ready)
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Contact Form Integration (Optional)
# NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
# NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key
```

## Analytics Integration

The site includes a lightweight analytics utility in `src/utils/analytics.ts` that tracks:
- Project link clicks
- Resume clicks
- Contact form submissions

Currently, it logs to console in development. To integrate with a real analytics service:

### Plausible (Recommended)
```typescript
// Update src/utils/analytics.ts
export function track(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: properties });
  }
}
```

### Google Analytics 4
```typescript
export function track(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}
```

### Umami
```typescript
export function track(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, properties);
  }
}
```

## Contact Form Backend

The contact form currently simulates submission. To connect it to a real backend:

### Option 1: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Update `src/components/Contact.tsx`:

```typescript
const response = await fetch(
  `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }),
  }
);
```

### Option 2: Create API Route
Create `src/app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  // Validate input
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }
  
  // Send email using nodemailer or your preferred service
  // ... implementation
  
  return NextResponse.json({ success: true });
}
```

## Deployment Checklist

Before deploying to production:

- [ ] Add your `resume.pdf` to `public/` directory
- [ ] Add `og-image.png` for social sharing (optional)
- [ ] Update personal information in all data files
- [ ] Set up environment variables in Vercel/hosting platform
- [ ] Configure analytics if desired
- [ ] Set up contact form backend if needed
- [ ] Test all links and buttons
- [ ] Test responsive design on mobile devices
- [ ] Verify SEO meta tags
- [ ] Add Google Search Console verification (optional)
- [ ] Set up custom domain (optional)

## Vercel Deployment

1. Push code to GitHub
2. Import repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Detect Next.js configuration
- Set up CI/CD
- Provide HTTPS
- Enable preview deployments for PRs

## Troubleshooting

### Hydration Errors
If you see hydration mismatch errors, ensure:
- Server and client render the same initial content
- No browser-only APIs are called during SSR
- Date/time formatting is consistent

### Styling Issues
If MUI styles don't load properly:
- Check that ThemeRegistry is properly wrapping your app
- Ensure @mui/material-nextjs is installed
- Clear `.next` cache and rebuild

### Contact Form Not Working
- Check browser console for errors
- Verify CORS settings if using external API
- Test with a simple API endpoint first
- Check honeypot field isn't being triggered

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: akaashtrivedi2@gmail.com
