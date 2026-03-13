import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

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
  <svg viewBox='0 0 24 24' fill='none' style={{ width: 19, height: 19 }}>
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

const MOCK_ADS = [
  {
    bg: '#101c33',
    logo: '🔐',
    brand: 'CYBERSHIELD VPN',
    headline: 'Browse Safely. Stay Anonymous.',
    sub: 'Protect yourself from phishing sites.',
    cta: 'Try Free',
    accent: '#f43f5e',
  },
  {
    bg: '#0f291e',
    logo: '📰',
    brand: 'NEWSGUARD PRO',
    headline: 'Know Before You Share.',
    sub: 'AI credibility scores for every article.',
    cta: 'Get App',
    accent: '#10b981',
  },
  {
    bg: '#251438',
    logo: '🧠',
    brand: 'FACT IQ',
    headline: 'Quiz Your Media Literacy.',
    sub: '5 mins a day to spot misinformation.',
    cta: 'Start',
    accent: '#8b5cf6',
  },
  {
    bg: '#331c0e',
    logo: '📡',
    brand: 'TRUTHRADAR',
    headline: 'Real-Time Rumour Alerts.',
    sub: 'Know when a viral claim is debunked.',
    cta: 'Subscribe',
    accent: '#f97316',
  },
];

function MockAd({ index }) {
  const ad = MOCK_ADS[index % MOCK_ADS.length];
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: ad.bg,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `2px solid ${ad.accent}40`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ad.accent}18 0%, transparent 70%)`,
          right: -30,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: logo + text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 3,
          }}
        >
          <span style={{ fontSize: 13 }}>{ad.logo}</span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.06em',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            {ad.brand}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 8,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.05em',
              fontFamily: 'Poppins, system-ui, sans-serif',
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
            lineHeight: 1.25,
            margin: '0 0 2px',
            fontFamily: 'Poppins, system-ui, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {ad.headline}
        </p>
        <p
          style={{
            fontSize: 10.5,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.35,
            margin: 0,
            fontFamily: 'Poppins, system-ui, sans-serif',
          }}
        >
          {ad.sub}
        </p>
      </div>

      {/* Right: CTA */}
      <button
        style={{
          flexShrink: 0,
          padding: '7px 14px',
          borderRadius: 999,
          background: ad.accent,
          color: '#fff',
          fontSize: 11.5,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Poppins, system-ui, sans-serif',
          boxShadow: `0 2px 10px ${ad.accent}50`,
          whiteSpace: 'nowrap',
        }}
      >
        {ad.cta}
      </button>
    </div>
  );
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

function MobileCard({ post, index, total, onSwipeUp, onSwipeDown, isActive }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const articleOpacity = useTransform(x, [0, -80], [0, 1]);
  const [showSwipeUpHint, setShowSwipeUpHint] = useState(false);
  const [showSwipeLeftHint, setShowSwipeLeftHint] = useState(false);

  const handleDrag = (e, info) => {
    const wantLeft = info.offset.x < -30;
    const wantUp = info.offset.y < -30;
    if (wantLeft !== showSwipeLeftHint) setShowSwipeLeftHint(wantLeft);
    if (wantUp !== showSwipeUpHint) setShowSwipeUpHint(wantUp);
  };

  const handleDragEnd = (e, info) => {
    setShowSwipeUpHint(false);
    setShowSwipeLeftHint(false);
    const { offset, velocity } = info;
    if (offset.x < -60 || velocity.x < -400) {
      window.open(post.link, '_blank');
    } else if (offset.y < -60 || velocity.y < -400) {
      if (onSwipeUp) onSwipeUp();
    } else if (offset.y > 60 || velocity.y > 400) {
      if (onSwipeDown) onSwipeDown();
    }
  };

  const AD_H = 76;

  return (
    <motion.article
      drag={isActive}
      dragDirectionLock
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={isActive ? 1 : 0}
      style={{
        x,
        y,
        position: 'absolute',
        inset: 0,
        touchAction: 'none',
        cursor: isActive ? 'grab' : 'default',
        overflow: 'hidden',
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {/* Article open overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
          background: 'rgba(217,4,41,0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: articleOpacity,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 44 }}>📖</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            Opening Article
          </span>
        </div>
      </motion.div>

      {/* Drag hints */}
      <AnimatePresence>
        {showSwipeUpHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: AD_H + 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 999,
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 13 }}>👆</span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                }}
              >
                Swipe up for next
              </span>
            </div>
          </motion.div>
        )}
        {showSwipeLeftHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: AD_H + 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 999,
                background: 'rgba(217,4,41,0.88)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 13 }}>👈</span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                }}
              >
                Release to open article
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Layout — every height is explicit and fixed so summary NEVER gets squeezed:
        [IMAGE: 42dvh] [DATE+SHARE: 40px] [TITLE: auto ~56px] [SUMMARY: fills remaining] [AD: AD_H px] [PROGRESS: 3px]
        Summary = 100dvh - 56(header) - 42dvh - 40 - 56 - AD_H - 3
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        {/* IMAGE — fixed 35dvh, no gradient */}
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
                style={{ width: 36, opacity: 0.2 }}
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
          {/* NO gradient — clean image */}
          <div
            style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }}
          >
            <VerdictBadge
              categories={post.categories}
              acfVerdict={post.acfVerdict}
            />
          </div>
        </div>

        {/* DATE + SHARE — fixed 40px */}
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
          <motion.button
            whileTap={{ scale: 0.88 }}
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
          </motion.button>
        </div>

        {/* TITLE — fixed shrink:0, max 3 lines */}
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

        {/* SUMMARY — flex:1, fills remaining space, clamped — no scroll */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            padding: '0 18px',
            overflow: 'hidden',
          }}
        >
          {post.summaryLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[100, 84, 64, 48].map((w, i) => (
                <span
                  key={i}
                  className='shimmer-bone'
                  style={{ width: `${w}%`, height: 10 }}
                />
              ))}
            </div>
          ) : (
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.68,
                color: '#475569',
                margin: '0 0 12px',
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.summary}
            </p>
          )}
        </div>

        {/* AD — fixed AD_H */}
        <div style={{ height: AD_H, flexShrink: 0, overflow: 'hidden' }}>
          <MockAd index={index} />
        </div>
      </div>
    </motion.article>
  );
}

const stackVariants = {
  enter: (dir) => ({
    y: dir === -1 ? '-100%' : '0%',
    zIndex: dir === -1 ? 20 : 10,
  }),
  center: {
    y: '0%',
    x: '0%',
    zIndex: 10,
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  },
  exit: (dir) => ({
    y: dir === 1 ? '-100%' : '0%',
    zIndex: dir === 1 ? 20 : 0,
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  }),
  // Card 0: peek UP to hint swipe-up navigation
  peekUp: {
    y: [0, -52, 0],
    zIndex: 10,
    transition: {
      duration: 1.0,
      times: [0, 0.45, 1],
      ease: 'easeInOut',
      delay: 1.0,
    },
  },
  // Card 1: peek LEFT to hint swipe-left = open article
  peekLeft: {
    x: [0, -52, 0],
    zIndex: 10,
    transition: {
      duration: 1.0,
      times: [0, 0.45, 1],
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
};

export default function MobileView({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [peekedUp, setPeekedUp] = useState(false);
  const [peekedLeft, setPeekedLeft] = useState(false);

  const goNext = () => {
    if (currentIndex < posts.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  };

  const getAnimate = () => {
    if (currentIndex === 0 && !peekedUp) return 'peekUp';
    if (currentIndex === 1 && !peekedLeft) return 'peekLeft';
    return 'center';
  };

  const handleAnimationComplete = (def) => {
    if (def === 'peekUp') setPeekedUp(true);
    if (def === 'peekLeft') setPeekedLeft(true);
  };

  return (
    <div id='mobile-feed' style={{ display: 'none' }}>
      <style>{`
        @media (max-width: 767px) { #mobile-feed { display: block !important; } }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 56,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          background: '#f8fafc',
        }}
      >
        {/* Card underneath */}
        {currentIndex + 1 < posts.length && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <MobileCard
              post={posts[currentIndex + 1]}
              index={currentIndex + 1}
              total={posts.length}
              isActive={false}
            />
          </div>
        )}

        {/* Active card */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={stackVariants}
            initial='enter'
            animate={getAnimate()}
            exit='exit'
            style={{ position: 'absolute', inset: 0 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <MobileCard
              post={posts[currentIndex]}
              index={currentIndex}
              total={posts.length}
              onSwipeUp={goNext}
              onSwipeDown={goPrev}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe UP tooltip — card 0, once */}
        {currentIndex === 0 && !peekedUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 1.0,
              duration: 1.2,
              times: [0, 0.15, 0.75, 1],
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 999,
                background: 'rgba(15,23,42,0.78)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 14 }}>👆</span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                }}
              >
                Swipe up for next
              </span>
            </div>
          </motion.div>
        )}

        {/* Swipe LEFT tooltip — card 1, once */}
        {currentIndex === 1 && !peekedLeft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 0.5,
              duration: 1.2,
              times: [0, 0.15, 0.75, 1],
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 999,
                background: 'rgba(217,4,41,0.88)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 14 }}>👈</span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                }}
              >
                Swipe left to read article
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
