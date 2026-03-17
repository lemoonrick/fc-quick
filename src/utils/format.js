/**
 * format.js
 * Pure utility functions. No side effects.
 */

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getVerdict(categories = [], acfVerdict = null) {
  // Grab names from categories and the ACF field just to be safe
  const names = categories.map((c) => c.name.toLowerCase());
  if (acfVerdict?.name) names.push(acfVerdict.name.toLowerCase());

  const is = (keywords) =>
    keywords.some((k) => names.some((n) => n.includes(k)));

  if (is(['false'])) return { label: 'False', cssClass: 'false', icon: '✕' };
  if (is(['partly-false', 'partly false']))
    return { label: 'Partly False', cssClass: 'partly-false', icon: '✕' };
  if (is(['misleading']))
    return { label: 'Misleading', cssClass: 'misleading', icon: '!' };
  if (is(['missing context']))
    return { label: 'Missing Context', cssClass: 'missing-context', icon: '?' };
  if (is(['satire']))
    return { label: 'Satire', cssClass: 'satire', icon: '🎭' };
  if (is(['altered']))
    return { label: 'Altered', cssClass: 'altered', icon: '✂️' };
  if (is(['insight']))
    return { label: 'Insight', cssClass: 'insight', icon: '💡' };
  if (is(['news'])) return { label: 'News', cssClass: 'news', icon: '📰' };

  // Fallback if none match
  return null;
}

export function getDisplayCategories(categories = [], max = 4) {
  const SKIP = new Set(['uncategorized', 'featured', 'slider']);
  return categories
    .filter((c) => !SKIP.has(c.name.toLowerCase()))
    .slice(0, max);
}
