import { motion } from 'framer-motion';

const WarningIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    style={{ width: 32, height: 32, color: '#ef4444' }}
  >
    <path
      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function ErrorBox({ message, onRetry }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(15, 23, 42, 0.5)' /* Dark dims the background */,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          background: '#ffffff',
          borderRadius: 24,
          padding: '40px 32px',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.2)',
          border: '1px solid rgba(255,255,255,0.5)',
          fontFamily: 'Poppins, system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <WarningIcon />
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          Unable to load feed
        </h3>

        <p
          style={{
            fontSize: 14,
            color: '#64748b',
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          We couldn't connect to the server. Please check your internet
          connection or try again.
        </p>

        {/* Clean debug tray for the actual error message */}
        {message && (
          <div
            style={{
              width: '100%',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 28,
              overflowX: 'auto',
            }}
          >
            <code
              style={{
                fontSize: 12,
                color: '#ef4444',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {message}
            </code>
          </div>
        )}

        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{
              y: -2,
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 32px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'inherit',
            }}
          >
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
