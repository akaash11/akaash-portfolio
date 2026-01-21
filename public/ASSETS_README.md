# Public Assets Guide

This folder contains static assets for your portfolio. Add the following files before deploying:

## 📄 Required Files

### 1. Resume PDF
**File**: `resume.pdf`  
**Size**: Any (optimized < 1MB recommended)  
**Note**: The "Resume" button in the Hero section links to `/resume.pdf`

### 2. Open Graph Image
**File**: `og-image.png`  
**Dimensions**: 1200x630 pixels  
**Format**: PNG or JPG  
**Purpose**: Social media preview when sharing your portfolio

**Design Tips**:
- Include your name and title
- Use brand colors (blues from theme)
- Keep text large and readable
- Test on Twitter/LinkedIn preview

**Quick Tools**:
- [Canva](https://www.canva.com/) - Template-based (easiest)
- [Figma](https://www.figma.com/) - More control
- [OG Playground](https://og-playground.vercel.app/) - Dynamic generation

### 3. Favicon Set (Optional but Recommended)
Generate a complete favicon set using [RealFaviconGenerator](https://realfavicongenerator.net/)

**Files to add**:
- `favicon.ico` (32x32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

**Steps**:
1. Create a square logo/icon (512x512 minimum)
2. Upload to RealFaviconGenerator
3. Download the generated package
4. Extract all files to this `/public` folder

---

## ✅ Already Included

- ✅ `robots.txt` - SEO crawler instructions
- ✅ `sitemap.xml` - Static sitemap (also generated dynamically)

---

## 🎨 Design Recommendations

### For Resume PDF:
- Keep it concise (1-2 pages)
- Highlight key achievements with metrics
- Match the portfolio's tech stack section
- Include link to your portfolio

### For OG Image:
- Background: Dark gradient (matching site theme)
- Text: Your name in large, bold font
- Subtext: "Sr. Software Engineer | Full Stack | 8+ years"
- Optional: Professional headshot
- Keep it simple and scannable

---

## 🧪 Testing

After adding files, test:

1. **Resume**: Click Hero button → PDF should download
2. **OG Image**: Share on [Twitter](https://cards-dev.twitter.com/validator) or LinkedIn
3. **Favicon**: Visit site and check browser tab

---

## 📦 File Checklist

- [ ] `resume.pdf` - Your latest resume
- [ ] `og-image.png` - Social sharing preview (1200x630)
- [ ] `favicon.ico` - Browser tab icon
- [ ] `apple-touch-icon.png` - iOS home screen icon (optional)
- [ ] `android-chrome-192x192.png` - Android icon (optional)
- [ ] `android-chrome-512x512.png` - Android splash (optional)

---

Need help? Check the main [README.md](../README.md) for more details.
