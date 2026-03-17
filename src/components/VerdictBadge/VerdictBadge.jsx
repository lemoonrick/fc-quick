import { getVerdict } from '../../utils/format';

const STYLES = {
  false: { bg: '#ef4444', color: '#fff', border: '#dc2626' }, // Red
  'partly-false': { bg: '#f97316', color: '#fff', border: '#ea580c' }, // Orange
  misleading: { bg: '#f59e0b', color: '#fff', border: '#d97706' }, // Amber
  'missing-context': { bg: '#eab308', color: '#fff', border: '#ca8a04' }, // Yellow
  satire: { bg: '#d946ef', color: '#fff', border: '#c026d3' }, // Fuchsia
  altered: { bg: '#6366f1', color: '#fff', border: '#4f46e5' }, // Indigo
  insight: { bg: '#0ea5e9', color: '#fff', border: '#0284c7' }, // Sky Blue
  news: { bg: '#3b82f6', color: '#fff', border: '#2563eb' }, // Blue
};

export default function VerdictBadge({ categories, acfVerdict }) {
  const v = getVerdict(categories, acfVerdict);
  if (!v) return null;

  const s = STYLES[v.cssClass] || STYLES['false'];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px 6px 6px', // Extra left padding for the icon circle
        borderRadius: 999, // Perfect pill shape
        fontSize: 12.5,
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'Poppins, system-ui, sans-serif',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        boxShadow: `0 4px 12px ${s.bg}50`, // Glow effect matching the background
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#ffffff', // Clean white cutout
          color: s.bg, // Icon inherits the main badge color
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 900,
          flexShrink: 0,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {v.icon}
      </span>
      {v.label}
    </span>
  );
}
