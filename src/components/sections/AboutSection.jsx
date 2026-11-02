import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import SpotlightCard from '../ui/SpotlightCard';
import MagneticButton from '../ui/MagneticButton';
import { siteConfig } from '../../data/config';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function StatCard({ label, value }) {
  return (
    <motion.div
      variants={itemVariants}
      className="glass-card p-5 text-center hover:border-indigo-500/40 transition-all duration-300"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="text-2xl font-heading font-bold gradient-text mb-1">{value}</div>
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section-padding relative">
      {/* Ambient background blob */}
      <div
        className="absolute right-0 top-1/4 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(70px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="A Developer Who Cares"
          subtitle="Turning complex business ideas into elegant, reliable digital experiences."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Text column */}
          <div>
            <motion.p variants={itemVariants} className="text-[var(--text-body)] text-base md:text-lg leading-relaxed mb-6 font-normal">
              {siteConfig.about.intro}
            </motion.p>
            <motion.p variants={itemVariants} className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
              {siteConfig.about.bio}
            </motion.p>

            {/* Quick facts with animated micro badges */}
            <motion.div variants={itemVariants} className="space-y-3.5">
              {siteConfig.about.facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3 group">
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-indigo-500 group-hover:bg-teal-400 group-hover:scale-125 transition-all" />
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--text-muted)]">{fact.label}:</span>
                    <span className="text-sm text-[var(--text-body)] font-medium">{fact.value}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-9">
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all cursor-pointer shadow-sm"
                >
                  Get in touch
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Code mock card & metrics */}
          <div>
            {/* Terminal mock card with spotlight */}
            <SpotlightCard
              className="p-6 font-mono text-sm mb-6 border border-white/10"
              spotlightColor="rgba(45, 212, 191, 0.15)"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="browser-dot bg-red-400/90" />
                <div className="browser-dot bg-yellow-400/90" />
                <div className="browser-dot bg-green-400/90" />
                <span className="text-[var(--text-muted)] text-xs ml-2 opacity-70">developer.ts</span>
              </div>
              <pre className="text-[var(--text-muted)] leading-relaxed overflow-x-auto text-xs sm:text-sm">
{`const affan = {
  name: "${siteConfig.name}",
  role: "${siteConfig.role}",
  location: "${siteConfig.location}",
  education: "BS CSE, Iqra University",
  status: "Open to opportunities 🚀",
  principles: [
    "Clean Code & Architecture",
    "40% Load Time Optimization",
    "Continuous Learning"
  ],
};`}
              </pre>
            </SpotlightCard>

            {/* Stat counters */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
              <StatCard label="Projects Delivered" value="5+" />
              <StatCard label="Load Time Improvement" value="40%" />
              <StatCard label="Internship Duration" value="5 Months" />
              <StatCard label="Years Coding" value="3+" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
