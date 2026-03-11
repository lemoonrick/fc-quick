# FC Quick

Fact checks, fast. A Vite + React web app that pulls articles from the FactCrescendo WordPress REST API and presents them as swipeable cards (desktop) or a snap-scroll feed (mobile).

## Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd fc-quick
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values. At minimum, set `VITE_WP_BASE_URL`.

### 3. Run in development

```bash
npm run dev
```

The Vite dev server proxies all WordPress API calls through `/api/wp`, so **you will not hit CORS errors during local development**.

### 4. Build for production

```bash
npm run build
```

---

## CORS in Production

The Vite proxy only works during local dev. For production, do **one** of the following:

**Option A — WordPress plugin (easiest)**
Install the "WP CORS" plugin on the FactCrescendo site, or add to `functions.php`:

```php
add_action('init', function () {
    $allowed = 'https://your-app-domain.com';
    header("Access-Control-Allow-Origin: $allowed");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
});
```

**Option B — Nginx config**
Add to the nginx block for the WP site:

```nginx
add_header Access-Control-Allow-Origin "https://your-app-domain.com";
add_header Access-Control-Allow-Methods "GET, OPTIONS";
```

---

## AI Summarization

By default, `VITE_USE_AI_SUMMARY=false` — the app uses WordPress excerpts (free, instant).

To enable AI summaries:

1. Set `VITE_USE_AI_SUMMARY=true` in `.env`
2. Set `VITE_ANTHROPIC_API_KEY=your_key_here`
3. **Warning**: Do not expose your API key in a public production build. For production, route the AI call through a backend endpoint (Cloudflare Worker, Next.js API route, Express, etc.) that holds the key server-side.

---

## Project Structure

```
src/
├── App.css                     # Global design tokens — tweak theme here
├── App.jsx                     # Root component
├── main.jsx                    # React entry point
├── components/
│   ├── Header/                 # Top nav bar
│   ├── DesktopView/            # Card stack UI (≥641px)
│   ├── MobileView/             # Snap-scroll feed (≤640px)
│   ├── NewsCard/               # Individual desktop card
│   ├── VerdictBadge/           # False / Misleading / True badge
│   ├── CategoryPills/          # Article category tags
│   ├── SummaryText/            # Summary with skeleton loader
│   ├── LoadingSpinner/         # Full-screen loader
│   └── ErrorBox/               # Error state with retry
├── hooks/
│   └── usePosts.js             # Data fetching + navigation state
├── services/
│   ├── wordpress.js            # WordPress REST API calls
│   └── summarize.js            # AI or excerpt summarization
└── utils/
    └── format.js               # Pure formatting helpers
```
