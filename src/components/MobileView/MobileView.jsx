import { useEffect, useRef, useState } from 'react';
import { formatDate, getVerdict } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';
import './MobileView.css';

/* Icons */
const CalIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    style={{ width: 14, height: 14, flexShrink: 0 }}
  >
    <rect
      x='1.5'
      y='2.5'
      width='13'
      height='12'
      rx='2.5'
      stroke='currentColor'
      strokeWidth='1.3'
    />
    <path d='M1.5 6.5h13' stroke='currentColor' strokeWidth='1.3' />
    <path
      d='M5 1.5v2M11 1.5v2'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinecap='round'
    />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox='0 0 24 24' fill='none' style={{ width: 18, height: 18 }}>
    <circle cx='18' cy='5' r='3' stroke='currentColor' strokeWidth='1.8' />
    <circle cx='6' cy='12' r='3' stroke='currentColor' strokeWidth='1.8' />
    <circle cx='18' cy='19' r='3' stroke='currentColor' strokeWidth='1.8' />
    <path
      d='M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
    />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 14, height: 14 }}>
    <path
      d='M11 3h6v6M17 3l-8 8M8 5H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/* Real Indian Brand Ads with Unsplash Images */
const MOCK_ADS = [
  {
    bg: '#fef2f2',
    brand: 'ZOMATO',
    headline: 'Craving Biryani?',
    sub: 'Get it delivered hot and fresh in 30 mins.',
    cta: 'Order Now',
    accent: '#e23744',
    image:
      'https://images.unsplash.com/photo-1631515243349-e0cb4c1133c9?auto=format&fit=crop&w=400&q=80',
  },
  {
    bg: '#000000',
    brand: 'CRED',
    headline: 'Pay credit card bills. Earn rewards.',
    sub: 'Join the club of top 1% creditworthy individuals.',
    cta: 'Download',
    accent: '#ffffff',
    image:
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    bg: '#f0fdf4',
    brand: 'TATA MOTORS',
    headline: 'Reclaim Your Life',
    sub: 'Test drive the all-new Tata Safari today.',
    cta: 'Book Now',
    accent: '#047857',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80',
  },
  {
    bg: '#fdf4ff',
    brand: 'MYNTRA',
    headline: 'End of Reason Sale',
    sub: '50-80% off on top global fashion brands.',
    cta: 'Shop Now',
    accent: '#d946ef',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
  },
];

function buildFeed(posts) {
  const feed = [];
  posts.forEach((post, i) => {
    if (i > 0 && i % 5 === 0)
      feed.push({ type: 'fullad', adIndex: Math.floor(i / 5) - 1 });
    if (i % 4 === 2)
      feed.push({ type: 'adstrip', post, postIndex: i, adIndex: i });
    else feed.push({ type: 'normal', post, postIndex: i });
  });
  return feed;
}

async function handleShare(post) {
  try {
    if (navigator.share)
      await navigator.share({
        title: post.title,
        text: post.summary || post.title,
        url: post.link,
      });
    else {
      await navigator.clipboard.writeText(post.link);
      alert('Link copied!');
    }
  } catch (e) {}
}

function AdStrip({ adIndex }) {
  const ad = MOCK_ADS[adIndex % MOCK_ADS.length];
  const displayAd = ad.brand === 'CRED' ? MOCK_ADS[0] : ad;

  return (
    <div className='ad-strip' style={{ backgroundColor: displayAd.bg }}>
      <img src={displayAd.image} alt={displayAd.brand} />
      <div className='ad-strip-content'>
        <div className='ad-strip-header'>
          <span className='ad-strip-brand' style={{ color: displayAd.accent }}>
            {displayAd.brand}
          </span>
          <span className='ad-strip-label'>SPONSORED</span>
        </div>
        <p className='ad-strip-title'>{displayAd.headline}</p>
        <p className='ad-strip-sub'>{displayAd.sub}</p>
      </div>
      <button
        className='ad-strip-btn'
        style={{
          backgroundColor: displayAd.accent,
          boxShadow: `0 4px 12px ${displayAd.accent}40`,
          color: displayAd.brand === 'CRED' ? '#000' : '#fff',
        }}
      >
        {displayAd.cta}
      </button>
    </div>
  );
}

function FullAdCard() {
  const ad = MOCK_ADS[1];
  return (
    <div
      className='full-ad-card'
      style={{ backgroundImage: `url(${ad.image})` }}
    >
      <div className='full-ad-overlay' />
      <div className='full-ad-content'>
        <div className='full-ad-label'>SPONSORED</div>
        <h2 className='full-ad-title'>{ad.headline}</h2>
        <p className='full-ad-sub'>{ad.sub}</p>
        <button className='full-ad-btn'>{ad.cta}</button>
      </div>
    </div>
  );
}

function ArticleCard({ post, postIndex, type }) {
  const showAdStrip = type === 'adstrip';

  return (
    <div className='article-card'>
      <div className='ac-image-area'>
        <div className='ac-blurred-bg-container'>
          {post.image && (
            <div
              className='ac-blurred-bg'
              style={{ backgroundImage: `url(${post.image})` }}
            />
          )}
        </div>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading='lazy'
            draggable={false}
            className='ac-main-image'
          />
        ) : (
          <div style={{ padding: '40px 0', opacity: 0.2, fontSize: '40px' }}>
            📰
          </div>
        )}
        <div className='ac-badge-wrap'>
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
        <button onClick={() => handleShare(post)} className='ac-share-btn'>
          <ShareIcon />
        </button>
      </div>

      <div className='ac-content-area'>
        <div className='ac-meta'>
          <CalIcon /> {formatDate(post.date)}
        </div>
        <h2 className='ac-title'>{post.title}</h2>
        <div className='ac-summary-wrap'>
          <p className='ac-summary-text'>{post.summary}</p>
        </div>
        <a
          href={post.link}
          target='_blank'
          rel='noopener noreferrer'
          className='ac-read-btn'
        >
          Read Full Article <ExternalIcon />
        </a>
      </div>

      {showAdStrip && <AdStrip adIndex={postIndex} />}
    </div>
  );
}

function PeekTooltip({ visible }) {
  return (
    <div className='peek-tooltip' style={{ opacity: visible ? 1 : 0 }}>
      <div className='peek-tooltip-inner'>
        <span>👆</span>
        <span>Swipe up for next</span>
      </div>
    </div>
  );
}

// MAIN MOBILE COMPONENT
export default function MobileView({
  posts,
  onLoadMore,
  hasMore,
  isLoadingMore,
}) {
  const feed = buildFeed(posts);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [doPeek, setDoPeek] = useState(false);

  // --- THE MAGIC TRIGGER ---
  // If the user scrolls within 3 cards of the bottom, fetch the next batch seamlessly.
  useEffect(() => {
    if (hasMore && !isLoadingMore && activeIndex >= feed.length - 3) {
      onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, feed.length, hasMore, isLoadingMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5)
            setActiveIndex(parseInt(entry.target.dataset.index, 10));
        });
      },
      { root: container, threshold: 0.5 },
    );
    container
      .querySelectorAll('[data-index]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [feed.length]);

  useEffect(() => {
    const peekT = setTimeout(() => setDoPeek(true), 1200);
    const showT = setTimeout(() => setShowTooltip(true), 1200);
    const hideT = setTimeout(() => setShowTooltip(false), 3500);
    return () => {
      clearTimeout(peekT);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  return (
    <div className='mobile-feed-container'>
      <div className='mobile-feed-bg' />

      <div className='mobile-feed-viewport'>
        <div ref={containerRef} className='mobile-feed-scroll'>
          {feed.map((item, i) => {
            const dist = i - activeIndex;
            const scale = dist === 0 ? 1 : 0.95;
            const opacity = dist === 0 ? 1 : 0.6;
            const animatePeek =
              i === 0 && doPeek ? 'peekUp 0.8s ease-in-out forwards' : 'none';

            return (
              <div key={i} data-index={i} className='mobile-card-wrapper'>
                <div
                  className='mobile-card-inner'
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    animation: animatePeek,
                  }}
                >
                  {item.type === 'fullad' ? (
                    <FullAdCard />
                  ) : (
                    <ArticleCard
                      post={item.post}
                      postIndex={item.postIndex}
                      type={item.type}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Fallback spinner at the very bottom in case the internet is slow */}
          {isLoadingMore && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '30px 0 60px 0',
              }}
            >
              <div className='mobile-spinner' />
            </div>
          )}
        </div>
        <PeekTooltip visible={showTooltip} />
      </div>
    </div>
  );
}
