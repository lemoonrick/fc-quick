/**
 * summarize.js
 * Handles article summarization.
 *
 * If VITE_USE_AI_SUMMARY=true  → calls Anthropic API via Vite dev proxy
 * If VITE_USE_AI_SUMMARY=false → uses the WordPress excerpt (free, instant)
 *
 * The proxy approach means your API key is NEVER visible in browser network
 * tabs during local development. For production you need a real backend
 * (e.g. a small Express/Cloudflare Worker/Next.js API route) that holds the
 * key server-side. DO NOT ship VITE_ANTHROPIC_API_KEY in a production build.
 */

const USE_AI = import.meta.env.VITE_USE_AI_SUMMARY === 'true';

/**
 * getSummary
 * Returns a summary string for a given post.
 * @param {{ title: string, excerpt: string, rawExcerpt: string }} post
 * @returns {Promise<string>}
 */
export async function getSummary(post) {
  if (!USE_AI) {
    return excerptSummary(post.excerpt);
  }
  try {
    return await aiSummary(post.title, post.excerpt);
  } catch (err) {
    console.warn('[FC Quick] AI summary failed, falling back to excerpt:', err.message);
    return excerptSummary(post.excerpt);
  }
}

/** Trim the WP excerpt to a sensible length */
function excerptSummary(excerpt) {
  const clean = excerpt.trim();
  if (!clean) return 'No summary available.';
  return clean.length > 260 ? clean.slice(0, 257) + '...' : clean;
}

/** Call Anthropic Claude via dev proxy (key stays server-side) */
async function aiSummary(title, excerpt) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set');
  }

  const prompt = `You summarize fact-check articles for a news app called FC Quick. 
Write a crisp 2-3 sentence summary (max 55 words) that tells the reader exactly what claim was fact-checked and what the verdict is. 
Be direct. No filler phrases like "This article" or "The article examines".

Title: ${title}
Excerpt: ${excerpt}

Write only the summary text.`;

  // In dev: Vite proxies /api/ai → https://api.anthropic.com
  // In prod: replace /api/ai with your own backend endpoint
  const endpoint = import.meta.env.DEV
    ? '/api/ai/v1/messages'
    : '/api/summarize'; // your production backend route

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // In dev the proxy forwards this header to Anthropic
      // In prod your backend adds its own key — remove this line
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text?.trim();
  if (!text) throw new Error('Empty response from AI');
  return text;
}
