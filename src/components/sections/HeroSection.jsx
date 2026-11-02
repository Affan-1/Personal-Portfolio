import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { siteConfig } from '../../data/config';
import ParticleCanvas from '../ui/ParticleCanvas';
import MagneticButton from '../ui/MagneticButton';
import { openEmailDirectly } from '../../utils/contact';

// Floating tech badge around the photo with glow
function TechBadge({ label, icon, style, delay = 0 }) {
  return (
    <motion.div
      className="absolute glass-card px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-[var(--text-body)] shadow-card backdrop-blur-md border border-indigo-500/25 z-20"
      style={style}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      whileHover={{ scale: 1.15, borderColor: '#2DD4BF' }}
    >
      <span className="text-sm">{icon}</span>
      <span className="font-semibold">{label}</span>
    </motion.div>
  );
}

// 3D tilt profile photo
function ProfilePhoto() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    mouseX.set(((x - cx) / cx) * 12);
    mouseY.set(((y - cy) / cy) * -12);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Outer dual-spin animated gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #6366F1, #8B5CF6, #2DD4BF, #EC4899, #6366F1)',
          padding: '3px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-primary)' }} />
      </motion.div>

      {/* Radiant ambient glow */}
      <div
        className="absolute inset-2 rounded-full blur-2xl opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(45,212,191,0.2) 70%, transparent 100%)' }}
      />

      {/* Photo with smooth spring 3D tilt */}
      <motion.div
        ref={ref}
        className="relative z-10 w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full overflow-hidden cursor-pointer shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          border: '2px solid rgba(255,255,255,0.15)',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.03 }}
      >
        <img
          src="/profile.jpg"
          alt="Muhammad Affan — Full-Stack MERN Developer"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="w-full h-full items-center justify-center text-6xl font-heading font-bold text-white"
          style={{
            display: 'none',
            background: 'linear-gradient(135deg, #151A2E, #1A2038)',
          }}
        >
          A
        </div>
      </motion.div>

      {/* Floating interactive tech badges */}
      <TechBadge label="React" icon="⚛️" style={{ top: '-10px', right: '-4px' }} delay={0} />
      <TechBadge label="Node.js" icon="🟢" style={{ bottom: '20px', left: '-20px' }} delay={1.2} />
      <TechBadge label="MongoDB" icon="🍃" style={{ top: '42%', right: '-32px' }} delay={2.1} />
    </div>
  );
}

// Background gradient mesh
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="blob w-[520px] h-[520px] opacity-15 -top-24 -left-24"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }}
      />
      <div
        className="blob w-[420px] h-[420px] opacity-12 bottom-0 right-0"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', animationDelay: '-3s' }}
      />
      <div
        className="blob w-[340px] h-[340px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 70%)', animationDelay: '-5s' }}
      />
    </div>
  );
}

export default function HeroSection() {
  const roleSequence = siteConfig.roles.flatMap(r => [r, 2000]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailAction = () => {
    openEmailDirectly(siteConfig.email, 'Hi Affan, reaching out from your portfolio');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 section-padding overflow-hidden">
      <FloatingOrbs />
      <ParticleCanvas />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status pill with animated glow */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal-500/30 text-sm text-[var(--text-body)] mb-6 shadow-sm backdrop-blur-md"
              style={{ background: 'rgba(45,212,191,0.08)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
              </span>
              <span className="font-medium text-xs tracking-wide">Available for opportunities</span>
            </motion.div>

            {/* Name with subtle glowing gradient */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">Affan</span>
            </motion.h1>

            {/* Animated role typing */}
            <motion.div
              className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-[var(--text-muted)] mb-6 h-10 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <TypeAnimation
                sequence={roleSequence}
                wrapper="span"
                speed={60}
                deletionSpeed={80}
                repeat={Infinity}
                style={{ color: '#818CF8' }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <MagneticButton strength={0.2}>
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="relative group overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl shadow-glow-indigo transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border border-indigo-500/30 text-[var(--text-body)] hover:border-indigo-500/70 hover:bg-indigo-500/10 transition-all backdrop-blur-sm"
                >
                  View Projects
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Social icons with direct handlers */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {/* GitHub */}
              <MagneticButton strength={0.3}>
                <motion.a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all flex items-center justify-center backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              </MagneticButton>

              {/* LinkedIn — accurate URL */}
              <MagneticButton strength={0.3}>
                <motion.a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all flex items-center justify-center backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </MagneticButton>

              {/* Email Button with Direct Handler + Toast */}
              <MagneticButton strength={0.3}>
                <motion.button
                  onClick={handleEmailAction}
                  aria-label="Email Affan"
                  className="p-3 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all flex items-center justify-center backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.button>
              </MagneticButton>

              {/* Toast popup when email clicked */}
              {copiedEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -top-12 left-0 sm:left-auto px-3.5 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-medium shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email opened & copied to clipboard!
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: Photo with 3D treatment */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <ProfilePhoto />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="tracking-widest uppercase text-[10px] hover:text-indigo-400 transition-colors">Scroll</span>
          <motion.div
            className="w-px h-10"
            style={{ background: 'linear-gradient(180deg, #6366F1, transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
