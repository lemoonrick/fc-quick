import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DesktopView from './components/DesktopView/DesktopView';
import MobileView from './components/MobileView/MobileView';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBox from './components/ErrorBox/ErrorBox';
import { usePosts } from './hooks/usePosts';

export default function App() {
  const { posts, loading, error, currentIdx, goNext, goPrev, reload } =
    usePosts();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  return (
    <>
      {/* Background layer — always rendered */}
      <div className='page-bg' aria-hidden='true'>
        <div className='page-bg-glow page-bg-glow-1' />
        <div className='page-bg-glow page-bg-glow-2' />
        <div className='page-bg-glow page-bg-glow-3' />
      </div>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Header />
        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorBox message={error} onRetry={reload} />}
        {!loading && !error && posts.length > 0 && (
          <>
            <DesktopView
              post={posts[currentIdx]}
              onNext={goNext}
              onPrev={goPrev}
              current={currentIdx + 1}
              total={posts.length}
            />
            <MobileView posts={posts} />
          </>
        )}
      </div>
    </>
  );
}
