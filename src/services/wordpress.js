/**
 * wordpress.js
 * Fetches posts from WP REST API and normalizes them.
 *
 * ACF fields expected (all optional — falls back gracefully):
 *   fc_title   — custom card headline (plain text)
 *   fc_summary — 1–2 sentence summary (plain text)
 *   fc_image   — image URL (return as URL in ACF, not array)
 *   fc_verdict — "False" | "Misleading" | "True" | "Unverified"
 *
 * To expose ACF fields via REST, add to functions.php:
 *   add_filter('acf/rest_api/post/get_fields', '__return_true');
 * OR register each field individually if using ACF Free:
 *   See README for the exact snippet.
 */

const BASE = import.meta.env.DEV
  ? '/api/wp'
  : `${import.meta.env.VITE_WP_BASE_URL}/wp-json/wp/v2`;

const PER_PAGE = Number(import.meta.env.VITE_WP_PER_PAGE) || 10;

export async function fetchPosts(page = 1) {
  const params = new URLSearchParams({
    per_page: PER_PAGE,
    page,
    _embed: 1,
    // acf fields come through automatically once exposed via REST
    _fields: 'id,title,excerpt,link,date,categories,acf,_embedded,_links',
  });

  const res = await fetch(`${BASE}/posts?${params}`);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `WordPress API error ${res.status}: ${res.statusText}${text ? ` — ${text.slice(0, 120)}` : ''}`,
    );
  }

  const posts = await res.json();
  return posts.map(normalizePost);
}

function normalizePost(post) {
  const embedded = post._embedded ?? {};
  const acf = post.acf ?? {};

  // ── Image ──────────────────────────────────────────────────
  // Priority: ACF custom image → WP featured image → null
  const media = embedded['wp:featuredmedia']?.[0];
  const wpImage =
    media?.source_url ||
    media?.media_details?.sizes?.full?.source_url ||
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    null;

  const image = acf.fc_image || wpImage || null;

  // ── Title ──────────────────────────────────────────────────
  // ACF custom title → WP title
  const wpTitle = stripHtml(post.title?.rendered ?? '');
  const title = (acf.fc_title || wpTitle).trim();

  // ── Categories (for verdict fallback) ─────────────────────
  const terms = embedded['wp:term'] ?? [];
  const categories = terms.flat().filter((t) => t.taxonomy === 'category');

  // ── Verdict ────────────────────────────────────────────────
  // ACF fc_verdict takes priority over category-derived verdict.
  // Normalize to lowercase so getVerdict() still works on it.
  const acfVerdict = acf.fc_verdict
    ? { name: acf.fc_verdict, slug: acf.fc_verdict.toLowerCase() }
    : null;

  // ── Excerpt fallback ───────────────────────────────────────
  const rawExcerpt = post.excerpt?.rendered ?? '';
  const excerpt = stripHtml(rawExcerpt).trim();

  // ── Summary ────────────────────────────────────────────────
  // ACF summary: use directly (no loading state needed, instant).
  // No ACF summary: start null, filled by summarize.js async.
  const acfSummary = acf.fc_summary?.trim() || null;

  return {
    id: post.id,
    title,
    rawExcerpt,
    excerpt,
    link: post.link,
    date: post.date,
    image,
    categories,
    acfVerdict, // passed to VerdictBadge, takes priority
    // If ACF summary exists: load immediately, no shimmer
    summary: acfSummary,
    summaryLoading: !acfSummary,
    hasAcfData: !!(acf.fc_title || acf.fc_summary || acf.fc_image),
  };
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent ?? tmp.innerText ?? '';
}
