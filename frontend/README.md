# SickleCare — Sickle Cell Awareness & Education Platform

A modern, fully responsive multi-page React website built for Cameroon. SickleCare educates the public about sickle cell disease, encourages genotype testing, supports individuals living with SCD, and promotes the SickleCare mobile application.

## Live Purpose

This platform was built to:
- Educate Cameroonians about sickle cell disease in clear, accessible language
- Encourage genotype testing before marriage and childbearing
- Support people living with SCD through daily management tools and resources
- Promote the upcoming SickleCare mobile application



## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/NgwinaQuinstarics/sickle-cell-awareness-web

# Navigate into the project
cd sicklecare

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| Icons | React Icons (Feather, Material Design, Game Icons) |
| Styling | Plain CSS with CSS custom properties (design tokens) |
| Fonts | Sora (body) + Lora (display/headings) via Google Fonts |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, global statistics, platform features, genotype explainer, app mockup preview, CTA |
| About SCD | `/about` | What is sickle cell disease, genetics & inheritance, symptoms, why awareness matters |
| Prevention | `/prevention` | Why genotype testing matters, step-by-step testing guide, genotype compatibility table |
| Living With SCD | `/living` | Crisis management, lifestyle tips, hydration tracker visual, emotional support section |
| Mobile App | `/app` | App feature overview, interactive screen mockups, coming-soon email sign-up |
| Resources | `/resources` | Filterable article library, crisis prevention quick tips, FAQ accordion |
| Contact | `/contact` | Validated contact form, email/phone/location info, social media links |

---

## Project Structure
src/
├── assets/
│   └── logo1.png               # Brand logo
│
├── components/
│   ├── Navbar.jsx               # Fixed responsive navbar with scroll state & mobile menu
│   ├── Navbar.css
│   ├── Footer.jsx               # Site footer with links, contact info, social icons
│   ├── Footer.css
│   ├── PageHero.jsx             # Reusable full-width page banner component
│   ├── PageHero.css
│   ├── FeatureCard.jsx          # Reusable animated feature/info card
│   └── FeatureCard.css
│
├── hooks/
│   └── useInView.js             # Custom IntersectionObserver hook for scroll animations
│
├── pages/
│   ├── Home.jsx / Home.css
│   ├── About.jsx / About.css
│   ├── Prevention.jsx / Prevention.css
│   ├── Living.jsx / Living.css
│   ├── AppPage.jsx / AppPage.css
│   ├── Resources.jsx / Resources.css
│   └── Contact.jsx / Contact.css
│
├── App.jsx                      # Route definitions + ScrollToTop behaviour
├── App.css
├── index.css                    # Global design tokens, resets, shared utilities
└── main.jsx                     # React DOM entry point

---

## 🎨 Design System

### Color Palette

| Role | Variable | Value |
|------|----------|-------|
| Primary Blue | `--blue-700` | `#1a56db` |
| Secondary Teal | `--teal-600` | `#0d9488` |
| Accent Amber | `--amber-500` | `#f59e0b` |
| Danger Red | `--red-600` | `#dc2626` |
| Background | `--white` | `#ffffff` |
| Surface | `--gray-50` | `#f9fafb` |

### Typography

| Role | Font |
|------|------|
| Body & UI | Sora (300–800) |
| Headings & Display | Lora (400–700, italic) |

### Shared Utilities (defined in `index.css`)
- `.btn`, `.btn-primary`, `.btn-teal`, `.btn-outline`, `.btn-white`, `.btn-ghost`, `.btn-lg`, `.btn-sm`
- `.card`
- `.badge`, `.badge-blue`, `.badge-teal`, `.badge-amber`, `.badge-red`
- `.section`, `.section-sm`, `.container`
- `.section-label`, `.section-title`, `.section-sub`
- CSS custom properties for all colors, shadows, border-radii, and font families

---

## Key Features

- **Fully responsive** — mobile-first layout, tested from 320px to 1440px+
- **Scroll animations** — every section fades/slides in using a custom `useInView` hook (IntersectionObserver, no library needed)
- **Sticky navbar** — transparent over hero sections, white + blur when scrolled; visible logo on all backgrounds
- **Mobile navigation** — full-screen overlay menu with smooth fade-in animation
- **Genotype compatibility table** — colour-coded guide covering all major genotype pairings (AA, AS, SS, AC, SC)
- **Interactive FAQ** — accordion-style expandable questions on the Resources page
- **Contact form** — client-side validation with success state, no backend required
- **App screen mockups** — stacked, interactive CSS mockups simulating the SickleCare mobile dashboard
- **No external animation library** — all transitions and animations are pure CSS + React state

---

## Medical Disclaimer

This platform provides **educational information only**.
Always consult a qualified healthcare professional for personal medical decisions.

**Emergency in Cameroon:** Call **15** (SAMU) or go to your nearest hospital emergency room.


##  Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request


## 📝 License

This project is open source and available under the [MIT License](LICENSE).



Made with ❤️ for Cameroon — SickleCare 🇨🇲