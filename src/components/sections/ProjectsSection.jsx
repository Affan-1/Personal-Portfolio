import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SectionHeader from '../ui/SectionHeader';
import SpotlightCard from '../ui/SpotlightCard';
import MagneticButton from '../ui/MagneticButton';
import { projects } from '../../data/config';

// Lightbox
function Lightbox({ src, alt, onClose }) {
  return (
    <AnimatePresence>
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
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white bg-black/60 hover:bg-black/90 rounded-full p-2.5 transition-colors border border-white/10 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// Browser mockup screenshot with glare
function BrowserMockup({ src, alt, onExpand }) {
  return (
    <div className="browser-frame group cursor-zoom-in relative" onClick={onExpand}>
      <div className="browser-bar">
        <div className="browser-dot bg-red-400" />
        <div className="browser-dot bg-yellow-400" />
        <div className="browser-dot bg-green-400" />
        <div className="flex-1 mx-3 bg-[#2a3250] rounded px-3 py-0.5 text-[10px] text-[var(--text-muted)] truncate font-mono">
          affan.dev/projects
        </div>
      </div>
      <div className="relative overflow-hidden bg-slate-900" style={{ aspectRatio: '16/9' }}>
        <LazyLoadImage
          src={src}
          alt={alt}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/800x450/1A2038/6366F1?text=${encodeURIComponent(alt)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-semibold bg-black/70 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Click to expand
          </span>
        </div>
      </div>
    </div>
  );
}

// Tag chip with hover micro-interaction
function Tag({ label }) {
  return (
    <span
      className="px-2.5 py-1 text-xs font-medium rounded-full transition-transform hover:scale-105"
      style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.2)' }}
    >
      {label}
    </span>
  );
}

// Project card with Spotlight
function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full"
      >
        <SpotlightCard
          className="flex flex-col h-full hover:border-indigo-500/50 transition-all duration-300"
          spotlightColor="rgba(99, 102, 241, 0.22)"
          whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(99,102,241,0.25)' }}
        >
          {/* Screenshot */}
          <BrowserMockup
            src={project.screenshots[0]}
            alt={project.title}
            onExpand={() => setLightbox(project.screenshots[0])}
          />

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-xl text-[var(--text-primary)] mb-2 group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 flex-1">
              {project.shortDesc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.stack.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-95 hover:shadow-glow-indigo active:scale-98"
                style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <Link
                to={`/projects/${project.slug}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl border border-[var(--border-subtle)] text-[var(--text-body)] hover:border-indigo-500/60 hover:bg-indigo-500/10 transition-all active:scale-98"
              >
                Case Study
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox}
          alt={project.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      <div
        className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Real, working full-stack applications with clean architecture and live deployments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
