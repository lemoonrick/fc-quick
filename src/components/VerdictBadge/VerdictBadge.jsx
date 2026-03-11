import { getVerdict } from '../../utils/format';
import styles from './VerdictBadge.module.css';

export default function VerdictBadge({ categories }) {
  const verdict = getVerdict(categories);
  if (!verdict) return null;

  return (
    <span className={`${styles.badge} ${styles[verdict.cssClass.replace('verdict--', '')]}`}>
      <span className={styles.icon}>{verdict.icon}</span>
      {verdict.label}
    </span>
  );
}
