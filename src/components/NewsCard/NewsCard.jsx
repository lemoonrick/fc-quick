import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

const SWIPE_THRESHOLD = 88;

const CalIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    style={{ width: 13, height: 13, flexShrink: 0 }}
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
const ArrowIcon = () => (
  <svg viewBox='0 0 14 14' fill='none' style={{ width: 13, height: 13 }}>
    <path
      d='M2.5 7h9M8 3.5L11.5 7 8 10.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function NewsCard({ post, onSwipeLeft, onSwipeRight, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-15, 0, 15]);
  const prevOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1]);
  const nextOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0]);

  const onDragEnd = (_, info) => {
    const d = info.offset.x;
    if (d > SWIPE_THRESHOLD) {
      animate(x, 620, { duration: 0.26, ease: [0.55, 0, 1, 0.45] });
      setTimeout(() => onSwipeRight?.(), 260);
    } else if (d < -SWIPE_THRESHOLD) {
      animate(x, -620, { duration: 0.26, ease: [0.55, 0, 1, 0.45] });
      setTimeout(() => onSwipeLeft?.(), 260);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 32 });
    }
  };

  return (
    <motion.article
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={onDragEnd}
      style={{
        x,
        rotate,
        borderRadius: 16,
        background: '#fff',
        overflow: 'hidden',
        cursor: isTop ? 'grab' : 'default',
        userSelect: 'none',
        position: 'relative',
        boxShadow:
          '0 8px 32px rgba(79,70,229,0.1), 0 2px 8px rgba(15,23,42,0.05)',
      }}
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -6 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.7 }}
      whileHover={
        isTop
          ? {
              y: -5,
              boxShadow:
                '0 20px 48px rgba(79,70,229,0.14), 0 4px 12px rgba(15,23,42,0.07)',
              transition: { duration: 0.18 },
            }
          : {}
      }
    >
      {/* Swipe overlays */}
      <motion.div
        style={{
          opacity: prevOpacity,
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: 20,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            padding: '7px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Poppins, system-ui, sans-serif',
            background: 'rgba(13,148,136,0.12)',
            color: '#0d9488',
            border: '1.5px solid rgba(13,148,136,0.3)',
          }}
        >
          ← Prev
        </span>
      </motion.div>
      <motion.div
        style={{
          opacity: nextOpacity,
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 20,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            padding: '7px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Poppins, system-ui, sans-serif',
            background: 'rgba(239,68,68,0.1)',
            color: '#dc2626',
            border: '1.5px solid rgba(239,68,68,0.28)',
          }}
        >
          Next →
        </span>
      </motion.div>

      {/* Image */}
      <div
        style={{
          height: 280,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px 16px 0 0',
          background: '#dde3f0',
        }}
      >
        {post.image ? (
          <>
            {/* Blurred bg layer — same image, covers the letterbox gaps */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(18px) brightness(0.7) saturate(1.2)',
                transform: 'scale(1.1)', // prevents blur edge artifacts
              }}
            />
            {/* Main image — contain so nothing is cut off */}
            <img
              src={post.image}
              alt={post.title}
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
              style={{ width: 44, opacity: 0.2 }}
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
        {/* Gradient fade at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '28%',
            zIndex: 2,
            background:
              'linear-gradient(to top, rgba(255,255,255,0.88) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Verdict badge */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, zIndex: 10 }}>
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '20px 24px 22px',
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.38,
            letterSpacing: '-0.02em',
            color: '#0f172a',
            marginBottom: 12,
          }}
        >
          {post.title}
        </h2>

        <div style={{ marginBottom: 20 }}>
          {post.summaryLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[100, 85, 66].map((w, i) => (
                <span
                  key={i}
                  className='shimmer-bone'
                  style={{ width: `${w}%`, height: 11 }}
                />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13.5, lineHeight: 1.72, color: '#64748b' }}>
              {post.summary}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e8edf5',
            paddingTop: 16,
          }}
        >
          <time
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 500,
              color: '#94a3b8',
            }}
            dateTime={post.date}
          >
            <CalIcon />
            {formatDate(post.date)}
          </time>
          <motion.a
            href={post.link}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => e.stopPropagation()}
            whileHover={{ y: -2, boxShadow: '0 12px 28px rgba(79,70,229,0.3)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.14 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 22px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(135deg, #d90429, #9b031a)',
              boxShadow: '0 6px 18px rgba(217,4,41,0.32)',
              letterSpacing: '0.01em',
              textDecoration: 'none',
            }}
          >
            Read Article <ArrowIcon />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
