import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <>
      <style>{`
        .spinner-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          /* Subtle dark wash to dim the background */
          background: rgba(15, 23, 42, 0.2); 
        }
        
        .spinner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 24px 32px; /* Tighter padding for mobile */
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(15, 23, 42, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        /* Expands nicely on Desktop */
        @media (min-width: 768px) {
          .spinner-card {
            padding: 32px 48px;
            gap: 20px;
            border-radius: 24px;
          }
        }
      `}</style>

      <div className='spinner-overlay'>
        <div className='spinner-card'>
          <div style={{ display: 'flex', gap: 8 }}>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  y: ['0%', '-60%', '0%'],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.15,
                }}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#334155',
              fontFamily: 'Poppins, system-ui, sans-serif',
              letterSpacing: '0.02em',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Fetching latest facts...
          </p>
        </div>
      </div>
    </>
  );
}
