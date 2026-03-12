import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';

const CalIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    style={{ width: 12, height: 12, flexShrink: 0 }}
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

/* ── Scroll hint ── */
function ScrollHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const hide = () => setVisible(false);
    const timer = setTimeout(hide, 3500);
    window.addEventListener('scroll', hide, { passive: true, once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', hide);
    };
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ delay: 1.2, duration: 0.35 }}
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px',
              borderRadius: 999,
              background: 'rgba(15,23,42,0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, 3, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    viewBox='0 0 12 7'
                    fill='none'
                    style={{ width: 11, height: 7 }}
                  >
                    <path
                      d='M1 1l5 5 5-5'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'Poppins, system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Swipe for next
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Single card = exactly one screen ── */
function MobileCard({ post, index, total }) {
  const isFirst = index === 0;
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={isFirst ? { opacity: 1, y: [0, 0, -28, 0] } : { opacity: 1 }}
      transition={
        isFirst
          ? {
              opacity: { duration: 0.2 },
              y: {
                delay: 1.6,
                duration: 1.1,
                times: [0, 0.3, 0.65, 1],
                ease: ['easeIn', 'easeOut', 'easeInOut'],
              },
            }
          : { delay: index * 0.03, duration: 0.2 }
      }
      style={{
        height: 'calc(100dvh - 56px)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        flexShrink: 0,
        width: '100%',
        fontFamily: 'Poppins, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Image — top 44% of screen ── */}
      <div
        style={{
          height: '44%',
          flexShrink: 0,
          position: 'relative',
          background: '#dde3f0',
          overflow: 'hidden',
        }}
      >
        {post.image ? (
          <>
            {/* Blurred bg fill */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(16px) brightness(0.65) saturate(1.2)',
                transform: 'scale(1.1)',
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
        {/* Thin bottom fade — just enough for badge legibility */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            zIndex: 2,
            background:
              'linear-gradient(to top, rgba(255,255,255,0.75), transparent)',
            pointerEvents: 'none',
          }}
        />
        {/* Verdict */}
        <div
          style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }}
        >
          <VerdictBadge
            categories={post.categories}
            acfVerdict={post.acfVerdict}
          />
        </div>
      </div>

      {/* ── Content — bottom 56% ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '18px 20px 0',
          overflow: 'hidden',
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.38,
            letterSpacing: '-0.015em',
            color: '#0f172a',
            marginBottom: 10,
            flexShrink: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h2>

        {/* Summary — fills remaining space, clamps to fit */}
        <div style={{ flex: 1, overflow: 'hidden', marginBottom: 0 }}>
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
                color: '#64748b',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.summary}
            </p>
          )}
        </div>

        {/* ── Thick gradient footer bar ── */}
        <div
          style={{
            flexShrink: 0,
            marginTop: 'auto',
            marginLeft: -20,
            marginRight: -20,
            padding: '20px 20px 24px',
            background:
              'linear-gradient(135deg, #d90429 0%, #ef233c 50%, #ff6b7a 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative blur orb */}
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              top: -40,
              right: -20,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              bottom: -20,
              left: 10,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            {/* Date + counter */}
            <div>
              <time
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: 3,
                }}
                dateTime={post.date}
              >
                <CalIcon style={{ color: 'rgba(255,255,255,0.7)' }} />
                {formatDate(post.date)}
              </time>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.06em',
                }}
              >
                {index + 1} / {total}
              </span>
            </div>

            {/* Read button */}
            <motion.a
              href={post.link}
              target='_blank'
              rel='noopener noreferrer'
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '12px 22px',
                borderRadius: 999,
                background: '#fff',
                color: '#d90429',
                fontSize: 13.5,
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Read Article
              <svg
                viewBox='0 0 12 12'
                fill='none'
                style={{ width: 12, height: 12 }}
              >
                <path
                  d='M2 6h8M6.5 3L10 6l-3.5 3'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </motion.a>
          </div>

          {/* Progress bar */}
          {/* <div
            style={{
              height: 4,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / total) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '100%', background: '#fff', borderRadius: 999 }}
            />
          </div> */}
        </div>
      </div>
    </motion.article>
  );
}

export default function MobileView({ posts }) {
  return (
    <>
      <div className='mobile-feed' id='mobile-feed' style={{ display: 'none' }}>
        <style>{`@media (max-width: 767px) { #mobile-feed { display: block !important; } }`}</style>
        {posts.map((post, i) => (
          <MobileCard
            key={post.id}
            post={post}
            index={i}
            total={posts.length}
          />
        ))}
      </div>
      <div style={{ display: 'none' }} id='scroll-hint-wrap'>
        <style>{`@media (max-width: 767px) { #scroll-hint-wrap { display: block !important; } }`}</style>
        <ScrollHint />
      </div>
    </>
  );
}
