import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

/* ─── Icons ─── */
const CalIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    style={{ width: 11, height: 11, flexShrink: 0 }}
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

/* ─── Ad data ─── */
const MOCK_ADS = [
  {
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    logo: '🔐',
    brand: 'CYBERSHIELD VPN',
    headline: 'Browse Without a Trace.',
    sub: 'Protect yourself from phishing & data leaks.',
    cta: 'Try Free',
    accent: '#f43f5e',
    glow: '#f43f5e',
  },
  {
    bg: 'linear-gradient(135deg, #0a1f14 0%, #052e16 100%)',
    logo: '📰',
    brand: 'NEWSGUARD PRO',
    headline: 'Know Before You Share.',
    sub: 'AI-powered credibility scores for every link.',
    cta: 'Get App',
    accent: '#10b981',
    glow: '#10b981',
  },
  {
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2e1065 100%)',
    logo: '🧠',
    brand: 'FACT IQ',
    headline: 'Train Your Bs Detector.',
    sub: '5 mins a day to outsmart misinformation.',
    cta: 'Start',
    accent: '#8b5cf6',
    glow: '#8b5cf6',
  },
  {
    bg: 'linear-gradient(135deg, #1c0a00 0%, #431407 100%)',
    logo: '📡',
    brand: 'TRUTHRADAR',
    headline: 'Viral Claim? We Track It.',
    sub: 'Real-time alerts when rumours get debunked.',
    cta: 'Subscribe',
    accent: '#f97316',
    glow: '#f97316',
  },
];

/* ─── Card type logic ─── */
// Given an array of posts, build a feed with interleaved ad-only cards
function buildFeed(posts) {
  const feed = [];
  posts.forEach((post, i) => {
    // Every 5th real post, insert a full-page ad before it
    if (i > 0 && i % 5 === 0) {
      feed.push({ type: 'fullad', adIndex: Math.floor(i / 5) - 1 });
    }
    // Determine article card variant
    if (i % 4 === 2) {
      feed.push({ type: 'adstrip', post, postIndex: i, adIndex: i });
    } else if (i % 5 === 3) {
      feed.push({ type: 'readmore', post, postIndex: i });
    } else {
      feed.push({ type: 'normal', post, postIndex: i });
    }
  });
  return feed;
}

/* ─── Share handler ─── */
async function handleShare(post) {
  try {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.summary || post.title,
        url: post.link,
      });
    } else {
      await navigator.clipboard.writeText(post.link);
      alert('Link copied!');
    }
  } catch (e) {}
}

/* ─── Compact ad strip ─── */
function AdStrip({ adIndex }) {
  const ad = MOCK_ADS[adIndex % MOCK_ADS.length];
  return (
    <div
      style={{
        height: 76,
        flexShrink: 0,
        background: ad.bg,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1.5px solid ${ad.accent}35`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ad.glow}15 0%, transparent 70%)`,
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 2,
          }}
        >
          <span style={{ fontSize: 12 }}>{ad.logo}</span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.06em',
              fontFamily: 'Poppins,sans-serif',
            }}
          >
            {ad.brand}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 8,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Poppins,sans-serif',
            }}
          >
            AD
          </span>
        </div>
        <p
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 1px',
            fontFamily: 'Poppins,sans-serif',
          }}
        >
          {ad.headline}
        </p>
        <p
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.3,
            margin: 0,
            fontFamily: 'Poppins,sans-serif',
          }}
        >
          {ad.sub}
        </p>
      </div>
      <button
        style={{
          flexShrink: 0,
          padding: '6px 13px',
          borderRadius: 999,
          background: ad.accent,
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Poppins,sans-serif',
          boxShadow: `0 2px 8px ${ad.accent}45`,
          whiteSpace: 'nowrap',
        }}
      >
        {ad.cta}
      </button>
    </div>
  );
}

/* ─── Full page ad card ─── */
function FullAdCard() {
  const ad = MOCK_ADS[1]; // NewsGuard for full page
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(160deg, #0a1628 0%, #0d1f12 50%, #0a1628 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 28px',
        fontFamily: 'Poppins,sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #10b98120 0%, transparent 70%)',
          top: -60,
          right: -60,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #f43f5e15 0%, transparent 70%)',
          bottom: 40,
          left: -40,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          fontSize: 9,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
        }}
      >
        SPONSORED
      </div>

      <div style={{ fontSize: 52, marginBottom: 20 }}>{ad.logo}</div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: ad.accent,
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}
      >
        {ad.brand}
      </div>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          margin: '0 0 14px',
        }}
      >
        Don't Share.
        <br />
        Verify First.
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.55)',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '0 0 32px',
          maxWidth: 260,
        }}
      >
        Over 60% of misinformation spreads because people share before checking.
        NewsGuard Pro stops that.
      </p>
      <button
        style={{
          padding: '14px 36px',
          borderRadius: 999,
          background: `linear-gradient(135deg, ${ad.accent}, #059669)`,
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${ad.accent}50`,
          letterSpacing: '0.01em',
        }}
      >
        {ad.cta} — It's Free
      </button>
      <p
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}
      >
        No credit card required
      </p>
    </div>
  );
}

/* ─── Article card ─── */
function ArticleCard({ post, postIndex, type }) {
  const showReadMore = type === 'readmore';
  const showAdStrip = type === 'adstrip';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        fontFamily: 'Poppins,sans-serif',
      }}
    >
      {/* Image — 35dvh */}
      <div
        style={{
          height: '35dvh',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          background: '#e8edf5',
        }}
      >
        {post.image ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(18px) brightness(0.6) saturate(1.2)',
                transform: 'scale(1.12)',
              }}
            />
            <img
              src={post.image}
              alt={post.title}
              loading='lazy'
              draggable={false}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox='0 0 48 48'
              fill='none'
              style={{ width: 36, opacity: 0.15 }}
            >
              <rect width='48' height='48' rx='8' fill='#a5b4fc' />
              <path
                d='M8 34l10-10 8 8 6-6 8 8'
                stroke='white'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <circle cx='17' cy='20' r='4' fill='white' />
            </svg>
          </div>
        )}
        <div
          style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }}
        >
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
      </div>

      {/* Date + Share */}
      <div
        style={{
          height: 40,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
        }}
      >
        <time
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            fontWeight: 500,
            color: '#94a3b8',
          }}
          dateTime={post.date}
        >
          <CalIcon />
          {formatDate(post.date)}
        </time>
        <button
          onClick={() => handleShare(post)}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#f1f5f9',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            cursor: 'pointer',
          }}
        >
          <ShareIcon />
        </button>
      </div>

      {/* Title */}
      <h2
        style={{
          flexShrink: 0,
          fontSize: 15,
          fontWeight: 700,
          lineHeight: 1.35,
          letterSpacing: '-0.015em',
          color: '#0f172a',
          margin: '0 18px 10px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.title}
      </h2>

      {/* Summary */}
      <div
        style={{ flex: 1, minHeight: 0, padding: '0 18px', overflow: 'hidden' }}
      >
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.68,
            color: '#475569',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.summary}
        </p>
      </div>

      {/* Read More button — always shown */}
      <div style={{ flexShrink: 0, padding: '10px 18px 14px' }}>
        <a
          href={post.link}
          target='_blank'
          rel='noopener noreferrer'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            padding: '11px 0',
            borderRadius: 12,
            textDecoration: 'none',
            background:
              type === 'readmore'
                ? 'linear-gradient(135deg, #d90429 0%, #9b031a 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            boxShadow:
              type === 'readmore'
                ? '0 4px 16px rgba(217,4,41,0.35)'
                : '0 4px 12px rgba(0,0,0,0.2)',
            fontFamily: 'Poppins,sans-serif',
          }}
        >
          Read Full Article <ExternalIcon />
        </a>
      </div>

      {/* Ad strip */}
      {showAdStrip && <AdStrip adIndex={postIndex} />}
    </div>
  );
}

/* ─── Peek tooltip ─── */
function PeekTooltip({ visible }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 110,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 999,
          background: 'rgba(15,23,42,0.82)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ fontSize: 14 }}>👆</span>
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Poppins,sans-serif',
          }}
        >
          Swipe up for next
        </span>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function MobileView({ posts }) {
  const feed = buildFeed(posts);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [doPeek, setDoPeek] = useState(false);

  // Track active card via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    container
      .querySelectorAll('[data-index]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [feed.length]);

  // Peek + tooltip on mount, once, with delay for page to settle
  useEffect(() => {
    const peekT = setTimeout(() => setDoPeek(true), 1200);
    const showT = setTimeout(() => setShowTooltip(true), 1200);
    const hideT = setTimeout(() => setShowTooltip(false), 3000);
    return () => {
      clearTimeout(peekT);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []); // runs once on mount only

  return (
    <div id='mobile-feed' style={{ display: 'none' }}>
      <style>{`
        @media (max-width: 767px) { #mobile-feed { display: block !important; } }
        ::-webkit-scrollbar { display: none; }
        @keyframes peekUp {
          0%   { transform: scale(1) translateY(0); }
          40%  { transform: scale(1) translateY(-44px); }
          100% { transform: scale(1) translateY(0); }
        }
      `}</style>

      <div style={{ position: 'fixed', top: 56, left: 0, right: 0, bottom: 0 }}>
        {/* Scroll container */}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {feed.map((item, i) => {
            const dist = i - activeIndex;
            const scale = dist === 0 ? 1 : dist === 1 ? 0.96 : 0.93;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.8 : 0.55;
            return (
              <div
                key={i}
                data-index={i}
                style={{
                  width: '100%',
                  height: '100%',
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `scale(${scale})`,
                    opacity,
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    borderRadius: dist !== 0 ? 14 : 0,
                    overflow: 'hidden',
                  }}
                >
                  {/* Peek wrapper — separate from scale so transforms don't conflict */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      animation:
                        i === 0 && doPeek
                          ? 'peekUp 0.75s ease-in-out forwards'
                          : 'none',
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
              </div>
            );
          })}
        </div>

        <PeekTooltip visible={showTooltip} />
      </div>
    </div>
  );
}
