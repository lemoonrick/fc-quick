import styles from './SummaryText.module.css';

export default function SummaryText({ post, className = '' }) {
  if (post.summaryLoading) {
    return (
      <div className={`${styles.skeleton} ${className}`} aria-label="Loading summary">
        <span className={styles.bone} style={{ width: '100%' }} />
        <span className={styles.bone} style={{ width: '88%' }} />
        <span className={styles.bone} style={{ width: '68%' }} />
      </div>
    );
  }

  return (
    <p className={`${styles.summary} ${className}`}>
      {post.summary}
    </p>
  );
}
