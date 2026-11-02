import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import WhatsAppButton from './components/ui/WhatsAppButton';
import LoadingScreen from './components/ui/LoadingScreen';
import useLenis from './hooks/useLenis';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

function AppInner() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-32 rounded-full" /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<CaseStudyPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LoadingScreen />
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
