/**
 * summarize.js
 *
 * Priority order:
 *   1. ACF fc_summary field (instant, no API call) ← new
 *   2. AI summary via Anthropic (optional, VITE_USE_AI_SUMMARY=true)
 *   3. WP excerpt truncated (free fallback, always works)
 */

const USE_AI = import.meta.env.VITE_USE_AI_SUMMARY === 'true';

export async function getSummary(post) {
  // ACF summary already set in wordpress.js — hook skips this post
  if (!post.summaryLoading) return post.summary;

  if (!USE_AI) {
    return excerptSummary(post.excerpt);
  }

  try {
    return await aiSummary(post.title, post.excerpt);
  } catch (err) {
    console.warn(
      '[FC Quick] AI summary failed, falling back to excerpt:',
      err.message,
    );
    return excerptSummary(post.excerpt);
  }
}

function excerptSummary(excerpt) {
  const clean = excerpt.trim();
  if (!clean) return 'No summary available.';
  // Target ~45 words — fills 3 lines on mobile without overflow
  const words = clean.split(/\s+/);
  if (words.length <= 70) return clean;
  return words.slice(0, 70).join(' ') + '…';
}

async function aiSummary(title, excerpt) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set');
  }

  const prompt = `Summarize this fact-check for a mobile news card. Max 2 sentences, 40 words. 
State what was claimed and what the verdict is. No filler phrases.

Title: ${title}
Excerpt: ${excerpt}

Summary only, no extra text.`;

  const endpoint = import.meta.env.DEV
    ? '/api/ai/v1/messages'
    : '/api/summarize';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', // haiku = cheapest if AI path used
      max_tokens: 120,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}`);

  const data = await res.json();
  const text = data?.content?.[0]?.text?.trim();
  if (!text) throw new Error('Empty response from AI');
  return text;
}
