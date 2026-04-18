import { useEffect, useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext.jsx';
import { CustomCursor } from './components/common/CustomCursor.jsx';
import { motion, AnimatePresence } from 'motion/react';

import { Navbar } from './components/layout/Navbar.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { About } from './components/sections/About.jsx';
import { Skills } from './components/sections/Skills.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Figma } from './components/sections/Figma.jsx';
import { Hackathons } from './components/sections/Hackathons.jsx';
import { Education } from './components/sections/Education.jsx';
import { Stats } from './components/sections/Stats.jsx';
import { Contact } from './components/sections/Contact.jsx';
import { Footer } from './components/layout/Footer.jsx';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative overflow-hidden mb-8">
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-8xl font-display font-bold text-white tracking-widest"
        >
          PP
        </motion.h1>
      </div>
      
      <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          animate={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-4 font-mono text-xs text-white/50">{progress}%</span>
    </motion.div>
  );
};

const Layout = () => {
  const { isLoading } = usePortfolio();

  return (
    <>
      <div id="scroll-progress" />
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <main className="relative z-10">
          <Navbar />
          <div className="space-y-0">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Figma />
            <Hackathons />
            <Education />
            <Stats />
            <Contact />
          </div>
          <Footer />
        </main>
      )}
    </>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <Layout />
    </PortfolioProvider>
  );
}
