/**
 * wordpress.js
 * All WordPress REST API communication lives here.
 * The base URL comes from .env so you can point this at
 * any WordPress site without touching component code.
 */

// In dev, Vite proxies /api/wp → WP REST API (kills CORS).
// In production, set VITE_WP_BASE_URL to the full site URL and
// ensure your WP server sends CORS headers for your app domain.
const BASE =
  import.meta.env.DEV
    ? '/api/wp'
    : `${import.meta.env.VITE_WP_BASE_URL}/wp-json/wp/v2`;

const PER_PAGE = Number(import.meta.env.VITE_WP_PER_PAGE) || 10;

/**
 * fetchPosts
 * Returns an array of normalized post objects ready for the UI.
 * @param {number} page - WP REST page number (1-based)
 */
export async function fetchPosts(page = 1) {
  const params = new URLSearchParams({
    per_page: PER_PAGE,
    page,
    _embed: 1,
    // Only request fields we actually use — lighter payload
    _fields: 'id,title,excerpt,link,date,categories,_embedded,_links',
  });

  const res = await fetch(`${BASE}/posts?${params}`);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `WordPress API error ${res.status}: ${res.statusText}${text ? ` — ${text.slice(0, 120)}` : ''}`
    );
  }

  const posts = await res.json();
  return posts.map(normalizePost);
}

/**
 * normalizePost
 * Maps raw WP REST post data into a flat, clean shape.
 * Keeps all transformation in one place — easy to update if WP changes.
 */
function normalizePost(post) {
  const embedded = post._embedded ?? {};

  // Featured image — try several possible locations
  const media = embedded['wp:featuredmedia']?.[0];
  const image =
    media?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.media_details?.sizes?.medium?.source_url ||
    null;

  // Categories
  const terms = embedded['wp:term'] ?? [];
  const categories = terms
    .flat()
    .filter((t) => t.taxonomy === 'category');

  // Clean excerpt for fallback summary
  const rawExcerpt = post.excerpt?.rendered ?? '';
  const cleanExcerpt = stripHtml(rawExcerpt).trim();

  return {
    id: post.id,
    title: stripHtml(post.title?.rendered ?? ''),
    rawExcerpt,
    excerpt: cleanExcerpt,
    link: post.link,
    date: post.date,
    image,
    categories,
    // Summary starts null — filled in by hook after AI or excerpt
    summary: null,
    summaryLoading: true,
  };
}

/** Strips HTML tags from a string */
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent ?? tmp.innerText ?? '';
}
