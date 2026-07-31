# Muhammad Umer — Portfolio

Dark, editorial portfolio for **Muhammad Umer** (`UMER.DEV`), a Full-Stack Developer based in Karachi, Pakistan. Built with Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion, with the animated UI powered by [React Bits](https://www.reactbits.dev) components.

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (dark/cinematic theme: near-black bg, cyan + violet/magenta accents, Space Grotesk + JetBrains Mono)
- **Framer Motion** (page/scroll micro-interactions)
- **React Bits** vendored components: SplitText, Aurora, BorderGlow, CountUp, DecryptedText, LogoLoop, Magnet, Particles, PillNav, SpotlightCard, TiltedCard
- **EmailJS** contact form (no backend required)

## Getting Started

```bash
npm install
npm run dev        # start dev server
npm run build      # type-check (tsc -b) + production build
npm run lint       # ESLint (first-party code only; reactbits/ is vendored and ignored)
npm run preview    # preview the production build
```

The build should complete with **zero errors and zero warnings**. `npm run lint` must pass clean.

## Contact Form (EmailJS)

The contact form reads three variables from `.env.local` (see `.env.example`):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

1. Create a free account at https://www.emailjs.com.
2. Add an **Email Service** (e.g. Gmail) and an **Email Template** with variables like `from_name`, `reply_to`, `subject`, `message`, `to_email`.
3. Copy the Service ID, Template ID, and Public Key into `.env.local`.
4. Restart the dev server.

Never commit private keys — only the public key belongs in client code.

## React Bits

React Bits components are vendored into `src/components/reactbits/` via the shadcn CLI:

```bash
npx shadcn@latest add @react-bits/<Name>-TS-TW --yes --overwrite
```

To add new ones, install them, move the emitted files into `src/components/reactbits/`, and clean up any stray `@\` folder. The vendored code is intentionally **excluded from ESLint** (`eslint.config.js` ignores `src/components/reactbits/**`).

Minor, documented adaptations:
- `PillNav` gained an optional `logoHref` prop so the logo links to `#home` instead of the first nav item. Its `react-router-dom` `Link` usages were converted to plain `<a>` tags (this project uses anchor navigation), so the router dependency could be dropped.
- `SplitText` gained a module-level `WeakSet` guard so each element animates exactly once — React 18 StrictMode double-invokes effects in dev, which used to replay the char animation and leave the text re-split.
- `TiltedCard` cards use a shared `svgGradientImage()` helper (`src/lib/cardArt.ts`) as their `imageSrc`, with real content passed via `overlayContent`.
- Tailwind ambiguous-class warnings were silenced by rewriting vendored class strings as explicit arbitrary properties.

Custom styling helpers in `src/index.css`:
- `font-display` — the `Clash Display` headline font (loaded from Fontshare), applied to the hero, section headings, and the footer `LET'S TALK` CTA.
- `.text-aurora` — animated cyan → violet → magenta gradient text that also works on React Bits `SplitText` characters (`.split-char`), used on the hero tagline line and all headings.

## Editing Content

All personal data lives in **one place**:

- `src/data/data.ts` — name, brand, role, tagline, socials, SEO, nav links, marquees, bio, stats, services, tech stack, experience, footer text. Look for `// TODO:` markers (resume URL, real domain).
- `src/data/projects.ts` — projects; the first item is auto-rendered as the featured project.

Update these two files and every section updates automatically.

## Project Structure

```
src/
├── App.tsx                     # layout + Particles background
├── components/
│   ├── Navbar.tsx              # floating pill navbar (React Bits PillNav)
│   ├── Hero.tsx                # Aurora bg, SplitText headline, Magnet CTAs, LogoLoop marquee
│   ├── TechStack.tsx           # LogoLoop marquees + TiltedCard category cards
│   ├── Projects.tsx            # featured project + TiltedCard grid
│   ├── About.tsx               # TiltedCard photo, CountUp stats, service cards
│   ├── Experience.tsx          # DecryptedText job rows
│   ├── Contact.tsx             # EmailJS form in BorderGlow card
│   ├── Footer.tsx              # LET'S TALK CTA + SpotlightCard links
│   ├── IdCard.tsx              # hand-rolled 3D ID card (hero)
│   ├── SEO.tsx                 # meta tags / OG / canonical
│   ├── reactbits/              # vendored React Bits components
│   └── ui/                     # first-party UI (CustomCursor, SectionHeading)
├── data/                       # all editable content
├── lib/cardArt.ts              # gradient art helper for TiltedCard
├── index.css                   # Tailwind theme (colors, fonts)
```

## Pre-Deploy Checklist

1. `npm run lint` and `npm run build` pass with zero errors.
2. Add EmailJS keys to `.env.local` and confirm a test message arrives.
3. Replace `resumeUrl` in `src/data/data.ts` with a real hosted PDF.
4. Update `seo.url` in `src/data/data.ts` to the real domain.
5. Review `experience` entries and `stats` so the timeline is consistent.
6. Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages).
