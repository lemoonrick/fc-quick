import { useState, useCallback, useEffect, useRef } from 'react';
import { fetchPosts } from '../services/wordpress';
import { getSummary } from '../services/summarize';

export function usePosts(categorySlug = null) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const idxRef = useRef(0);
  const totalRef = useRef(0);
  const navigatingRef = useRef(false);

  const setIdx = (n) => {
    idxRef.current = n;
    setCurrentIdx(n);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIdx(0);
    navigatingRef.current = false;

    try {
      const loaded = await fetchPosts(1, categorySlug);
      totalRef.current = loaded.length;
      setPosts(loaded);
      setLoading(false);

      for (let i = 0; i < loaded.length; i++) {
        if (!loaded[i].summaryLoading) continue;
        // eslint-disable-next-line no-await-in-loop
        const summary = await getSummary(loaded[i]);
        setPosts((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, summary, summaryLoading: false } : p,
          ),
        );
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong.');
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    load();
  }, [load]);

  const navigate = useCallback((dir) => {
    if (navigatingRef.current) return;
    const cur = idxRef.current;
    const total = totalRef.current;
    if (dir === 'next' && cur >= total - 1) return;
    if (dir === 'prev' && cur <= 0) return;

    navigatingRef.current = true;
    setTimeout(() => {
      setIdx(dir === 'next' ? cur + 1 : cur - 1);
      setTimeout(() => {
        navigatingRef.current = false;
      }, 80);
    }, 40);
  }, []);

  const goNext = useCallback(() => navigate('next'), [navigate]);
  const goPrev = useCallback(() => navigate('prev'), [navigate]);

  return { posts, loading, error, currentIdx, goNext, goPrev, reload: load };
}
