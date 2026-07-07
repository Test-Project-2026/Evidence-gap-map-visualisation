# Evidence Gap Map

An interactive evidence gap map that visualises research studies across a 2D grid of interventions (rows) and outcomes (cells show study counts). Built with React + Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all files |
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode (re-runs on file change) |

## Project Structure

```
src/
├── components/
│   ├── EvidenceGapMap.jsx   # Main grid: rows=interventions, cols=outcomes
│   ├── StudyModal.jsx       # Modal listing study details on cell click
│   ├── Legend.jsx            # Color scale legend
│   ├── ErrorBoundary.jsx    # Catches runtime errors, shows retry UI
│   └── SkeletonLoader.jsx   # Shimmer loading skeleton
├── hooks/
│   ├── useEGMData.js        # Data layer: matrix build, filtering, cell lookup
│   └── useDebounce.js       # 300ms debounce on search input
├── utils/
│   └── getLevelClass.js     # Maps study count → CSS class (5 levels)
├── data/
│   └── mockData.js          # 48 mock studies across 8×8 grid
└── __tests__/               # 26 tests (vitest + testing-library)
```

## How It Works

1. **Data**: Studies are defined in `src/data/mockData.js`. Each study has an `intervention`, `outcome`, `title`, `authors`, `year`, and `journal`.

2. **Matrix**: `useEGMData` builds a lookup matrix keyed by `intervention|||outcome`. Clicking a cell retrieves studies from this matrix.

3. **Color coding**: Cells are coloured by study count:
   - Empty (dashed border) = 0 studies (gap)
   - Light green = 1 study
   - Medium green = 2–3 studies
   - Darker green = 4–5 studies
   - Solid green = 6+ studies

4. **Search**: Type in the filter box to narrow rows and columns by name.

5. **Modal**: Click any populated cell to see the full list of studies (title, authors, year, journal). Close with the X button, clicking outside, or pressing Escape.

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite** for build tooling
- **lucide-react** for icons
- **vitest** + **@testing-library/react** for tests
- **ESLint** for linting

## Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no configuration needed
4. Every push to `main` triggers a deploy

No environment variables, databases, or backend services required.

## Replacing Mock Data with Real Data

The data layer is abstracted in `useEGMData`. To use real data:

1. Fetch studies from your API (e.g. OpenAlex, PubMed)
2. Pass them to `setStudies()` inside the hook
3. Ensure each study has: `intervention`, `outcome`, `title`, `authors`, `year`, `journal`

```js
// Example: fetch from API
useEffect(() => {
  fetch("/api/studies")
    .then((res) => res.json())
    .then((data) => setStudies(data));
}, []);
```

## Testing

Run all 26 tests:

```bash
npm run test
```

Tests cover:
- `getLevelClass` — all boundary values
- `Legend` — renders all 5 levels
- `StudyModal` — renders studies, closes on click/Escape
- `ErrorBoundary` — catches errors, shows retry
- `EvidenceGapMap` — grid renders, cells clickable, empty cells disabled
