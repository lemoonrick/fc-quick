/**
 * wordpress.js
 * Fetches posts from WP REST API and normalizes them.
 *
 * ACF fields expected (all optional — falls back gracefully):
 *   fc_title   — custom card headline (plain text)
 *   fc_summary — 1–2 sentence summary (plain text)
 *   fc_image   — image URL (return as URL in ACF, not array)
 *   fc_verdict — "False" | "Misleading" | "True" | "Unverified"
 */

const BASE = import.meta.env.DEV
  ? '/api/wp'
  : `${import.meta.env.VITE_WP_BASE_URL}/wp-json/wp/v2`;

const PER_PAGE = Number(import.meta.env.VITE_WP_PER_PAGE) || 10;

const categoryIdCache = {};

async function resolveCategoryId(slug) {
  if (categoryIdCache[slug]) return categoryIdCache[slug];
  try {
    const res = await fetch(`${BASE}/categories?slug=${slug}&_fields=id`);
    if (!res.ok) return null;
    const data = await res.json();
    const id = data[0]?.id ?? null;
    if (id) categoryIdCache[slug] = id;
    return id;
  } catch (_) {
    return null;
  }
}

export async function fetchPosts(page = 1, categorySlug = null) {
  const params = new URLSearchParams({
    per_page: PER_PAGE,
    page,
    _embed: 1,
    _fields: 'id,title,excerpt,link,date,categories,acf,_embedded,_links',
  });

  if (categorySlug) {
    const catId = await resolveCategoryId(categorySlug);
    if (catId) params.set('categories', catId);
  }

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

  const media = embedded['wp:featuredmedia']?.[0];
  const wpImage =
    media?.source_url ||
    media?.media_details?.sizes?.full?.source_url ||
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    null;

  const image = acf.fc_image || wpImage || null;

  const wpTitle = stripHtml(post.title?.rendered ?? '');
  const title = (acf.fc_title || wpTitle).trim();

  const terms = embedded['wp:term'] ?? [];
  const categories = terms.flat().filter((t) => t.taxonomy === 'category');

  const acfVerdict = acf.fc_verdict
    ? { name: acf.fc_verdict, slug: acf.fc_verdict.toLowerCase() }
    : null;

  const rawExcerpt = post.excerpt?.rendered ?? '';
  const excerpt = stripHtml(rawExcerpt).trim();

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
    acfVerdict,
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
