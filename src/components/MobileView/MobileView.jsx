import { useEffect, useRef, useState } from 'react';
import { formatDate, getVerdict } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

/* ─── Verdict accent colors ─── */
const VERDICT_ACCENT = {
  'verdict--false': {
    bar: '#ef4444',
    glow: 'rgba(239,68,68,0.18)',
    label: '#ef4444',
  },
  'verdict--misleading': {
    bar: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    label: '#f59e0b',
  },
  'verdict--true': {
    bar: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    label: '#10b981',
  },
};
const DEFAULT_ACCENT = {
  bar: '#6366f1',
  glow: 'rgba(99,102,241,0.15)',
  label: '#6366f1',
};

function getAccent(post) {
  const v = getVerdict(post.categories, post.acfVerdict);
  return v ? (VERDICT_ACCENT[v.cssClass] ?? DEFAULT_ACCENT) : DEFAULT_ACCENT;
}

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
  <svg viewBox='0 0 24 24' fill='none' style={{ width: 16, height: 16 }}>
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
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 13, height: 13 }}>
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

function buildFeed(posts) {
  const feed = [];
  posts.forEach((post, i) => {
    if (i > 0 && i % 5 === 0)
      feed.push({ type: 'fullad', adIndex: Math.floor(i / 5) - 1 });
    if (i % 4 === 2)
      feed.push({ type: 'adstrip', post, postIndex: i, adIndex: i });
    else if (i % 5 === 3) feed.push({ type: 'readmore', post, postIndex: i });
    else feed.push({ type: 'normal', post, postIndex: i });
  });
  return feed;
}

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

/* ─── Ad strip ─── */
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

/* ─── Full page ad ─── */
function FullAdCard() {
  const ad = MOCK_ADS[1];
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
  const showAdStrip = type === 'adstrip';
  const accent = getAccent(post);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        fontFamily: 'Poppins,sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Verdict color bar — top edge */}
      <div
        style={{
          height: 3,
          flexShrink: 0,
          background: accent.bar,
          boxShadow: `0 0 12px ${accent.bar}80`,
        }}
      />

      {/* Image */}
      <div
        style={{
          height: '34dvh',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          background: '#f0f0ee',
        }}
      >
        {post.image ? (
          <>
            <img
              src={post.image}
              alt={post.title}
              loading='lazy'
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(1.02) contrast(1.05)',
              }}
            />
            {/* Inset vignette — frames the image, no bottom gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.18)',
                pointerEvents: 'none',
                zIndex: 2,
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
        {/* Verdict badge — overlaps image/gradient boundary */}
        <div
          style={{ position: 'absolute', bottom: -1, right: 14, zIndex: 10 }}
        >
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
      </div>

      {/* Content zone */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 16px 0',
        }}
      >
        {/* Date + share row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
            flexShrink: 0,
          }}
        >
          <time
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10.5,
              fontWeight: 500,
              color: '#94a3b8',
              letterSpacing: '0.02em',
            }}
            dateTime={post.date}
          >
            <CalIcon />
            {formatDate(post.date)}
          </time>
          <button
            onClick={() => handleShare(post)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: `${accent.glow}`,
              border: `1px solid ${accent.bar}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accent.bar,
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
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: '#0f172a',
            marginBottom: 10,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h2>

        {/* Summary zone */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            background: `linear-gradient(135deg, ${accent.glow}, rgba(248,250,252,0.8))`,
            borderRadius: '0 12px 12px 0',
            borderLeft: `3px solid ${accent.bar}`,
            border: `1px solid ${accent.bar}18`,
            borderLeft: `3px solid ${accent.bar}`,
            padding: '10px 13px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            marginBottom: 6,
          }}
        >
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: '#374151',
              margin: 0,
            }}
          >
            {post.summary}
          </p>
        </div>
      </div>

      {/* Bottom: read button + ad */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '4px 16px 8px',
          }}
        >
          <a
            href={post.link}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '7px 16px',
              borderRadius: 999,
              textDecoration: 'none',
              background: `linear-gradient(135deg, #d90429, #9b031a)`,
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              boxShadow: '0 3px 12px rgba(217,4,41,0.35)',
              fontFamily: 'Poppins,sans-serif',
            }}
          >
            Read Article <ExternalIcon />
          </a>
        </div>
        {showAdStrip && <AdStrip adIndex={postIndex} />}
      </div>
    </div>
  );
}

/* ─── Tooltip ─── */
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(parseInt(entry.target.dataset.index, 10));
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

  useEffect(() => {
    const peekT = setTimeout(() => setDoPeek(true), 1200);
    const showT = setTimeout(() => setShowTooltip(true), 1200);
    const hideT = setTimeout(() => setShowTooltip(false), 3000);
    return () => {
      clearTimeout(peekT);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  return (
    <div id='mobile-feed' style={{ display: 'none' }}>
      <style>{`
        @media (max-width: 767px) { #mobile-feed { display: block !important; } }
        ::-webkit-scrollbar { display: none; }
        @keyframes peekUp {
          0%   { transform: translateY(0); }
          40%  { transform: translateY(-44px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div
        style={{ position: 'fixed', top: 108, left: 0, right: 0, bottom: 0 }}
      >
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
            const scale = dist === 0 ? 1 : dist === 1 ? 0.965 : 0.935;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.82 : 0.55;
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
                    transition:
                      'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
                    borderRadius: dist !== 0 ? 18 : 0,
                    overflow: 'hidden',
                    boxShadow:
                      dist === 0 ? '0 4px 32px rgba(15,23,42,0.12)' : 'none',
                  }}
                >
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
