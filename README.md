# Avarent

**Landing page for Avarent — fairness auditing and model governance for AI-driven lending.**

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui, Radix UI primitives
- **Deployment:** Netlify

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
avarent/
├── app/
│   ├── (marketing)/        # Landing page route
│   │   ├── layout.tsx      # Marketing layout (fonts, nav)
│   │   └── page.tsx        # Landing page sections
│   ├── globals.css         # Design tokens, base styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── landing/            # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── ProductProof.tsx
│   │   ├── Outcomes.tsx
│   │   ├── FairnessPerformance.tsx
│   │   ├── Governance.tsx
│   │   ├── Workflow.tsx
│   │   ├── Trust.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── AmbientMarkers.tsx
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   └── utils.ts            # cn() helper
├── netlify.toml            # Netlify build config
└── tailwind.config.js      # Design system tokens
```

## Build

```bash
npm run build
```

## Deployment

Pushes to `main` deploy automatically via Netlify.

## License

Proprietary. All rights reserved.
