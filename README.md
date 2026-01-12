# Akaash Trivedi - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Material UI.

## 🚀 Live Demo

[View Live Site](https://akaash-portfolio.vercel.app)

## ✨ Features

- **Modern Stack**: Next.js 15 (App Router), TypeScript, Material UI
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Dark Theme**: Professional dark theme optimized for readability
- **Interactive Sections**:
  - Hero with gradient background and CTA buttons
  - Dynamic About section with expandable tech stack
  - Filterable Experience timeline with collapsible cards
  - Project showcase with badges and live links
  - Contact form with spam protection
- **Performance Optimized**: Fast loading, smooth scrolling, minimal dependencies
- **SEO Ready**: Comprehensive meta tags, Open Graph, Twitter Cards
- **Analytics Ready**: Scaffolded for easy integration with Plausible/Umami/GA4
- **Accessibility**: Keyboard navigation, ARIA labels, proper contrast ratios

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation with scrollspy
│   │   ├── Hero.tsx            # Landing section
│   │   ├── About.tsx           # About section
│   │   ├── Timeline.tsx        # Experience timeline
│   │   ├── Projects.tsx        # Projects grid
│   │   ├── ProjectCard.tsx     # Individual project card
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Section.tsx         # Reusable section wrapper
│   │   └── ThemeRegistry.tsx   # MUI theme provider
│   ├── data/
│   │   ├── experience.ts       # Experience data
│   │   └── projects.ts         # Projects data
│   ├── theme/
│   │   └── theme.ts            # MUI theme configuration
│   └── utils/
│       └── analytics.ts        # Analytics utility
├── public/
│   ├── resume.pdf              # Your resume (add this)
│   └── og-image.png            # Open Graph image (add this)
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

4. **Contact Info** (`src/components/Contact.tsx`)
   - Update social media links
   - Change email address
   - Modify location and current role

5. **Resume**
   - Add your `resume.pdf` to the `public/` directory
   - Update the link in `Hero.tsx` if needed

### Customize Theme

Edit `src/theme/theme.ts` to customize:
- Color palette
- Typography
- Component styles
- Spacing

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Set environment variables in Vercel dashboard if needed

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

## 📧 Contact Form Integration

The contact form is currently set up with client-side validation and a simulated submission. To connect it to a real backend:

### Option 1: Formspree (Easiest)
```typescript
// In Contact.tsx handleSubmit
const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```

### Option 2: EmailJS
Install EmailJS and configure in `Contact.tsx`

### Option 3: Custom API Route
Create `/app/api/contact/route.ts` with your email sending logic

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
- **Twitter**: [@akaasht](https://twitter.com/akaasht)

---

Built with ❤️ by Akaash Trivedi
