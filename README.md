# Noema 2.0

**Fairness auditing and explainability platform for AI-driven lending and underwriting models.**

## What Noema Does

Noema audits AI underwriting decisions for:
- **Demographic disparity** across protected classes
- **Proxy variables** that correlate with protected characteristics
- **ECOA compliance** in adverse action notices
- **Less discriminatory alternatives** with specific recommendations

## Target Users

- CDFIs (Community Development Financial Institutions)
- Fintech lenders
- Credit unions
- Student loan servicers
- Mid-market lenders under regulatory pressure

## Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd noema
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL in `supabase/schema.sql` in your Supabase SQL editor
   - This creates tables for audits, datasets, and waitlist

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
noema/
├── app/
│   ├── (marketing)/         # Landing page (dark theme)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (dashboard)/         # App dashboard (light theme)
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── upload/
│   │   ├── audit/[id]/
│   │   └── reports/
│   ├── api/                 # API routes
│   │   ├── analyze/
│   │   ├── upload/
│   │   ├── report/
│   │   └── waitlist/
│   └── layout.tsx
├── components/
│   ├── landing/             # Landing page components
│   └── dashboard/           # Dashboard components
├── lib/
│   ├── analysis.ts          # Core fairness calculations
│   ├── types.ts             # TypeScript types
│   ├── supabase.ts          # Supabase client
│   └── pdf-export.ts        # PDF generation (placeholder)
└── supabase/
    └── schema.sql           # Database schema
```

## How It Works

### 1. Upload CSV Data
Users upload a CSV containing:
- Applicant ID
- Decision (approved/denied)
- Protected class (race/ethnicity)
- Model input variables (income, credit score, DTI, etc.)

### 2. Analysis Engine
The core `analysis.ts` module runs:
- **Approval rate calculations** by demographic group
- **Demographic parity difference (DPD)** calculations
- **Pearson correlation** to detect proxy variables
- **Adverse action adequacy** checks
- **Less discriminatory alternative** suggestions

### 3. Audit Report
Users get a comprehensive report with:
- Executive summary with plain-language verdict
- Approval rate disparities with statistical significance
- Proxy variable flags with recommendations
- Adverse action analysis
- Concrete remediation checklist

## Key Design Principles

1. **No black-box ML** - All analysis is transparent statistical math
2. **Privacy-first** - Raw data stays in Supabase Storage, only aggregates in database
3. **Compliance-ready** - Reports designed for regulatory review
4. **Plain language** - Every metric explained without jargon
5. **Desktop-first** - Optimized for 1280px+ viewports

## API Endpoints

### `POST /api/upload`
Upload CSV file and create dataset record.

### `POST /api/analyze`
Run fairness analysis on uploaded dataset.
- Requires: datasetId, columnMap, institutionName
- Returns: auditId

### `GET /api/report/[id]`
Fetch completed audit report by ID.

### `POST /api/waitlist`
Add email to early access waitlist.

## Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically detect Next.js and configure build settings.

## Development Roadmap

### MVP (Current)
- [x] Core fairness analysis engine
- [x] CSV upload and parsing
- [x] Audit report UI
- [x] Landing page
- [ ] PDF export (placeholder exists)
- [ ] Authentication (Supabase setup ready)

### Future Enhancements
- PDF generation with @react-pdf/renderer
- User authentication and multi-tenant support
- Pricing disparity analysis
- Historical trend tracking
- Comparison across multiple audits
- API access for programmatic audits

## Contributing

This is a private project. Contact the maintainer for contribution guidelines.

## License

Proprietary. All rights reserved.

## Support

For questions or issues, contact: [your-email]

---

Built with the understanding that **fairness is not a feature. It's a requirement.**
