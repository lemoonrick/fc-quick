import { motion } from 'framer-motion';
import logo from '/public/logo.png';

const XIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    style={{ width: 15, height: 15 }}
  >
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' />
  </svg>
);
const FbIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    style={{ width: 15, height: 15 }}
  >
    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
  </svg>
);
const InstaIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    style={{ width: 15, height: 15 }}
  >
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
  </svg>
);
const YTIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    style={{ width: 15, height: 15 }}
  >
    <path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);

const SOCIALS = [
  { Icon: XIcon, label: 'X', href: 'https://x.com/FactCrescendo' },
  {
    Icon: FbIcon,
    label: 'Facebook',
    href: 'https://www.facebook.com/CrescendoFactCheck',
  },
  {
    Icon: InstaIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/factcrescendoindia',
  },
  {
    Icon: YTIcon,
    label: 'YouTube',
    href: 'https://www.youtube.com/@FactCrescendo',
  },
];

export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 56,
        background: 'rgba(240,244,255,0.85)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid rgba(199,210,254,0.6)',
        boxShadow: '0 1px 0 rgba(79,70,229,0.06)',
      }}
    >
      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes tagline-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @media (min-width: 768px) {
          .desktop-tagline { display: block !important; }
        }
        .social-link svg { display: block; }
      `}</style>

      <div
        style={{
          height: '100%',
          maxWidth: 600,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Logo + tagline ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // gap: 8,
          }}
        >
          {/* Logo with live dot */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={logo}
              alt='FactCrescendo'
              style={{
                height: 28,
                width: 'auto',
                mixBlendMode: 'multiply',
                display: 'block',
              }}
            />
            {/* Live indicator dot — top right of logo */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: -6,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#d90429',
                boxShadow: '0 0 0 2px rgba(240,244,255,0.9)',
                animation: 'live-pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Quick text + shimmer tagline */}
          <div style={{ lineHeight: 1 }}>
            {/* Tagline — shimmer gradient text, desktop only */}
            <span
              className='desktop-tagline'
              style={{
                display: 'none',
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: '0.05em',
                fontFamily: 'Poppins, system-ui, sans-serif',
                background:
                  'linear-gradient(90deg, #94a3b8 0%, #d90429 40%, #94a3b8 60%, #94a3b8 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'tagline-shimmer 4s linear infinite',
              }}
            >
              Fact-checks in seconds
            </span>
          </div>
        </div>

        {/* ── Social icons ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {SOCIALS.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className='social-link'
              whileHover={{ scale: 1.15, color: '#d90429' }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.12 }}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                color: '#94a3b8',
              }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </header>
  );
}
