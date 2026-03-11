/**
 * usePosts.js
 * Fixed navigation: uses refs to track in-flight index so rapid key
 * presses never cause stale closures or blank screens.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { fetchPosts } from '../services/wordpress';
import { getSummary } from '../services/summarize';

const ANIM_DURATION = 300;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animClass, setAnimClass] = useState('card--enter');

  // Refs mirror state so callbacks always read latest without re-creating
  const idxRef = useRef(0);
  const totalRef = useRef(0);
  // Lock prevents overlapping animations when keys are spammed
  const animatingRef = useRef(false);

  const setIdx = (n) => {
    idxRef.current = n;
    setCurrentIdx(n);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIdx(0);
    animatingRef.current = false;

    try {
      const loaded = await fetchPosts(1);
      totalRef.current = loaded.length;
      setPosts(loaded);
      setLoading(false);

      for (let i = 0; i < loaded.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const summary = await getSummary(loaded[i]);
        setPosts((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, summary, summaryLoading: false } : p
          )
        );
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong loading articles.');
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const navigate = useCallback((direction) => {
    if (animatingRef.current) return;

    const current = idxRef.current;
    const total = totalRef.current;

    if (direction === 'next' && current >= total - 1) return;
    if (direction === 'prev' && current <= 0) return;

    animatingRef.current = true;
    setAnimClass(direction === 'next' ? 'card--exit-left' : 'card--exit-right');

    setTimeout(() => {
      const next = direction === 'next' ? current + 1 : current - 1;
      setIdx(next);
      setAnimClass('card--enter');
      setTimeout(() => { animatingRef.current = false; }, 50);
    }, ANIM_DURATION);
  }, []);

  const goNext = useCallback(() => navigate('next'), [navigate]);
  const goPrev = useCallback(() => navigate('prev'), [navigate]);

  return { posts, loading, error, currentIdx, animClass, goNext, goPrev, reload: load };
}
