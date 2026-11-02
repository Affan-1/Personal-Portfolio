import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/config';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setDone(true); return; }

    let start = null;
    const duration = 1800;

    function step(ts) {
      if (!start) start = ts;
      const p = Math.min(((ts - start) / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 300);
    }
    requestAnimationFrame(step);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#0F1222' }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="blob w-96 h-96 opacity-20 bg-indigo-500 top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
            <div className="blob w-80 h-80 opacity-15 bg-violet-500 bottom-1/4 right-1/4" style={{ animationDelay: '-3s' }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            {/* Logo mark */}
            <motion.div
              className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              A
            </motion.div>

            {/* Name reveal */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 overflow-hidden">
              {['Muhammad', ' ', 'Affan'].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="text-text-muted text-sm tracking-widest uppercase mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Full-Stack MERN Developer
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full loader-bar rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
