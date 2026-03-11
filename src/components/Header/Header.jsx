import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoFc}>FC</span>
        <span className={styles.logoDivider} />
        <span className={styles.logoQuick}>Quick</span>
      </div>
      <span className={styles.tagline}>Fact checks, fast</span>
    </header>
  );
}
