import { getVerdict } from '../../utils/format';

const STYLES = {
  'verdict--false': { bg: '#dc2626', color: '#fff', icon: '✕' },
  'verdict--misleading': { bg: '#d97706', color: '#fff', icon: '!' },
  'verdict--true': { bg: '#16a34a', color: '#fff', icon: '✓' },
};

export default function VerdictBadge({ categories, acfVerdict }) {
  const v = getVerdict(categories, acfVerdict);
  if (!v) return null;

  const s = STYLES[v.cssClass] ?? STYLES['verdict--false'];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px 5px 8px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: 'Poppins, system-ui, sans-serif',
        background: s.bg,
        color: s.color,
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      {/* Icon box */}
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          background: 'rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 900,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {s.icon}
      </span>
      {v.label}
    </span>
  );
}
