import { getVerdict } from '../../utils/format';
const STYLES = {
  false: {
    bg: 'rgba(239,68,68,0.1)',
    color: '#dc2626',
    border: 'rgba(239,68,68,0.28)',
  },
  misleading: {
    bg: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: 'rgba(245,158,11,0.28)',
  },
  true: {
    bg: 'rgba(13,148,136,0.1)',
    color: '#0d9488',
    border: 'rgba(13,148,136,0.28)',
  },
};
export default function VerdictBadge({ categories }) {
  const v = getVerdict(categories);
  if (!v) return null;
  const key = v.cssClass.replace('verdict--', '');
  const s = STYLES[key] || STYLES.false;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 11px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.03em',
        fontFamily: 'Poppins, system-ui, sans-serif',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <span style={{ fontSize: 7 }}>●</span>
      {v.label}
    </span>
  );
}
