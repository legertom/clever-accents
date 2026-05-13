# Clever Accents

A friendly typing tutor that teaches Clever support agents to type the
~50 most common accented characters they'll encounter in names from
around the world. Mavis-Beacon energy, on-brand for Clever.

Designed for use on macOS.

## What's in the box

- **12 lessons** grouped by accent type (acute, grave, umlaut, tilde,
  circumflex, cedilla & eszett, Nordic, Czech háček, Polish, Hungarian,
  Turkish, Icelandic).
- Each lesson runs three phases: **Meet** the characters → **Drill** the
  keystrokes → type real **Words & Names**.
- **Mixed Practice** mode uses a five-box Leitner spaced-repetition
  ladder — weakest characters resurface most often.
- All progress is stored in the browser's `localStorage`. Nothing leaves
  the device, so the app is happy on the Vercel Hobby plan with zero
  serverless functions.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Lint, typecheck, build

```bash
npm run lint
npm run build   # also runs tsc via Next's build pipeline
```

The build is fully static — every route prerenders to HTML.

## Deploy to Vercel (Hobby plan)

1. Push this repo to GitHub.
2. From <https://vercel.com/new>, import the repo. Next.js is detected
   automatically.
3. No environment variables are required.
4. Hit **Deploy**. Subsequent pushes redeploy automatically.

There are no API routes, no databases, and no third-party services, so
this fits comfortably under the Hobby plan's limits.

## Brand notes

Colours and type are pulled directly from `Clever_General_Template_V4`:

- Primary blue `#1464FF`, navy `#0A1E46`, sky `#DAEBFF`, orange
  `#F78239`, sun `#FFE478`, mint `#4ECC97`, ink `#1C1C1C`.
- Headings in **Merriweather** (Google Fonts), body in **Inter**.
- Backgrounds are white or light-blue. Underlines are reserved for
  emphasis per the brand guide.

## File map

```
app/
  layout.tsx               root layout, font loading
  globals.css              brand tokens, animations, keycaps
  page.tsx                 home / lesson hub
  about/page.tsx           "about" page
  practice/page.tsx        mixed practice route
  lesson/[id]/page.tsx     dynamic lesson route (SSG'd at build time)
  components/
    BrandHeader.tsx
    Footer.tsx
    CharBadge.tsx
    KeyHint.tsx            mac keycap visualizer
    LessonGrid.tsx
    ProgressChip.tsx
    LessonRunner.tsx       Meet → Drill → Words → Done
    PracticeRunner.tsx     adaptive drill + Leitner ladder
lib/
  chars.ts                 the 50 characters + lesson definitions
  words.ts                 real names/words per lesson
  progress.ts              localStorage-backed Leitner store
  useSyncProgress.ts       hook that re-renders on progress updates
```
