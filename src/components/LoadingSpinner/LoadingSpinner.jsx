import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ message = 'Loading fact-checks...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
