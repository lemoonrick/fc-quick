import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DesktopView from './components/DesktopView/DesktopView';
import MobileView from './components/MobileView/MobileView';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBox from './components/ErrorBox/ErrorBox';
import { usePosts } from './hooks/usePosts';

const TABS = [
  { id: 'factchecks', label: 'Fact Checks', category: null },
  { id: 'insight', label: 'Insight', category: 'insight' },
];

function TabFeed({ tab, activeTab, onNext, onPrev }) {
  const { posts, loading, error, currentIdx, goNext, goPrev, reload } =
    usePosts(tab.category);

  // Expose goNext/goPrev to parent for keyboard nav on active tab
  useEffect(() => {
    if (tab.id === activeTab) {
      onNext.current = goNext;
      onPrev.current = goPrev;
    }
  }, [tab.id, activeTab, goNext, goPrev, onNext, onPrev]);

  const isActive = tab.id === activeTab;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
      }}
    >
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
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('factchecks');
  const activeNextRef = useRef(() => {});
  const activePrevRef = useRef(() => {});

  // Keyboard nav delegates to whichever tab is active
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        activeNextRef.current();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') activePrevRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Horizontal swipe to switch tabs (mobile)
  const swipeStartX = useRef(null);
  const swipeStartY = useRef(null);

  const onTouchStart = useCallback((e) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (swipeStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - swipeStartX.current;
      const dy = e.changedTouches[0].clientY - swipeStartY.current;

      // Only fire if mostly horizontal and long enough
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 55) {
        const currentIdx = TABS.findIndex((t) => t.id === activeTab);
        if (dx < 0 && currentIdx < TABS.length - 1)
          setActiveTab(TABS[currentIdx + 1].id);
        if (dx > 0 && currentIdx > 0) setActiveTab(TABS[currentIdx - 1].id);
      }
      swipeStartX.current = null;
      swipeStartY.current = null;
    },
    [activeTab],
  );

  return (
    <>
      <div className='page-bg' aria-hidden='true'>
        <div className='page-bg-glow page-bg-glow-1' />
        <div className='page-bg-glow page-bg-glow-2' />
        <div className='page-bg-glow page-bg-glow-3' />
      </div>

      <div
        style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Header activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />

        {/* Tab panels stacked, only active one is visible */}
        <div style={{ position: 'relative' }}>
          {TABS.map((tab) => (
            <TabFeed
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onNext={activeNextRef}
              onPrev={activePrevRef}
            />
          ))}
        </div>
      </div>
    </>
  );
}
