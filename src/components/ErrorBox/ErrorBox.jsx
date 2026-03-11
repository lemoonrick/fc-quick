import styles from './ErrorBox.module.css';

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box} role="alert">
        <span className={styles.emoji}>⚠️</span>
        <h3 className={styles.title}>Couldn&apos;t load articles</h3>
        <p className={styles.detail}>{message}</p>
        <p className={styles.hint}>
          If you&apos;re running locally, make sure the WordPress site allows
          CORS from your dev URL, or that the Vite proxy is configured correctly.
        </p>
        {onRetry && (
          <button className={styles.retryBtn} onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
