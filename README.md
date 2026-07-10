# a4 — Abstract Screening Evaluation Harness

A modular test harness for evaluating AI-based abstract screening in systematic reviews. Provides a ground-truth dataset, pluggable screener interface, metrics computation, a CLI runner, and a browser-based test page.

---

## Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Runtime | Node.js 24 (ESM) | `node:test` built-in, native `fetch`, top-level `await` |
| UI | React 19 + Vite 8 | Fast HMR, React Compiler optimised output |
| Testing | `node:test` (no dependencies) | Zero-install test runner for core logic |
| AI Integration | OpenAI-compatible HTTP API | Works with OpenAI, Mistral, or any OpenAI-compatible provider |

---

## Project Structure

```
a4/
├── index.html                     HTML shell — mount point for React
├── vite.config.js                 Vite + React Compiler config
├── eslint.config.js               ESLint flat config (JSX + React Hooks)
├── package.json                   ESM, React 19, Vite 8
│
├── src/
│   ├── main.jsx                   React entry — creates root, renders <App />
│   ├── index.css                  Global reset — white background, system font
│   ├── App.jsx                    Composes TestPage
│   ├── App.css                    Empty (component styles scoped per page)
│   └── assets/                    Static images (not used by screening)
│
│   └── screening/                 ← Core screening evaluation module
│       ├── index.js               Barrel re-exports for external consumers
│       ├── dataset.js             Ground-truth: 20 abstracts with gold-standard decisions
│       ├── evaluate.js            Pure functions: computeMetrics, formatReport
│       ├── screener.js            Screener factories: mock, OpenAI, Mistral, generic
│       ├── evaluate.test.js       node:test suite: dataset validation, metrics, mock, swappability
│       ├── run.js                 CLI entry: node run.js <mock|openai|mistral> [delayMs]
│       ├── TestPage.jsx           React component: interactive test UI
│       ├── TestPage.css           Scoped styles for TestPage
│       └── REPORT.md              Real findings from Mistral Large evaluation
```

### File Responsibilities

| File | Role | Side Effects | Browser-safe |
|---|---|---|---|
| `dataset.js` | Static data + constants | None | Yes |
| `evaluate.js` | Pure computations: TP/FP/FN/TN, precision, recall, F1, confusion matrix | None | Yes |
| `screener.js` | Factory functions returning async screener functions | `fetch()` calls for API screeners; no filesystem | Mock only (real API keys not safe in client) |
| `evaluate.test.js` | 18 test cases across 5 suites | `console.log` for report output | No (uses `node:test`) |
| `run.js` | CLI orchestration | `console.log`, `process.exit` | No (Node.js entry) |
| `TestPage.jsx` | Interactive UI over evaluate.js + createMockScreener | State via `useState` | Yes |
| `index.js` | Re-exports | None | Yes |

---

## Component Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      dataset.js                              │
│  REVIEW_QUESTION + ABSTRACTS[  {id, title, abstract,         │
│                                  expected, reason}  ]        │
└────────────────────┬────────────────────────────────────────┘
                     │ imported by
          ┌──────────┼──────────┬──────────────────┐
          ▼          ▼          ▼                  ▼
    evaluate.js   screener.js  run.js          TestPage.jsx
    pure fns      factories    CLI               React UI
                     │                            │
          ┌──────────┤                            │
          ▼          ▼                            │
    createMockScreener()  createMistralScreener() │
    (no deps)              (calls OpenAI-          │
    createOpenAIScreener()  compatible API)        │
                                              ┌────┴────┐
                                              │  User   │
                                              │ clicks  │
                                              │ "Run"   │
                                              └────┬────┘
                                                   ▼
                                          createMockScreener()
                                                   │
                                          ┌────────┴────────┐
                                          ▼                 ▼
                                    per-abstract         computeMetrics()
                                    predictions          (pure function)
                                          │                 │
                                          └───────┬─────────┘
                                                  ▼
                                          confusion matrix
                                          + metric cards
                                          + per-abstract table
```

### Screener Interface

Every screener is an async function conforming to:

```ts
type ScreenerFn = (abstract: {
  id: number;
  title: string;
  abstract: string;
}) => Promise<{
  id: number;
  predicted: 'include' | 'exclude';
  confidence?: number;
  reason?: string;
}>;
```

This makes screeners **trivially swappable** — the evaluation loop and metrics computation accept any function matching this signature.

---

## Key Design Decisions

### 1. Pure Functions for Metrics

`computeMetrics()` is a pure function with zero side effects. It takes an array of `{ id, expected, predicted }` and returns counts and derived metrics. This makes it:
- Deterministic and trivially testable
- Runtime-agnostic (works in Node, browser, workers)
- Composable (can be called multiple times with different views of the data)

### 2. Strategy Pattern for Screeners

Screener factories (`createMockScreener`, `createMistralScreener`, `createOpenAIScreener`) all return the same function signature. The evaluation loop in `evaluateScreener()` doesn't know or care which implementation it's running. To add a new provider (e.g., Anthropic, Groq, local Ollama):

```js
const myScreener = createOpenAICompatibleScreener({
  apiKey: process.env.MY_KEY,
  baseUrl: 'https://api.example.com/v1',
  model: 'my-model',
  prompt: 'Custom screening prompt...',
})
```

### 3. Deterministic Mock for Reproducible Tests

`createMockScreener` uses a seeded PRNG (`mulberry32`) so the same `{ accuracy, seed }` always produces the same errors. Tests can assert exact metrics values, and the browser UI gives reproducible results for debugging.

### 4. API Retry with Exponential Backoff

The `fetchWithRetry` wrapper handles 429 rate limits with jittered exponential backoff (1s, 2s, 4s, 8s, 16s base, ± random jitter, capped at 30s). This is essential for free-tier API usage. A configurable inter-request delay (`delayMs`) prevents hitting rate limits in the first place.

### 5. No Abstraction Overhead

No classes, no dependency injection framework, no abstract base classes. A screener is just an async function. The evaluation loop is a 15-line function. This avoids premature abstraction while keeping the system extensible.

---

## Usage

```bash
# Development
npm run dev              # Start Vite dev server → http://localhost:5173
npm run build            # Production build → dist/

# Testing
node --test src/screening/           # Run 18 harness tests
node --test --watch src/screening/   # Watch mode during development

# CLI Evaluation (Node.js)
node src/screening/run.js mock 0.8                 # Mock at 80% accuracy
node src/screening/run.js mock 0.95 42              # Mock with custom seed

MISTRAL_API_KEY="..." node src/screening/run.js mistral 3000
OPENAI_API_KEY="..." node src/screening/run.js openai 2000

# Browser UI
npm run dev              # Open http://localhost:5173
```

---

## Error Handling & Edge Cases

| Scenario | How It's Handled |
|---|---|
| Empty results array | `computeMetrics` guards all divisions by zero → returns `{ tp: 0, fp: 0, fn: 0, tn: 0, accuracy: 0, ... }` |
| Only include/exclude predictions | `precision` and `recall` handle zero denominators correctly |
| API rate limit (429) | Exponential backoff retry (up to 5 attempts), plus configurable inter-request delay |
| Non-OK API response | Caught in the evaluation loop, recorded as `{ predicted: 'error', error: message }` per abstract |
| Missing API key | Factories throw immediately with a clear error message |
| Malformed API response | `JSON.parse` failure propagates as a caught error per abstract |
| Dataset validation | Tests check: unique IDs, required fields, valid decision values, class balance |
| Duplicate abstract IDs | Test suite asserts `Set(ids).size === ids.length` |

---

## What a Senior Engineer Would Want Added

### Short-term (production-readiness)

- **TypeScript migration** — Define `ScreenerFn`, `Abstract`, `Metrics` as proper types. Catches interface mismatches at compile time.
- **CI/CD pipeline** — GitHub Actions: `npm ci && node --test src/screening/ && npm run build` on every PR.
- **API key management** — Validate keys at startup by making a lightweight request (e.g., list models). Fail fast instead of on the first abstract.
- **Logging** — Use a structured logger (pino, winston) instead of `console.warn` for rate-limit retries.
- **Dataset versioning** — Store ground-truth as JSON or YAML instead of JS. Enables version diffing and editing by non-developers.

### Medium-term (scale and quality)

- **Multiple screening rounds** — Model the two-phase process (title/abstract → full-text) that real systematic reviews use.
- **Uncertainty quantification** — Track confidence distributions. Flag low-confidence predictions for human review.
- **Batch API processing** — Use streaming (server-sent events) or concurrent requests with rate-limit awareness instead of sequential `for` loops.
- **Test coverage for Firefox/Safari** — The browser UI currently works in Chrome/V8-based browsers. Add cross-browser testing.
- **Accessibility audit** — Add ARIA labels, keyboard navigation, and screen-reader support to the test page.

### Longer-term (architecture)

- **Plugin system** — Let screeners be loaded from npm packages (`@screening/provider-mistral`, `@screening/provider-openai`) following a published schema.
- **Caching layer** — Abstract-level DB or SQLite to cache API responses so re-runs don't re-invoke the API for unchanged abstracts.
- **Dataset editor UI** — Allow adding/editing abstracts and gold-standard decisions through the browser, persisted to localStorage or a backend.

---

## Scripts Reference

```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build
npm run test      # Run screening evaluation tests (node:test)
npm run lint      # ESLint (JSX, React Hooks rules)
npm run preview   # Preview production build locally
```

---

## License

This project was created as a technical assessment for a software engineering role.
