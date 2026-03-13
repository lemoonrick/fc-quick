import {
  motion,
  useMotionValue,
  useTransform,
  useWillChange,
  animate,
} from 'framer-motion';
import { useState } from 'react';
import { formatDate, getVerdict } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

const SWIPE_THRESHOLD = 88;

const VERDICT_ACCENT = {
  'verdict--false': {
    bar: '#ef4444',
    glow: 'rgba(239,68,68,0.1)',
    label: '#ef4444',
  },
  'verdict--misleading': {
    bar: '#f59e0b',
    glow: 'rgba(245,158,11,0.08)',
    label: '#f59e0b',
  },
  'verdict--true': {
    bar: '#10b981',
    glow: 'rgba(16,185,129,0.1)',
    label: '#10b981',
  },
};
const DEFAULT_ACCENT = {
  bar: '#6366f1',
  glow: 'rgba(99,102,241,0.1)',
  label: '#6366f1',
};

function getAccent(post) {
  const v = getVerdict(post.categories, post.acfVerdict);
  return v ? (VERDICT_ACCENT[v.cssClass] ?? DEFAULT_ACCENT) : DEFAULT_ACCENT;
}

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
    }
  } catch (e) {}
}

export default function NewsCard({ post, onSwipeLeft, onSwipeRight, isTop }) {
  const x = useMotionValue(0);
  const willChange = useWillChange();
  // Tighter rotation range = less exaggerated, smoother feel
  const rotate = useTransform(x, [-300, 0, 300], [-10, 0, 10]);
  const prevOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1]);
  const nextOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const accent = getAccent(post);

  const onDragStart = () => setIsDragging(true);
  const onDragEnd = (_, info) => {
    setIsDragging(false);
    const d = info.offset.x;
    if (d > SWIPE_THRESHOLD) {
      animate(x, 560, { duration: 0.22, ease: [0.4, 0, 0.6, 1] });
      setTimeout(() => onSwipeRight?.(), 220);
    } else if (d < -SWIPE_THRESHOLD) {
      animate(x, -560, { duration: 0.22, ease: [0.4, 0, 0.6, 1] });
      setTimeout(() => onSwipeLeft?.(), 220);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 600, damping: 40 });
    }
  };

  return (
    <motion.article
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        x,
        rotate,
        willChange,
        borderRadius: 20,
        background: '#fafafa',
        overflow: 'hidden',
        cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        position: 'relative',
        boxShadow:
          '0 8px 40px rgba(79,70,229,0.12), 0 2px 8px rgba(15,23,42,0.05)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Verdict bar */}
      <div
        style={{
          height: 4,
          background: accent.bar,
          boxShadow: `0 0 14px ${accent.bar}60`,
        }}
      />

      {/* Swipe hints */}
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
            padding: '8px 18px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'Poppins, system-ui, sans-serif',
            background: 'rgba(13,148,136,0.14)',
            color: '#0d9488',
            border: '1.5px solid rgba(13,148,136,0.32)',
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
            padding: '8px 18px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'Poppins, system-ui, sans-serif',
            background: 'rgba(239,68,68,0.12)',
            color: '#dc2626',
            border: '1.5px solid rgba(239,68,68,0.3)',
          }}
        >
          Next →
        </span>
      </motion.div>

      {/* Image */}
      <div
        style={{
          height: 268,
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
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(1.02) contrast(1.05)',
              }}
            />
            {/* Inset vignette */}
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
        <div
          style={{ position: 'absolute', bottom: 14, right: 16, zIndex: 10 }}
        >
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '18px 22px 20px',
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

        {/* Summary zone — no "Brief" label */}
        <div
          style={{
            background: `linear-gradient(135deg, ${accent.glow}, rgba(248,250,252,0.6))`,
            border: `1px solid ${accent.bar}20`,
            borderLeft: `3px solid ${accent.bar}`,
            borderRadius: '0 12px 12px 0',
            padding: '11px 14px',
            marginBottom: 18,
          }}
        >
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
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.72,
                color: '#475569',
                margin: 0,
              }}
            >
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
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(post);
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(241,245,249,0.9)',
                border: `1px solid ${accent.bar}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accent.bar,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = accent.glow)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'rgba(241,245,249,0.9)')
              }
            >
              <ShareIcon />
            </button>
          </div>
          <a
            href={post.link}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => e.stopPropagation()}
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
              boxShadow: '0 4px 16px rgba(217,4,41,0.3)',
              letterSpacing: '0.01em',
              textDecoration: 'none',
              transition: 'transform 0.14s, box-shadow 0.14s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 10px 28px rgba(217,4,41,0.38)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(217,4,41,0.3)';
            }}
          >
            Read Article <ArrowIcon />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
