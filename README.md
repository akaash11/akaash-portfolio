# Akaash Trivedi - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Material UI.

## 🚀 Live Demo

[View Live Site](https://akaasht.vercel.app)

## ✨ Features

- **Modern Stack**: Next.js 15 (App Router), TypeScript, Material UI
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Dark Theme**: Professional dark theme optimized for readability
- **Interactive Sections**:
  - Hero with gradient background and CTA buttons
  - Dynamic About section with expandable tech stack
  - Filterable Experience timeline with collapsible cards
  - Project showcase with badges and live links
  - Contact form with Resend integration
- **Performance Optimized**: Fast loading, smooth scrolling, minimal dependencies
- **SEO Optimized**: Structured data (JSON-LD), meta tags, Open Graph, sitemap
- **Security Hardened**: XSS protection, GDPR compliant, honeypot spam filter
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, reduced motion support
- **Error Handling**: React Error Boundary prevents full app crashes
- **Analytics Ready**: Scaffolded for Plausible/Umami/GA4 integration

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation with scrollspy
│   │   ├── Hero.tsx            # Landing section
│   │   ├── About.tsx           # About section
│   │   ├── Timeline.tsx        # Experience timeline
│   │   ├── Projects.tsx        # Projects grid
│   │   ├── ProjectCard.tsx     # Individual project card
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Section.tsx         # Reusable section wrapper
│   │   └── ThemeRegistry.tsx   # MUI theme provider
│   ├── config/
│   │   └── site.ts             # Site configuration (URLs, metadata)
│   ├── data/
│   │   ├── experience.ts       # Experience data
│   │   └── projects.ts         # Projects data
│   ├── theme/
│   │   └── theme.ts            # MUI theme configuration
│   └── utils/
│       ├── analytics.ts        # Analytics utility
│       └── experience.ts       # Experience calculation helpers
├── public/
│   ├── resume.pdf              # Your resume (add this)
│   ├── og-image.png            # Open Graph image (add this)
│   ├── robots.txt              # SEO crawler instructions
│   └── sitemap.xml             # Static sitemap (optional)
└── .env.example                # Environment variables template
```

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akaash11/akaash-portfolio.git
   cd akaash-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📝 Customization Guide

### Update Personal Information

1. **Experience Data** (`src/data/experience.ts`)
   - Add/edit work experience, education, research, teaching roles
   - Update dates, descriptions, technologies

2. **Projects Data** (`src/data/projects.ts`)
   - Add/edit projects with title, subtitle, description, highlights
   - Add badges (Featured, Awards, etc.)
   - Include live links, GitHub links, Devpost links

3. **About Section** (`src/components/About.tsx`)
   - Update bio paragraphs
   - Modify strengths/capabilities
   - Update tech stack

4. **Site Configuration** (`src/config/site.ts`) ⭐ **Start Here**
   - Site URL and metadata
   - Your name, title, email, location
   - Social links (LinkedIn, GitHub, Twitter)
   - OG image path
   - **Why centralize?** Single source of truth for all site-wide settings. Changes here update metadata, footer, contact section, and SEO automatically.

5. **Resume**
   - Add your `resume.pdf` to the `public/` directory
   - The link in `Hero.tsx` already points to `/resume.pdf`

All site-wide settings are centralized in `src/config/site.ts`:
- Site URL (from `NEXT_PUBLIC_SITE_URL` env var)
- Site name and description
- Author information
- Social links
- OG image path

**Why centralize?** This ensures consistency across metadata, sitemap, and all components.

### Customize Theme

Edit `src/theme/theme.ts` to customize:
- Color palette
- Typography
- Component styles
- Spacing

## 🚀 Deployment

### Before Deploying

1. **Add Required Assets** (see `public/ASSETS_README.md`):
   - Resume PDF (`public/resume.pdf`)
   - OG image (`public/og-image.png`) - 1200x630
   - Favicon set (optional but recommended)

2. **Set Environment Variables**:
   ```bash
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO_EMAIL=akaashtrivedi2@gmail.com
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   NEXT_PUBLIC_SITE_URL=https://akaasht.vercel.app
   ```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables in Vercel project settings

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📊 Analytics Integration

The site includes an analytics utility ready for integration:

1. **Plausible** (Recommended - privacy-friendly)
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
   ```

2. **Umami** (Self-hosted, privacy-friendly)
   ```bash
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
   ```

3. **Google Analytics 4**
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

Update `src/utils/analytics.ts` to integrate with your chosen service.

## 📧 Contact Form

The contact form is integrated with [Resend](https://resend.com) for email delivery. To set it up:

1. Sign up for a free Resend account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add environment variables to `.env.local`:
   ```bash
   RESEND_API_KEY=your_api_key
   CONTACT_TO_EMAIL=your_email@gmail.com
   CONTACT_FROM_EMAIL=onboarding@resend.dev  # or your verified domain
   ```
4. For production deployment (Vercel), add these same env vars in your project settings

**Features:**
- Server-side validation
- Honeypot spam protection
- Rate limiting (5 requests per hour per IP)
- HTML sanitization for XSS protection
- Real-time form validation
- Success/error notifications

## 🎨 Design Decisions

- **Single-page scroll layout**: Easy navigation, good UX
- **Dark theme**: Reduces eye strain, modern aesthetic
- **Material UI**: Consistent design system, accessible components
- **TypeScript**: Type safety, better developer experience
- **Minimal dependencies**: Fast load times, easy maintenance

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Styling**: MUI's emotion-based styling
- **Icons**: Material Icons
- **Deployment**: Vercel
- **Version Control**: Git

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

If you find any bugs or have suggestions, feel free to open an issue or submit a pull request!

## 📬 Contact

- **Email**: akaashtrivedi2@gmail.com
- **LinkedIn**: [linkedin.com/in/akaash-trivedi](https://www.linkedin.com/in/akaash-trivedi)
- **GitHub**: [github.com/akaash11](https://github.com/akaash11)

---

Built with ❤️ by Akaash Trivedi
