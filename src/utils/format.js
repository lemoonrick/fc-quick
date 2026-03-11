/**
 * format.js
 * Pure utility functions — no React, no side effects.
 * Safe to import anywhere.
 */

/**
 * Formats a WP date string for Indian readers.
 * e.g. "2024-03-11T14:30:00" → "11 Mar 2024"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Determines verdict info from a post's category array.
 * Returns { label, cssClass, icon } or null if no verdict detected.
 */
export function getVerdict(categories = []) {
  const names = categories.map((c) => c.name.toLowerCase());

  const is = (keywords) => keywords.some((k) => names.some((n) => n.includes(k)));

  if (is(['false', 'fake', 'fabricated', 'misinformation'])) {
    return { label: 'False', cssClass: 'verdict--false', icon: '✕' };
  }
  if (is(['misleading', 'partial', 'half'])) {
    return { label: 'Misleading', cssClass: 'verdict--misleading', icon: '!' };
  }
  if (is(['true', 'verified', 'accurate'])) {
    return { label: 'Verified True', cssClass: 'verdict--true', icon: '✓' };
  }
  return null;
}

/**
 * Filters out noisy categories (Uncategorized, Featured, etc.)
 * and caps at a max count for display.
 */
export function getDisplayCategories(categories = [], max = 4) {
  const SKIP = new Set(['uncategorized', 'featured', 'slider']);
  return categories
    .filter((c) => !SKIP.has(c.name.toLowerCase()))
    .slice(0, max);
}
