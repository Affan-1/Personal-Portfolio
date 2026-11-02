import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import { siteConfig } from '../../data/config';
import { openEmailDirectly } from '../../utils/contact';
import MagneticButton from '../ui/MagneticButton';

function ContactLink({ icon, label, href, value, onClick }) {
  const content = (
    <>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">{label}</div>
        <div className="text-sm font-medium text-[var(--text-body)] group-hover:text-indigo-400 transition-colors break-all">
          {value}
        </div>
      </div>
      <svg
        className="w-4 h-4 text-[var(--text-muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className="w-full text-left glass-card p-5 flex items-center gap-4 hover:border-indigo-500/40 transition-all group cursor-pointer"
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.15)' }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="glass-card p-5 flex items-center gap-4 hover:border-indigo-500/40 transition-all group block"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.15)' }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.a>
  );
}

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleEmailClick = () => {
    openEmailDirectly(siteConfig.email, 'Connecting from Portfolio');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.subject || `Portfolio Inquiry from ${form.name}`;
    openEmailDirectly(siteConfig.email, subject);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div
        className="absolute left-0 top-1/2 w-96 h-96 opacity-5 pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to talk? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: contact links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
              I'm open to freelance projects, internships, and full-time engineering roles.
              Click below to send an email, connect on LinkedIn, or chat on WhatsApp.
            </p>

            <div className="relative">
              <ContactLink
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                label="Email (Click to Open & Copy)"
                value={siteConfig.email}
                onClick={handleEmailClick}
              />
              {copiedEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-teal-400 font-medium flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email opened & copied to clipboard ({siteConfig.email})!
                </motion.div>
              )}
            </div>

            <ContactLink
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              label="LinkedIn"
              href={siteConfig.linkedin}
              value="linkedin.com/in/muhammad-affan-976423255"
            />

            <ContactLink
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              }
              label="GitHub"
              href={siteConfig.github}
              value="github.com/Affan-1"
            />

            {/* WhatsApp */}
            <motion.a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 flex items-center gap-4 hover:border-green-500/40 transition-all group block"
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(37,211,102,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">WhatsApp</div>
                <div className="text-sm font-medium text-[var(--text-body)] group-hover:text-green-400 transition-colors">
                  +92 323 312 9528
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Right: Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-body)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-body)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-body)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-body)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 hover:shadow-glow-indigo active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
            >
              {sent ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email client opened!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
            <p className="text-xs text-center text-[var(--text-muted)]">
              Directly launches your email client & opens Gmail composer with details pre-filled.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
