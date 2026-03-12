import { motion } from 'framer-motion';
export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingTop: 56,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '2.5px solid #c7d2fe',
          borderTopColor: '#4f46e5',
        }}
      />
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#94a3b8',
          fontFamily: 'Poppins, system-ui, sans-serif',
        }}
      >
        Loading fact-checks...
      </p>
    </div>
  );
}
