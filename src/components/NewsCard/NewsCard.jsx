import { useRef, useState } from 'react';
import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';
import CategoryPills from '../CategoryPills/CategoryPills';
import SummaryText from '../SummaryText/SummaryText';
import styles from './NewsCard.module.css';

const CalendarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Tinder-like drag physics constants
const SWIPE_THRESHOLD = 100;  // px — how far to drag before it commits
const ROTATION_FACTOR = 0.08; // degrees per px of horizontal drag

export default function NewsCard({ post, animClass, onSwipeLeft, onSwipeRight }) {
  const cardRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, x: 0, y: 0 });
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const rotation = dragX * ROTATION_FACTOR;
  const leftOpacity  = Math.max(0, Math.min(1, -dragX / SWIPE_THRESHOLD));
  const rightOpacity = Math.max(0, Math.min(1,  dragX / SWIPE_THRESHOLD));
  const isPastThreshold = Math.abs(dragX) > SWIPE_THRESHOLD;

  // ---- Pointer events (works for mouse + touch) ----
  const onPointerDown = (e) => {
    // Don't hijack link clicks
    if (e.target.closest('a')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, x: 0, y: 0 };
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.x = dx;
    setDragX(dx);
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);

    const dx = dragRef.current.x;
    if (dx < -SWIPE_THRESHOLD && onSwipeLeft)  { onSwipeLeft();  return; }
    if (dx >  SWIPE_THRESHOLD && onSwipeRight) { onSwipeRight(); return; }
    // Snap back
    setDragX(0);
  };

  // Build inline transform — CSS class handles enter/exit animations,
  // but while dragging we override with direct transform
  const dragStyle = isDragging ? {
    transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
    transition: 'none',
    cursor: 'grabbing',
  } : {};

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${animClass ? styles[animClass] : ''}`}
      style={dragStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Swipe overlays — fade in as you drag */}
      <div className={styles.overlayNext} style={{ opacity: rightOpacity }}>
        <span className={styles.overlayLabel}>NEXT →</span>
      </div>
      <div className={styles.overlayPrev} style={{ opacity: leftOpacity }}>
        <span className={styles.overlayLabel}>← PREV</span>
      </div>

      {/* Image */}
      <div className={styles.imageWrap}>
        {post.image ? (
          <img
            className={styles.image}
            src={post.image}
            alt={post.title}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#F0EDEA"/>
              <path d="M8 28l8-8 6 6 4-4 6 6" stroke="#C4BDB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="16" r="3" fill="#C4BDB8"/>
            </svg>
          </div>
        )}
        <div className={styles.imageGradient} />
      </div>

      {/* Body */}
      <div className={styles.body}>
        <VerdictBadge categories={post.categories} />
        <h2 className={styles.title}>{post.title}</h2>
        <CategoryPills categories={post.categories} />
        <SummaryText post={post} />

        <div className={styles.footer}>
          <time className={styles.date} dateTime={post.date}>
            <CalendarIcon />
            {formatDate(post.date)}
          </time>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readBtn}
          >
            Read Article <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
