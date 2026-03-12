import { motion, AnimatePresence } from 'framer-motion';
import NewsCard from '../NewsCard/NewsCard';

/* ─────────────────────────────────────────────────────────────
   BG FLOATERS
   Floating fact-check UI fragments — like the STS phone mockup.
   Indigo/teal color scheme, higher opacity so they're actually visible.
───────────────────────────────────────────────────────────── */

const ArticleCard = () => (
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

/* floater config: component, position, rotation, float amplitude, delay, opacity */
const FLOATERS = [
  {
    id: 'article-tr',
    C: ArticleCard,
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
      className='bg-floaters-wrap'
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
      aria-hidden='true'
    >
      <style>{`@media (max-width: 767px) { .bg-floaters-wrap { display: none !important; } }`}</style>
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

/* ── Progress pill dots ── */
function ProgressTrack({ current, total }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginBottom: 28,
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {Array.from({ length: Math.min(total, 10) }, (_, i) => (
          <motion.span
            key={i}
            animate={{
              width: i === current - 1 ? 24 : 7,
              background: i === current - 1 ? '#4f46e5' : '#c7d2fe',
            }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              display: 'inline-block',
              height: 7,
              borderRadius: 999,
              background: '#c7d2fe',
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '0.05em',
        }}
      >
        {current} of {total}
      </span>
    </div>
  );
}

/* ── Nav button ── */
const ChevL = () => (
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 20, height: 20 }}>
    <path
      d='M13 4L7 10l6 6'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const ChevR = () => (
  <svg viewBox='0 0 20 20' fill='none' style={{ width: 20, height: 20 }}>
    <path
      d='M7 4l6 6-6 6'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

function NavBtn({ onClick, disabled, children, label }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      whileHover={
        !disabled
          ? {
              scale: 1.08,
              y: -2,
              boxShadow: '0 16px 40px rgba(79,70,229,0.18)',
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.94 } : {}}
      transition={{ duration: 0.13 }}
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1.5px solid #c7d2fe',
        background: '#fff',
        boxShadow: '0 4px 14px rgba(79,70,229,0.1)',
        color: '#4f46e5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </motion.button>
  );
}

/* ── Ghost card deck ── */
function GhostDeck() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(79,70,229,0.07)',
          transform: 'translateY(20px) rotate(-2.5deg) scale(0.965)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 6px 24px rgba(79,70,229,0.09)',
          transform: 'translateY(11px) rotate(2deg) scale(0.982)',
          opacity: 0.75,
        }}
      />
    </>
  );
}

/* ── MAIN ── */
export default function DesktopView({ post, onNext, onPrev, current, total }) {
  if (!post) return null;
  return (
    <>
      <BgFloaters />
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          paddingTop: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '72px 24px 48px',
        }}
        className='desktop-only'
      >
        <style>{`
          @media (max-width: 767px) { .desktop-only { display: none !important; } }
        `}</style>

        <div style={{ width: '100%', maxWidth: 600 }}>
          <ProgressTrack current={current} total={total} />

          <div style={{ position: 'relative', paddingBottom: 22 }}>
            <GhostDeck />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <AnimatePresence mode='wait'>
                <NewsCard
                  key={post.id}
                  post={post}
                  isTop
                  onSwipeLeft={onNext}
                  onSwipeRight={onPrev}
                />
              </AnimatePresence>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginTop: 28,
            }}
          >
            <NavBtn onClick={onPrev} disabled={current === 1} label='Previous'>
              <ChevL />
            </NavBtn>
            <NavBtn onClick={onNext} disabled={current === total} label='Next'>
              <ChevR />
            </NavBtn>
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: 11.5,
              color: '#94a3b8',
              marginTop: 10,
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            Drag card · Arrow keys · Click buttons
          </p>
        </div>
      </main>
    </>
  );
}
