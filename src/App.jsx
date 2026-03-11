import { useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import DesktopView from './components/DesktopView/DesktopView';
import MobileView from './components/MobileView/MobileView';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBox from './components/ErrorBox/ErrorBox';
import { usePosts } from './hooks/usePosts';

export default function App() {
  const {
    posts,
    loading,
    error,
    currentIdx,
    animClass,
    goNext,
    goPrev,
    reload,
  } = usePosts();

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  return (
    <>
      <Header />

      {loading && <LoadingSpinner />}

      {error && !loading && (
        <ErrorBox message={error} onRetry={reload} />
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <DesktopView
            post={posts[currentIdx]}
            onNext={goNext}
            onPrev={goPrev}
            current={currentIdx + 1}
            total={posts.length}
            animClass={animClass}
          />
          <MobileView posts={posts} />
        </>
      )}
    </>
  );
}
