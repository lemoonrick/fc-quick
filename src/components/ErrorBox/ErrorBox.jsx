import { motion } from 'framer-motion';
export default function ErrorBox({ message, onRetry }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        paddingTop: 56,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '36px 28px',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(79,70,229,0.1)',
          border: '1px solid #c7d2fe',
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 14 }}>⚠️</div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 8,
          }}
        >
          Couldn't load articles
        </h3>
        <p
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            background: '#f0f4ff',
            padding: '8px 12px',
            borderRadius: 8,
            color: '#64748b',
            marginBottom: 10,
            wordBreak: 'break-all',
            border: '1px solid #c7d2fe',
          }}
        >
          {message}
        </p>
        <p
          style={{
            fontSize: 12,
            color: '#94a3b8',
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          Enable CORS on the WP site or check the Vite proxy config.
        </p>
        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{
              y: -2,
              boxShadow: '0 10px 24px rgba(79,70,229,0.28)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.13 }}
            style={{
              padding: '10px 28px',
              borderRadius: 999,
              background: 'linear-gradient(135deg,#4f46e5,#3730a3)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(79,70,229,0.25)',
            }}
          >
            Try again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
