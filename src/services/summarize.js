/**
 * summarize.js
 * Priority:
 *   1. ACF fc_summary (instant, no API call)
 *   2. Gemini 2.0 Flash (free, direct from browser)
 *   3. Excerpt truncation (silent fallback, always works)
 */

/**
 * Clean fallback version: Uses ACF summary if available, otherwise neatly truncates the excerpt.
 */

export async function getSummary(post) {
  if (!post.summaryLoading) return post.summary;
  return excerptSummary(post.excerpt);
}

function excerptSummary(excerpt) {
  const clean = excerpt.trim();
  if (!clean) return 'No summary available.';
  const words = clean.split(/\s+/);
  if (words.length <= 50) return clean;
  return words.slice(0, 50).join(' ') + '...';
}
