import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import useGitHubStats from '../../hooks/useGitHubStats';
import { siteConfig } from '../../data/config';

// Language bar colors
const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Java: '#ED8B00',
  Python: '#3776AB',
  CSS: '#1572B6',
  HTML: '#E34F26',
  C: '#A8B9CC',
};

function StatCard({ icon, value, label, index }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 text-center hover:border-indigo-500/40 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(99,102,241,0.15)' }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-heading font-bold gradient-text mb-1">
        {inView ? <CountUp end={value} duration={2} separator="," /> : 0}
        {typeof value === 'number' && value > 9 ? '+' : ''}
      </div>
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

function HighlightBox({ index }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 text-center relative overflow-hidden group hover:border-indigo-500/50 transition-all flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(99,102,241,0.2)' }}
    >
      {/* Live status badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] text-teal-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
        <span>Active</span>
      </div>

      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
      <div className="text-2xl font-heading font-bold gradient-text mb-1">
        Full-Stack MERN
      </div>
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
        Core Focus & Architecture
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return <div className="skeleton h-32 rounded-2xl" />;
}

export default function GitHubSection() {
  const { data, loading, error } = useGitHubStats(siteConfig.githubUsername);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (error) {
    return (
      <section id="github" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader eyebrow="GitHub" title="GitHub Activity" />
          <div className="glass-card p-12 max-w-md mx-auto">
            <p className="text-[var(--text-muted)] mb-4">GitHub data is temporarily unavailable.</p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
            >
              View my GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="section-padding relative">
      <div className="absolute left-1/2 top-1/4 w-96 h-96 opacity-5 pointer-events-none -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(80px)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="GitHub"
          title="GitHub Stats"
          subtitle="Real-time data pulled from the public GitHub API."
        />

        {/* Stat counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {loading ? (
            [1, 2, 3].map(i => <SkeletonCard key={i} />)
          ) : (
            <>
              <StatCard icon="📦" value={data.publicRepos} label="Public Repos" index={0} />
              <HighlightBox index={1} />
              <StatCard icon="⭐" value={data.totalStars} label="Total Stars" index={2} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-6">
          {/* Language breakdown */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-4">Top Languages</h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-8 rounded-lg" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {data.languages.map((l, i) => (
                  <motion.div
                    key={l.lang}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: LANG_COLORS[l.lang] || '#6366F1' }}
                        />
                        <span className="text-[var(--text-body)]">{l.lang}</span>
                      </div>
                      <span className="text-[var(--text-muted)]">{l.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: LANG_COLORS[l.lang] || '#6366F1' }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${l.pct}%` } : {}}
                        transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contribution heatmap */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-4">Contribution Graph</h3>
            <motion.div
              className="glass-card p-4 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={`https://ghchart.rshah.org/6366F1/${siteConfig.githubUsername}`}
                  alt="GitHub contribution chart"
                  className="w-full rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Profile Explore CTA */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-indigo-500/30 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Explore Repositories on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
