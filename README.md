# Muhammad Affan — Portfolio Website

A stunning, modern, fully-animated personal portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Install & Run

```bash
# Navigate to the project
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── favicon.svg          ← Favicon (auto-generated)
│   ├── robots.txt
│   ├── profile.jpg          ← 📸 ADD YOUR PHOTO HERE
│   ├── resume.pdf           ← 📄 ADD YOUR RESUME HERE
│   └── projects/
│       ├── freelancer-crm-1.png
│       ├── freelancer-crm-2.png
│       ├── cortexflow-1.png
│       ├── cortexflow-2.png
│       ├── hcm-lite-1.png
│       ├── hcm-lite-2.png
│       └── bella-notte-1.png
│
├── src/
│   ├── data/
│   │   └── config.js        ← ✏️ ALL YOUR CONTENT IS HERE
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useLenis.js
│   │   └── useGitHubStats.js
│   ├── components/
│   │   ├── ui/              ← Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── ScrollProgress.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   └── SectionHeader.jsx
│   │   └── sections/        ← Page sections
│   │       ├── HeroSection.jsx
│   │       ├── AboutSection.jsx
│   │       ├── SkillsSection.jsx
│   │       ├── ProjectsSection.jsx
│   │       ├── GitHubSection.jsx
│   │       ├── ExperienceSection.jsx
│   │       ├── ContactSection.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── CaseStudyPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── vercel.json              ← React Router rewrite rule
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ✏️ How to Edit Content

**All content is in one file: `src/data/config.js`**

- Change your name, role, tagline, email, social links → `siteConfig`
- Add/edit projects → `projects` array
- Edit experience and education → `timeline` array
- Adjust skill categories → `siteConfig.skills`
- Change marquee tech items → `siteConfig.marqueeItems`

---

## 📸 Adding Your Assets

| Asset | Where to put it |
|-------|----------------|
| Profile photo | `public/profile.jpg` |
| Resume | `public/resume.pdf` |
| Project screenshots | `public/projects/[name].png` |
| OG image (1200×630) | `public/og-image.png` |

---

## 🎨 Changing Colors

Colors are defined in **two places** (both need updating if you change the palette):

1. **`tailwind.config.js`** — Tailwind theme tokens
2. **`src/index.css`** — CSS custom properties (`:root` and `.light` blocks)

The brand gradient is `#6366F1 → #8B5CF6` (indigo → violet).
The secondary accent is `#2DD4BF` (teal).

---

## 🌐 Setting Your Custom Domain

Replace `https://YOUR-DOMAIN.com` in these files:

| File | Variable |
|------|----------|
| `index.html` | `og:url`, canonical, twitter:url |
| `vite.config.js` | `hostname` in sitemap plugin |
| `public/robots.txt` | Sitemap URL |
| `src/data/config.js` | `siteConfig.domain` |

---

## 🚀 Deploying on Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2 — Import on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

> The `vercel.json` at the root already contains the rewrite rule that makes React Router work on page refresh:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```

### Step 3 — Connect a Custom Domain

1. In your Vercel project → **Settings → Domains**
2. Click **Add** and type your domain (e.g., `affan.dev`)
3. Vercel will show you two DNS records to add at your registrar:

**Option A — Root domain** (e.g., `affan.dev`):
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option B — Subdomain** (e.g., `www.affan.dev`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and add the records.
5. Back in Vercel, click **Verify** (propagation takes 1–24 hours).
6. Vercel automatically provisions and renews your SSL certificate — no action needed.

### Step 4 — Update Domain References
After the domain is live, update `https://YOUR-DOMAIN.com` with your real domain in all 4 files listed in the "Setting Your Custom Domain" section above, then redeploy.

---

## ⚡ Performance Tips

- Add real screenshots to `public/projects/` — the app lazy-loads them with blur-up effect.
- Add a real `public/og-image.png` (1200×630 px) for social sharing previews.
- The GitHub stats section caches API responses in `localStorage` for 30 minutes.
- `prefers-reduced-motion` is respected — all animations are disabled for users who prefer it.

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| React 18 + Vite | UI + blazing-fast dev/build |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations and page transitions |
| Lenis | Ultra-smooth scrolling |
| React Router 6 | Client-side routing + case study pages |
| React Type Animation | Animated role text in hero |
| React CountUp | Animated GitHub stat counters |
| React Lazy Load Image | Lazy image loading with blur-up |
| React Intersection Observer | Scroll-triggered animations |
| vite-plugin-sitemap | Auto-generated sitemap.xml |
