# Muhammad Umer — Portfolio

Full-stack developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool / dev server
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **lucide-react** — icons

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS keys, see below
npm run dev
```

Opens at `http://localhost:5173`.

## Contact form (EmailJS)

The contact form sends real email via [EmailJS](https://www.emailjs.com) — no backend needed.

1. Create a free EmailJS account.
2. Add an **Email Service** (e.g. Gmail) — this gives you a **Service ID**.
3. Create an **Email Template** with these variables: `from_name`, `reply_to`, `subject`, `message`, `to_email` — this gives you a **Template ID**.
4. Grab your **Public Key** from Account → API Keys.
5. Copy `.env.example` to `.env` and fill in the three values:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Until `.env` is filled in, the form will show a friendly "not configured yet" error instead of silently failing. `.env` is gitignored — when deploying (Vercel/Netlify), add the same three variables in your host's environment variable settings.

## Editing your content

All personal info and project data live in two files — edit these, not the components:

- **`src/data/data.ts`** — name, bio, tagline, stats, tech stack, experience, socials, SEO
- **`src/data/projects.ts`** — your project list

## Scripts

| Command           | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start local dev server               |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |

## Project structure

```
src/
  data/
    data.ts        # personal info, bio, stats, tech stack, experience, socials, SEO
    projects.ts     # your project list
  components/
    ui/            # Reusable animated primitives (MagneticButton, TiltCard3D, etc.)
    Hero.tsx
    About.tsx
    Projects.tsx
    Experience.tsx
    TechStack.tsx
    Contact.tsx
    Footer.tsx
    Navbar.tsx
    SEO.tsx
  App.tsx
  main.tsx
  index.css
```

## Before deploying

- [ ] Add your EmailJS keys to `.env` (or your host's env settings) so the contact form actually sends — see above.
- [ ] Replace the placeholder Resume link (`personalInfo.resumeUrl` in `src/data/data.ts`) with a real, hosted PDF.
- [ ] Swap the placeholder employers in `src/data/data.ts` → `experience` for your real work history.
- [ ] Update `seo.url` in `src/data/data.ts` once you know your real deployed domain.
- [ ] Add real project screenshots instead of the color-block placeholders in `Projects.tsx`.

## Deployment

Any static host works well with Vite output (`npm run build` → `dist/`):

- **Vercel** — `vercel deploy`
- **Netlify** — drag-and-drop the `dist/` folder or connect the repo
- **GitHub Pages** — use `vite-plugin-gh-pages` or push `dist/` to a `gh-pages` branch
