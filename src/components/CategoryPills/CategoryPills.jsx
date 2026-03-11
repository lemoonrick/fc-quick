import { getDisplayCategories } from '../../utils/format';
import styles from './CategoryPills.module.css';

export default function CategoryPills({ categories, max = 4 }) {
  const display = getDisplayCategories(categories, max);
  if (!display.length) return null;

  return (
    <div className={styles.pills}>
      {display.map((cat) => (
        <span key={cat.id} className={styles.pill}>
          {cat.name}
        </span>
      ))}
    </div>
  );
}
