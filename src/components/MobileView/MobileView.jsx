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

/* ── Mock ads ── */
const MOCK_ADS = [
  {
    bg: '#101c33',
    logo: '🔐',
    brand: 'CYBERSHIELD VPN',
    headline: 'Browse Safely. Stay Anonymous.',
    sub: 'Protect yourself from fake news traps & phishing sites.',
    cta: 'Try Free',
    accent: '#f43f5e',
  },
  {
    bg: '#0f291e',
    logo: '📰',
    brand: 'NEWSGUARD PRO',
    headline: 'Know Before You Share.',
    sub: 'AI-powered credibility scores for every article you read.',
    cta: 'Get App',
    accent: '#10b981',
  },
  {
    bg: '#251438',
    logo: '🧠',
    brand: 'FACT IQ',
    headline: 'Quiz Your Media Literacy.',
    sub: '5 mins a day to spot misinformation like a pro.',
    cta: 'Start',
    accent: '#8b5cf6',
  },
  {
    bg: '#331c0e',
    logo: '📡',
    brand: 'TRUTHRADAR',
    headline: 'Real-Time Rumour Alerts.',
    sub: 'Get notified the moment a viral claim is fact-checked.',
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px 20px',
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ad.accent}15 0%, transparent 70%)`,
          bottom: -50,
          right: -50,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>{ad.logo}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.05em',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            {ad.brand}
          </span>
        </div>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'Poppins, system-ui, sans-serif',
          }}
        >
          Sponsored
        </span>
      </div>

      <h3
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.25,
          marginBottom: 4,
          fontFamily: 'Poppins, system-ui, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {ad.headline}
      </h3>
      <p
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.4,
          marginBottom: 12,
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        {ad.sub}
      </p>

      <div>
        <button
          style={{
            padding: '6px 20px',
            borderRadius: 999,
            background: ad.accent,
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Poppins, system-ui, sans-serif',
          }}
        >
          {ad.cta}
        </button>
      </div>
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

/* ── Gesture tooltip ── */
function GestureTooltip({ visible, text, icon }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            bottom: 160,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 18px',
            borderRadius: 999,
            background: 'rgba(15,23,42,0.82)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            {text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Single card ── */
function MobileCard({ post, index, total, onSwipeUp, onSwipeDown, isActive }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mapped to negative X values for left swipe
  const articleOpacity = useTransform(x, [0, -80], [0, 1]);
  const articleX = useTransform(x, [0, -120], ['8px', '0px']);

  const [showSwipeUpHint, setShowSwipeUpHint] = useState(false);
  const [showSwipeLeftHint, setShowSwipeLeftHint] = useState(false);

  const handleDrag = (e, info) => {
    // Check for negative X to trigger the left swipe hint
    if (info.offset.x < -30) setShowSwipeLeftHint(true);
    else setShowSwipeLeftHint(false);

    if (info.offset.y < -30) setShowSwipeUpHint(true);
    else setShowSwipeUpHint(false);
  };

  const handleDragEnd = (e, info) => {
    setShowSwipeUpHint(false);
    setShowSwipeLeftHint(false);

    const { offset, velocity } = info;
    const threshold = 60;

    // Trigger article open on deep left swipe
    if (offset.x < -threshold || velocity.x < -400) {
      window.open(post.link, '_blank');
    } else if (offset.y < -threshold || velocity.y < -400) {
      if (onSwipeUp) onSwipeUp();
    } else if (offset.y > threshold || velocity.y > 400) {
      if (onSwipeDown) onSwipeDown();
    }
  };

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
          borderRadius: 0,
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            x: articleX,
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
        </motion.div>
      </motion.div>

      <GestureTooltip
        visible={showSwipeUpHint}
        text='Swipe up for next story'
        icon='👆'
      />
      <GestureTooltip
        visible={showSwipeLeftHint}
        text='Release to open article'
        icon='👈'
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            flex: '0 1 42%',
            position: 'relative',
            overflow: 'hidden',
            background: '#e8edf5',
            minHeight: '30%',
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
                background: '#e8edf5',
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
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '25%',
              zIndex: 2,
              background:
                'linear-gradient(to top, rgba(255,255,255,1), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }}
          >
            <VerdictBadge
              categories={post.categories}
              acfVerdict={post.acfVerdict}
            />
          </div>
        </div>

        <div
          style={{
            flex: '1 1 58%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            paddingBottom: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px 6px',
              flexShrink: 0,
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
                width: 34,
                height: 34,
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

          <h2
            style={{
              fontSize: 'clamp(15px, 4vw, 18px)',
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: '-0.015em',
              color: '#0f172a',
              margin: '0 18px 8px',
              flexShrink: 0,
            }}
          >
            {post.title}
          </h2>

          <div
            style={{
              flex: '1 1 auto',
              padding: '0 18px 12px',
              overflowY: 'auto',
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
                  fontSize: 'clamp(13px, 3.5vw, 15px)',
                  lineHeight: 1.6,
                  color: '#475569',
                  margin: 0,
                }}
              >
                {post.summary}
              </p>
            )}
          </div>

          <div
            style={{
              flex: '0 1 auto',
              minHeight: 120,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <MockAd index={index} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Animation Variants ── */
const stackVariants = {
  enter: (direction) => ({
    y: direction === -1 ? '-100%' : '0%',
    zIndex: direction === -1 ? 20 : 10,
  }),
  center: {
    y: '0%',
    x: '0%',
    zIndex: 10,
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  },
  exit: (direction) => ({
    y: direction === 1 ? '-100%' : '0%',
    zIndex: direction === 1 ? 20 : 0,
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  }),
  peek: {
    y: [0, -50, 0, 0, 0],
    x: [0, 0, 0, -50, 0], // Wiggles left now
    zIndex: 10,
    transition: {
      duration: 2,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: 'easeInOut',
      delay: 0.8,
    },
  },
};

/* ── Main Feed ── */
export default function MobileView({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [peeked, setPeeked] = useState(false);

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

  return (
    <div id='mobile-feed' style={{ display: 'none' }}>
      <style>{`
        @media (max-width: 767px) { #mobile-feed { display: block !important; } }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
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

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={stackVariants}
            initial='enter'
            animate={!peeked && currentIndex === 0 ? 'peek' : 'center'}
            exit='exit'
            style={{ position: 'absolute', inset: 0 }}
            onAnimationComplete={(definition) => {
              if (definition === 'peek') setPeeked(true);
            }}
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

        {/* Syncing tooltips with the peek sequence */}
        {!peeked && currentIndex === 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.8, duration: 1, times: [0, 0.2, 0.8, 1] }}
              style={{
                position: 'absolute',
                bottom: 170,
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
                  gap: 7,
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.8, duration: 1, times: [0, 0.2, 0.8, 1] }}
              style={{
                position: 'absolute',
                bottom: 170,
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
                  gap: 7,
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
          </>
        )}
      </div>
    </div>
  );
}
