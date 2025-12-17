# VisaScope – DN Landscape Quick Compare (Top 30)

Source-first, sortable comparison of the top 30 digital nomad visa programs: duration, renewability, minimum income, dependents, insurance, and application channel. Row details with source links and as-of notes, plus CSV/PDF export and monthly verification.

## 🌐 Live Site

**Production:** [https://chaos-factory.github.io/ideator-execution-008-digital-nomad-visa-4-visascope-dn-landscape-quick-compare-top-30/](https://chaos-factory.github.io/ideator-execution-008-digital-nomad-visa-4-visascope-dn-landscape-quick-compare-top-30/)

The site automatically deploys to GitHub Pages on every push to `main`. Pull requests generate preview deployments for testing.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The development server will start at `http://localhost:5173/`

## 📋 Features

- **Interactive Comparison Table**: Sort and filter 30 digital nomad visa programs
- **Search**: Debounced search by country or program name
- **Filters**: Region, dependents, insurance, application channel
- **Gating**: First 10 programs visible; rows 11-30 require unlock
- **Export**: CSV and PDF export (behind paywall simulation)
- **Detail Modals**: View comprehensive program information
- **Responsive Design**: Works on desktop and mobile
- **SPA Routing**: Client-side routing with GitHub Pages support

## 🔧 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Export**: jsPDF + jsPDF-autoTable
- **Deployment**: GitHub Actions → GitHub Pages
- **Styling**: Minimal custom CSS

## 📦 Project Structure

```
├── public/
│   ├── data/visascope/programs.json  # Visa program data
│   └── 404.html                       # SPA fallback for GitHub Pages
├── src/
│   ├── components/                    # React components
│   │   ├── DetailModal.tsx
│   │   └── PaywallModal.tsx
│   ├── pages/                         # Page components
│   │   ├── ComparePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── SourcesPage.tsx
│   ├── types/                         # TypeScript types
│   ├── utils/                         # Utilities
│   │   ├── analytics.ts
│   │   ├── badges.ts
│   │   ├── export.ts
│   │   └── regions.ts
│   └── App.tsx                        # Main app component
├── .github/workflows/pages.yml        # GitHub Actions CI/CD
└── vite.config.ts                     # Vite configuration
```

## 🌍 GitHub Pages Deployment

The site uses GitHub Actions for automated deployment:

1. **On Push to `main`**: Builds and deploys to production
2. **On Pull Request**: Builds artifact for preview

### Setup Requirements

In your GitHub repository settings:

1. Go to **Settings → Pages**
2. Under **Build and deployment**
3. Set **Source** to: **GitHub Actions**

The workflow is configured in `.github/workflows/pages.yml`

## 📊 Data Format

Visa programs are stored in `/public/data/visascope/programs.json` following this schema:

```json
{
  "program_id": "string",
  "country": "string",
  "name": "string",
  "duration_months": "number",
  "renewable": "boolean",
  "min_income": {
    "amount": "number",
    "currency": "string",
    "basis": "monthly|annual"
  },
  "dependents": "boolean",
  "insurance_req": "boolean",
  "application_channel": "string",
  "official_url": "string (URI)",
  "as_of": "string (date)",
  "notes": "string"
}
```

## 🎨 Styling

The application uses minimal, utilitarian styling:
- Primary color: Deep blue (`#2962ff`)
- Neutral table with zebra striping
- Badge colors: blue, amber, gray, red, purple
- Table text: 14-16px
- Headings: 28-32px

## 📝 License

MIT

