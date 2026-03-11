import { formatDate } from '../../utils/format';
import VerdictBadge from '../VerdictBadge/VerdictBadge';
import CategoryPills from '../CategoryPills/CategoryPills';
import SummaryText from '../SummaryText/SummaryText';
import styles from './MobileView.module.css';

const CalendarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function MobileView({ posts }) {
  return (
    <main className={styles.layout}>
      <div className={styles.feed} role="feed" aria-label="Fact-check articles">
        {posts.map((post, i) => (
          <article key={post.id} className={styles.card} aria-label={`Article ${i + 1}`}>
            <div className={styles.imageWrap}>
              {post.image ? (
                <img className={styles.image} src={post.image} alt={post.title} loading="lazy" />
              ) : (
                <div className={styles.imagePlaceholder} aria-hidden="true">📰</div>
              )}
              <div className={styles.imageGradient} />
            </div>

            <div className={styles.content}>
              <VerdictBadge categories={post.categories} />
              <h2 className={styles.title}>{post.title}</h2>
              <CategoryPills categories={post.categories} />
              <SummaryText post={post} />
            </div>

            <div className={styles.footer}>
              <time className={styles.date} dateTime={post.date}>
                <CalendarIcon />
                {formatDate(post.date)}
              </time>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles.readBtn}>
                Read More <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
