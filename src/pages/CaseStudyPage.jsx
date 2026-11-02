import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { projects } from '../data/config';
import Footer from '../components/sections/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

function Tag({ label }) {
  return (
    <span className="px-3 py-1.5 text-xs font-medium rounded-full"
      style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.2)' }}>
      {label}
    </span>
  );
}

function Section({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-12"
    >
      <h2 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
        <span className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #6366F1, #8B5CF6)' }} />
        {title}
      </h2>
      <div className="text-[var(--text-muted)] leading-relaxed">{children}</div>
    </motion.div>
  );
}

// Lightbox
function Lightbox({ src, alt, onClose }) {
  return (
    <motion.div
      className="lightbox-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);

  const project = projects.find(p => p.slug === slug);
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)]">Project Not Found</h1>
        <Link to="/" className="text-indigo-400 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {/* Hero banner */}
      <div className="relative pt-24 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)' }}>
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob w-96 h-96 opacity-10 -top-20 -right-20"
            style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }} />
          <div className="blob w-64 h-64 opacity-8 bottom-0 left-0"
            style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', animationDelay: '-3s' }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8"
          >
            <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/#projects" className="hover:text-indigo-400 transition-colors">Projects</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--text-body)]">{project.title}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map(t => <Tag key={t} label={t} />)}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--text-primary)] mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed max-w-2xl">
              {project.shortDesc}
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90 hover:shadow-glow-indigo transition-all"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Screenshot gallery */}
        {project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #6366F1, #8B5CF6)' }} />
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="browser-frame cursor-zoom-in group"
                  onClick={() => setLightbox(src)}
                >
                  <div className="browser-bar">
                    <div className="browser-dot bg-red-400" />
                    <div className="browser-dot bg-yellow-400" />
                    <div className="browser-dot bg-green-400" />
                    <div className="flex-1 mx-3 bg-[#2a3250] rounded px-2 py-0.5 text-[10px] text-[var(--text-muted)] truncate">
                      {project.liveUrl}
                    </div>
                  </div>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <LazyLoadImage
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      effect="blur"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/800x450/1A2038/6366F1?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1.5 rounded-lg">Click to enlarge</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {lightbox && <Lightbox src={lightbox} alt={project.title} onClose={() => setLightbox(null)} />}
        </AnimatePresence>

        {/* Case study content */}
        <Section title="Overview" delay={0.1}>{cs.overview}</Section>
        <Section title="The Problem" delay={0.15}>{cs.problem}</Section>
        <Section title="The Solution" delay={0.2}>{cs.solution}</Section>

        <Section title="Key Features" delay={0.25}>
          <ul className="space-y-2">
            {cs.keyFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#6366F1' }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Tech Stack" delay={0.3}>
          <div className="flex flex-wrap gap-2 mt-2">
            {cs.techStack.map(t => <Tag key={t} label={t} />)}
          </div>
        </Section>

        <Section title="Architecture & Approach" delay={0.35}>{cs.architecture}</Section>

        <Section title="Challenges & How I Solved Them" delay={0.4}>
          <div className="space-y-6">
            {cs.challenges.map((c, i) => (
              <div key={i} className="glass-card p-6">
                <h4 className="font-heading font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <span className="text-amber-warm">⚡</span>
                  Challenge: {c.challenge}
                </h4>
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold text-teal-400">Solution: </span>
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="What I Learned" delay={0.45}>
          <ul className="space-y-2">
            {cs.learned.map((l, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2DD4BF' }} />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-[var(--border-subtle)]"
        >
          <Link
            to="/#projects"
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Projects
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
          >
            Next: {nextProject.title}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}
