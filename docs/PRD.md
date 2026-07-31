# Prompt: Build my portfolio from scratch

Paste everything below into your coding agent (Claude Code, Cursor, etc.) in an empty project folder.

---

Build me a complete, production-ready developer portfolio site from scratch. Stack: **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**. Do not stop until every requirement below is met and the project builds with zero errors.

## 0. Design brief — what this portfolio should look and feel like

A personal portfolio for a full-stack developer (React / Node.js / TypeScript / MongoDB), dark-themed, motion-forward, editorial/cinematic in tone — not a generic template.

- **Palette:** near-black background, one vivid primary accent (electric cyan or similar) plus a secondary accent (violet/magenta) used sparingly for gradients and glows. High contrast, minimal color noise elsewhere.
- **Typography:** oversized, bold, kinetic display headings for section titles and the hero name/role (think huge tracked-in sans-serif); monospace font for labels, eyebrows, nav items, numbering ("01 / 05" style), and metadata — this contrast is a signature of the look.
- **Motion:** scroll-triggered reveals, hover micro-interactions (magnetic buttons, tilt cards, glow borders, spotlight-follow cards), an animated background (particles/aurora/dot-grid — subtle, not distracting), and a custom cursor on desktop (auto-disabled on touch devices).
- **Layout:** generous whitespace, consistent section rhythm, glassmorphism surfaces (translucent + blurred) for the navbar and cards.
- **Sections, in order:**
  1. **Floating pill navbar** — fixed, detached from the top edge with margin, horizontally centered, constrained width (not full-bleed), fully rounded, glass background, compact/short height, desktop links + CTA, mobile hamburger opening a rounded dropdown panel.
  2. **Hero** — name, huge role title, one-line tagline, availability badge, location/timezone, two CTAs (primary + resume), a tech marquee, and a small "ID card" style widget on desktop.
  3. **Tech Stack** — skills grouped by category (Frontend / Backend / Database & Deploy / Tools) in a responsive card grid.
  4. **Projects** — one featured project (larger card) + a grid of the rest, each linking out to a live demo.
  5. **About** — bio (2 short paragraphs), animated stat counters (years experience / projects / clients / stars), and a services grid.
  6. **Experience** — a vertical timeline of roles.
  7. **Contact** — a real working form (see §5).
  8. **Footer** — big "let's talk" CTA, nav links, socials, email, copyright.

## 1. React Bits requirement — at least 80% of the interactive/animated UI must be real React Bits components

[React Bits](https://reactbits.dev) is a real, installable open-source component library (not just an aesthetic to imitate). Use it for real:

- Install components via its CLI, e.g. `npx shadcn@latest add https://reactbits.dev/r/<ComponentName>-TS-TW` (TypeScript + Tailwind variant), or the `jsrepo` equivalent. Browse the live catalog at reactbits.dev to pick the right component and confirm the current exact install command/name for each — names may have shifted since training data, so verify against the live site rather than guessing.
- Source **at least 80%** of the site's animated/interactive elements directly from React Bits — text reveal/split effects, hover text-scramble/decrypt effects, an infinite marquee, magnetic buttons, tilt cards, glowing/animated borders, spotlight-hover cards, an animated counter, a particle/aurora/dot-grid background, and ideally a nav-menu effect for the pill navbar (React Bits has dedicated nav components — check the catalog).
- Only hand-build a custom component for something React Bits genuinely doesn't offer after you've checked — and keep that under ~20% of the animated UI surface.
- **No dead code:** every installed/built component must actually be used somewhere in the final layout. Before finishing, check for unused component files/exports and either wire them in or remove them.
- List in your final summary exactly which React Bits components you used and where.

## 2. Project scaffold (must all be present and correct)
- `package.json` — only the dependencies actually imported anywhere in the code (no unused deps, no missing ones). Include `@emailjs/browser`.
- `index.html` + `src/main.tsx` — real entry point that mounts `<App />`.
- `vite.config.ts` with a `@/` → `./src` path alias.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — standard Vite project-reference setup. Do **not** enable `noUnusedLocals`/`noUnusedParameters` as hard build failures — keep the build resilient.
- `tailwind.config.ts` + `postcss.config.js`, content globs covering `./index.html` and `./src/**/*.{ts,tsx}`.
- `.gitignore` (node_modules, dist, .env, editor/OS junk).
- `.env.example` documenting every env var used (EmailJS keys — see §5).
- `src/vite-env.d.ts` with proper `ImportMetaEnv` typings for those env vars.
- `README.md` covering: setup steps, EmailJS setup steps, which components came from React Bits and how to update them, where to edit content, script table, pre-deploy checklist.
- `eslint.config.js` (flat config) with matching devDependencies.

Before you finish, actually run `npm install && npm run build`. Fix every error. Do not hand back a project you haven't verified builds.

## 3. Content lives in data files, never hardcoded in components
Create:
- **`src/data/data.ts`** — typed exports for: name, role, tagline/bio (as an array of paragraphs), location, timezone, email, avatar URL, resume URL, availability flag, social links (GitHub/LinkedIn/WhatsApp), SEO meta (title/description/url/siteName), nav links (id/label/number), hero marquee word lists, ID-badge content, stats (years experience/projects/clients/stars), services list, tech stack grouped by category, work experience list, footer blurb.
- **`src/data/projects.ts`** — a typed `Project[]` (title, subtitle, description, tags, live url, accent color, featured flag).

Every component must import from these two files. After building, grep the component files yourself and confirm there is no hardcoded name, email, project title, or bio text left in any `.tsx` file outside `src/data/`.

Use placeholder-but-plausible content for a full-stack developer (React/Node/TypeScript/MongoDB) based in Karachi, Pakistan, and mark every field I should personalize with a `// TODO:` comment (real name, real employers, real resume link, real domain).

## 4. Experience data must be internally consistent
Whatever "X+ years of experience" stat you put in the stats block, the earliest job in the experience timeline must not predate that number of years ago from today. Don't let one section imply 3 years while another implies 8. Use realistic (non-joke, non-`Lorem Ipsum`) role titles and company name placeholders, each flagged `// TODO: replace with your real employer`.

## 5. EmailJS-powered contact form
- Real send via `@emailjs/browser`, reading Service ID / Template ID / Public Key from `import.meta.env` (never hardcoded).
- Distinct idle / loading / success / error UI states tied to the actual API result — no fake `setTimeout` "success."
- If env vars are missing, show a clear "not configured yet" message rather than silently failing or pretending to succeed.
- Document full EmailJS setup (create account → service → template with expected variable names → public key → `.env`) in the README.

## 6. Responsive design — a real priority, not an afterthought
Design mobile-first and verify at 375px, 390–430px, 768px, 1024px, and 1440px+:
- No row of content gets pinned to two opposite corners with a big empty gap between on narrow screens — audit every `justify-between` usage specifically and confirm it still reads well when only 2–3 short items are present on a small screen (wrap, don't just space).
- Consistent horizontal gutter padding on every section (e.g. `px-5 sm:px-6 lg:px-8`) — nothing touches the viewport edge, nothing has noticeably more or less padding than its neighbors.
- Zero horizontal scroll/overflow at any breakpoint — watch out for decorative absolutely-positioned blurred shapes, wide marquees/backgrounds, and fixed pixel widths; wrap them in `overflow-hidden` containers and add a global `overflow-x: hidden` safety net on `html, body`.
- Grids reflow sensibly (1 col mobile → 2 col tablet → 3–4 col desktop), no orphaned full-width single items.
- Every section anchor needs `scroll-mt-*` so scrolling to it doesn't hide the top of the section behind the floating navbar.
- Actually verify this visually (resize / device toolbar), not just by reading the Tailwind class names off the page.

## 7. Final acceptance checklist — confirm every line before telling me you're done
- [ ] `npm install && npm run build` passes with zero errors
- [ ] `npm run lint` passes (fix real issues, don't silence rules)
- [ ] At least 80% of animated/interactive UI is real React Bits components installed via its CLI — list which ones and where
- [ ] No hardcoded personal/project content outside `src/data/`
- [ ] Experience timeline consistent with the "years of experience" stat
- [ ] Navbar is a short, floating, rounded pill with a working responsive mobile panel
- [ ] Contact form sends real email via EmailJS with proper loading/success/error states
- [ ] No unused components left in the codebase
- [ ] No horizontal overflow and no corner-pinned layouts at 375/390/768/1024/1440px
- [ ] README documents setup, EmailJS config, React Bits components used, and content-editing instructions

Give me a short per-file summary of what you built when done — not a play-by-play of every decision.