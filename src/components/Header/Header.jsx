import { motion } from 'framer-motion';
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
  { Icon: XIcon, label: 'X' },
  { Icon: FbIcon, label: 'Facebook' },
  { Icon: InstaIcon, label: 'Instagram' },
  { Icon: YTIcon, label: 'YouTube' },
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
        background: 'rgba(240,244,255,0.8)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid rgba(199,210,254,0.6)',
        boxShadow: '0 1px 0 rgba(79,70,229,0.06)',
      }}
    >
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #4f46e5, #3730a3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            FC
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.01em',
              fontFamily: 'Poppins, system-ui, sans-serif',
            }}
          >
            Quick
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {SOCIALS.map(({ Icon, label }) => (
            <motion.a
              key={label}
              href='#'
              aria-label={label}
              whileHover={{ scale: 1.15, color: '#4f46e5' }}
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
