import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import SpotlightCard from '../ui/SpotlightCard';
import { siteConfig } from '../../data/config';

// Language color map
const langColors = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Java: '#ED8B00',
  Python: '#3776AB',
  C: '#A8B9CC',
  CSS: '#1572B6',
  HTML: '#E34F26',
  React: '#61DAFB',
  SQL: '#4479A1',
  'Node.js': '#68A063',
  'Express.js': '#FFFFFF',
  'MongoDB': '#47A248',
  'Tailwind CSS': '#38BDF8',
};

function SkillItem({ item }) {
  return (
    <motion.div
      className="glass-card px-4 py-2 flex items-center gap-2.5 text-sm font-medium text-[var(--text-body)] cursor-default transition-colors hover:border-indigo-400/50"
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
    >
      {langColors[item] ? (
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: langColors[item] }} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 flex-shrink-0" />
      )}
      <span>{item}</span>
    </motion.div>
  );
}

function SkillGroup({ group, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <SpotlightCard
        className="p-6 h-full flex flex-col hover:border-indigo-500/40 transition-all duration-300"
        spotlightColor="rgba(139, 92, 246, 0.18)"
        whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(139,92,246,0.18)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {group.icon}
          </div>
          <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)]">{group.category}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {group.items.map((item) => (
            <SkillItem key={item} item={item} />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

// Marquee ticker with smooth speed and pause
function TechMarquee() {
  const items = [...siteConfig.marqueeItems, ...siteConfig.marqueeItems];
  return (
    <div className="marquee-container mt-14">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-6 py-3.5 mx-2 glass-card text-sm text-[var(--text-body)] whitespace-nowrap hover:border-indigo-400/60 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium tracking-wide">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      <div
        className="absolute left-0 bottom-0 w-80 h-80 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills & Arsenal"
          title="My Tech Stack"
          subtitle="Specialized in the MERN ecosystem with clean, modular architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.skills.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>

        <TechMarquee />
      </div>
    </section>
  );
}
