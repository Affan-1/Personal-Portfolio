import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    let rafId;
    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Hover detection
    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);
    const interactibles = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactibles.forEach(el => { el.addEventListener('mouseenter', handleEnter); el.addEventListener('mouseleave', handleLeave); });

    document.addEventListener('mousemove', onMove);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
      interactibles.forEach(el => { el.removeEventListener('mouseenter', handleEnter); el.removeEventListener('mouseleave', handleLeave); });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          width: 12, height: 12, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none', transition: 'transform 0.05s',
        }}
      />
      {/* Ring follower */}
      <div
        ref={followerRef}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `2px solid ${isHovering ? '#2DD4BF' : 'rgba(99,102,241,0.5)'}`,
          boxShadow: isHovering ? '0 0 15px rgba(45,212,191,0.4)' : 'none',
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          pointerEvents: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s',
          transform: isHovering ? 'scale(1.4)' : 'scale(1)',
        }}
      />
    </>
  );
}
