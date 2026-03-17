import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';
import './DesktopView.css';

/* ── Ambient Background Floaters ── */
const FloaterArticleCard = () => (
  <div
    style={{
      width: 230,
      borderRadius: 14,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 8px 28px rgba(15,23,42,0.1)',
      border: '1px solid #e2e8f0',
      fontFamily: 'Poppins, system-ui, sans-serif',
    }}
  >
    <div
      style={{
        height: 88,
        background: 'linear-gradient(135deg, #c7d2fe, #a5b4fc)',
      }}
    />
    <div
      style={{
        padding: '12px 14px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <div
        style={{
          height: 9,
          borderRadius: 99,
          background: '#e2e8f0',
          width: '88%',
        }}
      />
      <div
        style={{
          height: 9,
          borderRadius: 99,
          background: '#e2e8f0',
          width: '70%',
        }}
      />
      <div
        style={{
          height: 9,
          borderRadius: 99,
          background: '#eef2f7',
          width: '52%',
        }}
      />
      <div
        style={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            height: 7,
            width: 48,
            borderRadius: 99,
            background: '#e2e8f0',
          }}
        />
        <div
          style={{
            height: 22,
            width: 70,
            borderRadius: 99,
            background: 'linear-gradient(135deg, #4f46e5, #3730a3)',
          }}
        />
      </div>
    </div>
  </div>
);

const VerdictBadgeStack = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'Poppins, system-ui, sans-serif',
    }}
  >
    {[
      {
        label: 'False',
        bg: 'rgba(239,68,68,0.1)',
        color: '#dc2626',
        border: 'rgba(239,68,68,0.25)',
      },
      {
        label: 'Misleading',
        bg: 'rgba(245,158,11,0.1)',
        color: '#d97706',
        border: 'rgba(245,158,11,0.25)',
      },
      {
        label: 'Verified ✓',
        bg: 'rgba(13,148,136,0.1)',
        color: '#0d9488',
        border: 'rgba(13,148,136,0.25)',
      },
    ].map(({ label, bg, color, border }) => (
      <span
        key={label}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 13px',
          borderRadius: 999,
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: '0.02em',
          background: bg,
          color,
          border: `1px solid ${border}`,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 7 }}>●</span>
        {label}
      </span>
    ))}
  </div>
);

const FactCheckStamp = ({ verdict, color }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'Poppins, system-ui, sans-serif',
    }}
  >
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {verdict === 'FALSE' ? (
        <svg viewBox='0 0 24 24' fill='none' style={{ width: 24 }}>
          <path
            d='M6 6l12 12M6 18L18 6'
            stroke={color}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
        </svg>
      ) : (
        <svg viewBox='0 0 24 24' fill='none' style={{ width: 24 }}>
          <path
            d='M5 13l4 4L19 7'
            stroke={color}
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </div>
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {verdict}
    </span>
  </div>
);

const MiniFactCard = () => (
  <div
    style={{
      width: 190,
      borderRadius: 12,
      background: '#fff',
      padding: '13px 15px',
      boxShadow: '0 6px 20px rgba(15,23,42,0.08)',
      border: '1px solid #e2e8f0',
      fontFamily: 'Poppins, system-ui, sans-serif',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          background: 'linear-gradient(135deg,#4f46e5,#3730a3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox='0 0 12 12' fill='none' style={{ width: 10 }}>
          <circle cx='6' cy='6' r='4' stroke='white' strokeWidth='1.2' />
          <path
            d='M6 4v2l1 1'
            stroke='white'
            strokeWidth='1.2'
            strokeLinecap='round'
          />
        </svg>
      </div>
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#4f46e5',
        }}
      >
        Fact Check
      </span>
    </div>
    <div
      style={{
        height: 8,
        borderRadius: 99,
        background: '#e2e8f0',
        width: '92%',
        marginBottom: 5,
      }}
    />
    <div
      style={{
        height: 8,
        borderRadius: 99,
        background: '#e2e8f0',
        width: '76%',
        marginBottom: 5,
      }}
    />
    <div
      style={{
        height: 8,
        borderRadius: 99,
        background: '#eef2f7',
        width: '58%',
        marginBottom: 12,
      }}
    />
    <div style={{ display: 'flex', gap: 6 }}>
      <div
        style={{
          height: 20,
          width: 52,
          borderRadius: 99,
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      />
      <div
        style={{
          height: 20,
          width: 52,
          borderRadius: 99,
          background: 'rgba(13,148,136,0.1)',
          border: '1px solid rgba(13,148,136,0.2)',
        }}
      />
    </div>
  </div>
);

const SearchCard = () => (
  <div
    style={{
      width: 155,
      borderRadius: 12,
      background: '#fff',
      padding: '14px',
      boxShadow: '0 4px 16px rgba(15,23,42,0.07)',
      border: '1px solid #e2e8f0',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 26, marginBottom: 10 }}>🔍</div>
    <div
      style={{
        height: 8,
        borderRadius: 99,
        background: '#e2e8f0',
        width: '85%',
        margin: '0 auto 5px',
      }}
    />
    <div
      style={{
        height: 8,
        borderRadius: 99,
        background: '#eef2f7',
        width: '62%',
        margin: '0 auto',
      }}
    />
  </div>
);

const FLOATERS = [
  {
    id: 'article-tr',
    C: FloaterArticleCard,
    pos: { top: '9%', right: '4%' },
    rotate: 7,
    floatY: 12,
    delay: 0.1,
    opacity: 0.18,
  },
  {
    id: 'badges-tl',
    C: VerdictBadgeStack,
    pos: { top: '16%', left: '3%' },
    rotate: -5,
    floatY: 9,
    delay: 0.4,
    opacity: 0.2,
  },
  {
    id: 'stamp-false',
    C: () => <FactCheckStamp verdict='FALSE' color='#ef4444' />,
    pos: { bottom: '20%', right: '3%' },
    rotate: 11,
    floatY: 8,
    delay: 0.7,
    opacity: 0.18,
  },
  {
    id: 'mini-fact-bl',
    C: MiniFactCard,
    pos: { bottom: '10%', left: '2%' },
    rotate: -7,
    floatY: 11,
    delay: 0.2,
    opacity: 0.16,
  },
  {
    id: 'stamp-ok',
    C: () => <FactCheckStamp verdict='VERIFIED' color='#0d9488' />,
    pos: { top: '52%', right: '2%' },
    rotate: -9,
    floatY: 7,
    delay: 0.9,
    opacity: 0.16,
  },
  {
    id: 'search-ml',
    C: SearchCard,
    pos: { top: '55%', left: '1.5%' },
    rotate: 5,
    floatY: 10,
    delay: 1.1,
    opacity: 0.14,
  },
];

function BgFloaters() {
  return (
    <div
      className='dv-bg-floaters'
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
      aria-hidden='true'
    >
      {FLOATERS.map(({ id, C, pos, rotate, floatY, delay, opacity }) => (
        <motion.div
          key={id}
          style={{ position: 'absolute', ...pos, rotate, opacity: 0 }}
          animate={{ opacity, y: [0, -floatY, 0] }}
          transition={{
            opacity: { delay, duration: 1, ease: 'easeOut' },
            y: {
              delay,
              duration: 4.5 + delay * 0.8,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          }}
        >
          <C />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Icons ── */
const CalIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    style={{ width: 15, height: 15, flexShrink: 0 }}
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
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 15, height: 15 }}>
    <path
      d='M11 3h6v6M17 3l-8 8M8 5H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ChevL = () => (
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 26, height: 26 }}>
    <path
      d='M13 4L7 10l6 6'
      stroke='currentColor'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ChevR = () => (
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 26, height: 26 }}>
    <path
      d='M7 4l6 6-6 6'
      stroke='currentColor'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/* ── Animation Variants ── */
const swipeVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    rotate: direction > 0 ? 12 : -12,
    scale: 0.85,
  }),
  center: {
    zIndex: 2,
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 28, mass: 1.2 },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 400 : -400,
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.2 },
  }),
};

/* ── MAIN COMPONENT ── */
export default function DesktopView({
  post,
  onNext,
  onPrev,
  current,
  total,
  todaysCount = 0,
  isLoadingMore = false, // <-- This is what I missed!
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);

  const [tuple, setTuple] = useState([current, 0]);

  if (tuple[0] !== current) {
    setTuple([current, current > tuple[0] ? 1 : -1]);
  }
  const direction = tuple[1];

  async function handleShare() {
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

  if (!post) return null;

  return (
    <>
      <BgFloaters />
      <main className='dv-wrapper'>
        {/* The Auto-Fading Today's Count Badge */}
        <AnimatePresence>
          {todaysCount > 0 && isVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
              exit={{
                height: 0,
                opacity: 0,
                marginBottom: 0,
                transition: {
                  height: { duration: 0.4, delay: 0.1 },
                  opacity: { duration: 0.3 },
                },
              }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div
                className='dv-todays-count'
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                <span style={{ fontSize: 16 }}>⚡</span>
                {todaysCount} new{' '}
                {todaysCount === 1 ? 'fact-check' : 'fact-checks'} today
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='dv-layout-row'>
          <motion.button
            className='dv-nav-btn'
            onClick={onPrev}
            disabled={current === 1}
            whileHover={current !== 1 ? { scale: 1.1, y: -2 } : {}}
            whileTap={current !== 1 ? { scale: 0.95 } : {}}
            title='Previous (Left Arrow Key)'
          >
            <ChevL />
          </motion.button>

          <div className='dv-deck-container'>
            <div className='dv-ghost-1' />
            <div className='dv-ghost-2' />

            <div style={{ position: 'relative', zIndex: 3 }}>
              <AnimatePresence
                initial={false}
                custom={direction}
                mode='popLayout'
              >
                <motion.div
                  key={post.id}
                  custom={direction}
                  variants={swipeVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='dv-card'
                >
                  {/* Image Section (Left) */}
                  <div className='dv-image-area'>
                    <div className='dv-blurred-bg-container'>
                      {post.image && (
                        <div
                          className='dv-blurred-bg'
                          style={{ backgroundImage: `url(${post.image})` }}
                        />
                      )}
                    </div>

                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        draggable={false}
                        className='dv-main-img'
                      />
                    ) : (
                      <div
                        style={{ margin: 'auto', fontSize: 48, opacity: 0.2 }}
                      >
                        📰
                      </div>
                    )}

                    <div
                      style={{
                        position: 'absolute',
                        top: 24,
                        left: 24,
                        zIndex: 20,
                      }}
                    >
                      <VerdictBadge
                        categories={post.categories}
                        acfVerdict={post.acfVerdict}
                      />
                    </div>

                    <button
                      onClick={handleShare}
                      className='dv-share-btn'
                      title='Share Article'
                    >
                      <ShareIcon />
                    </button>
                  </div>

                  {/* Text Content Section (Right) */}
                  <div className='dv-content'>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13.5,
                        color: '#64748b',
                        fontWeight: 500,
                        marginBottom: 14,
                      }}
                    >
                      <CalIcon /> {formatDate(post.date)}
                    </div>

                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.4,
                        marginBottom: 16,
                      }}
                    >
                      {post.title}
                    </h2>

                    <div
                      style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: 28,
                        paddingRight: 8,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 15.5,
                          lineHeight: 1.7,
                          color: '#334155',
                          margin: 0,
                        }}
                      >
                        {post.summary}
                      </p>
                    </div>

                    <a
                      href={post.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '16px 20px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        background:
                          'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                        color: '#ffffff',
                        fontSize: 15,
                        fontWeight: 600,
                        boxShadow: '0 6px 16px rgba(220, 38, 38, 0.25)',
                        transition: 'opacity 0.2s',
                        marginTop: 'auto',
                      }}
                    >
                      Read Full Article <ExternalIcon />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            className='dv-nav-btn'
            onClick={onNext}
            disabled={current === total && !isLoadingMore}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title='Next (Right Arrow Key)'
          >
            {isLoadingMore ? <div className='mini-spinner' /> : <ChevR />}
          </motion.button>
        </div>

        <p className='dv-controls-hint'>
          Use Arrow Keys or Nav Buttons to browse
        </p>
      </main>
    </>
  );
}
