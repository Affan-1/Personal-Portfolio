import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import { timeline } from '../../data/config';

function TimelineItem({ item, index, isLast }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const isExperience = item.type === 'experience';

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Icon dot */}
        <motion.div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-card"
          style={{
            background: isExperience
              ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
              : 'linear-gradient(135deg, #2DD4BF, #6366F1)',
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          {isExperience ? '💼' : '🎓'}
        </motion.div>
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="timeline-line w-0.5 flex-1 mt-2 min-h-[40px]"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <motion.div
          className="glass-card p-6 hover:border-indigo-500/30 transition-all"
          whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.12)' }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded mb-2"
                style={{
                  background: isExperience ? 'rgba(99,102,241,0.1)' : 'rgba(45,212,191,0.1)',
                  color: isExperience ? '#818CF8' : '#2DD4BF',
                }}>
                {isExperience ? 'Experience' : 'Education'}
              </span>
              <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">{item.title}</h3>
              <p className="text-indigo-400 font-medium text-sm">{item.org}</p>
            </div>
            <div className="text-right text-sm text-[var(--text-muted)] flex-shrink-0">
              <div className="font-medium">{item.period}</div>
              <div className="text-xs flex items-center gap-1 justify-end mt-0.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </div>
            </div>
          </div>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {item.highlights.map(h => (
              <span key={h} className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)]">
                {h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Journey"
          title="Experience & Education"
          subtitle="My professional path and academic background."
        />

        <div className="space-y-0">
          {timeline.map((item, i) => (
            <TimelineItem
              key={`${item.type}-${i}`}
              item={item}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
