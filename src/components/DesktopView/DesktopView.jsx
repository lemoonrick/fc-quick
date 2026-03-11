import NewsCard from '../NewsCard/NewsCard';
import styles from './DesktopView.module.css';

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DesktopView({ post, onNext, onPrev, current, total, animClass }) {
  const dotCount = Math.min(total, 10);

  return (
    <main className={styles.layout}>
      <div className={styles.stage}>

        <div className={styles.counter} aria-live="polite">
          <div className={styles.counterDots}>
            {Array.from({ length: dotCount }, (_, i) => (
              <span key={i} className={`${styles.dot} ${i === current - 1 ? styles.dotActive : ''}`} />
            ))}
          </div>
          <span className={styles.counterLabel}>{current} / {total}</span>
        </div>

        <div className={styles.cardStack}>
          <div className={styles.ghost2} aria-hidden="true" />
          <div className={styles.ghost1} aria-hidden="true" />
          <div className={styles.activeCard}>
            <NewsCard
              post={post}
              animClass={animClass}
              onSwipeLeft={onNext}
              onSwipeRight={onPrev}
            />
          </div>
        </div>

        <div className={styles.nav}>
          <button className={styles.arrow} onClick={onPrev} disabled={current === 1} aria-label="Previous">
            <ChevronLeft />
          </button>
          <button className={styles.arrow} onClick={onNext} disabled={current === total} aria-label="Next">
            <ChevronRight />
          </button>
        </div>

        <p className={styles.hint}>Drag the card · Arrow keys · Click buttons</p>
      </div>
    </main>
  );
}
