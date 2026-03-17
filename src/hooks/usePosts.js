import { useState, useCallback, useEffect } from 'react';
import { fetchPosts } from '../services/wordpress';
import { getSummary } from '../services/summarize';

export function usePosts(categorySlug = null) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState(null);

  const loadInitial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setPage(1);
      setCurrentIdx(0);

      const data = await fetchPosts(1, categorySlug);

      if (data.length < 10) setHasMore(false);
      else setHasMore(true);

      const processed = await Promise.all(
        data.map(async (p) => {
          if (!p.summaryLoading) return p;
          const summary = await getSummary(p);
          return { ...p, summary, summaryLoading: false };
        }),
      );

      setPosts(processed);
    } catch (err) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  // NEW: Dedicated loadMore function for the Mobile Feed
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await fetchPosts(nextPage, categorySlug);

      if (data.length < 10) setHasMore(false);

      const processed = await Promise.all(
        data.map(async (p) => {
          if (!p.summaryLoading) return p;
          const summary = await getSummary(p);
          return { ...p, summary, summaryLoading: false };
        }),
      );

      setPosts((prev) => [...prev, ...processed]);
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to load more:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore, categorySlug]);

  // Desktop goNext uses the loadMore function now
  const goNext = async () => {
    if (currentIdx < posts.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else if (hasMore && !loadingMore) {
      await loadMore();
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  return {
    posts,
    loading,
    error,
    loadingMore,
    currentIdx,
    goNext,
    goPrev,
    hasMore,
    reload: loadInitial,
    loadMore,
  };
}
