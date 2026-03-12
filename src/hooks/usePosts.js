/**
 * usePosts.js — data fetching + card navigation
 * No animClass needed anymore — Framer Motion handles animations via key prop.
 * Ref-based navigation lock prevents race conditions on rapid key presses.
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { fetchPosts } from '../services/wordpress';
import { getSummary } from '../services/summarize';

export function usePosts() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const idxRef       = useRef(0);
  const totalRef     = useRef(0);
  const navigatingRef = useRef(false);

  const setIdx = (n) => { idxRef.current = n; setCurrentIdx(n); };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIdx(0);
    navigatingRef.current = false;
    try {
      const loaded = await fetchPosts(1);
      totalRef.current = loaded.length;
      setPosts(loaded);
      setLoading(false);
      for (let i = 0; i < loaded.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const summary = await getSummary(loaded[i]);
        setPosts(prev => prev.map((p, idx) => idx === i ? { ...p, summary, summaryLoading: false } : p));
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong.');
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const navigate = useCallback((dir) => {
    if (navigatingRef.current) return;
    const cur   = idxRef.current;
    const total = totalRef.current;
    if (dir === 'next' && cur >= total - 1) return;
    if (dir === 'prev' && cur <= 0) return;

    navigatingRef.current = true;
    // Framer Motion animates the exit/enter; we just need to update index
    // after a short delay so the fly-off animation has time to start
    setTimeout(() => {
      setIdx(dir === 'next' ? cur + 1 : cur - 1);
      setTimeout(() => { navigatingRef.current = false; }, 100);
    }, 50);
  }, []);

  const goNext = useCallback(() => navigate('next'), [navigate]);
  const goPrev = useCallback(() => navigate('prev'), [navigate]);

  return { posts, loading, error, currentIdx, goNext, goPrev, reload: load };
}
