import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Home, 
  Cpu, 
  User, 
  Code2, 
  Layers, 
  Trophy, 
  BarChart3, 
  Mail, 
  FileText,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { cn } from '../../lib/utils.js';

const navItems = [
  { name: 'Home', href: '#hero', section: 'hero', icon: Home },
  { name: 'Startup', href: '#startups', section: 'startups', icon: Cpu },
  { name: 'About', href: '#about', section: 'about', icon: User },
  { name: 'Skills', href: '#skills', section: 'skills', icon: Code2 },
  { name: 'Projects', href: '#projects', section: 'projects', icon: Layers },
  { name: 'Hackathons', href: '#hackathons', section: 'hackathons', icon: Trophy },
  { name: 'Stats', href: '#stats', section: 'stats', icon: BarChart3 },
  { name: 'Contact', href: '#contact', section: 'contact', icon: Mail },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/paldpathak404', label: 'GitHub' },
  { icon: Linkedin, href: 'http://www.linkedin.com/in/paldpathak/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/paldpathak', label: 'Twitter' },
  { icon: Youtube, href: 'https://www.youtube.com/@PalDPathak', label: 'YouTube' },
];

export const Navbar = () => {
  const { theme, toggleTheme, activeSection, setActiveSection, setIsResumeModalOpen } = usePortfolio();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setCurrentTime(date.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = scrolled + '%';

      // Detect active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const item of navItems) {
        const el = document.getElementById(item.section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(item.section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <>
      {/* Top Brand & Status Bar */}
      <div className="fixed top-6 left-0 w-full z-[120] pointer-events-none px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Live Status Pill */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <a href="#hero" className="relative group">
              <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 backdrop-blur-xl flex items-center justify-center font-display font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all text-black dark:text-white">
                PP
              </div>
            </a>
            
            {/* Live Location & Time Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-lg font-mono text-[10px] tracking-wider text-black/60 dark:text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
              <span>GUJARAT, IN</span>
              <span className="opacity-30">|</span>
              <span className="uppercase">{currentTime || '11:31 PM'}</span>
            </div>
          </div>

          {/* Quick Controls: Light/Dark Toggle + Resume */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Theme Toggle - Modern iOS Style */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full border border-white/20 dark:border-white/10 p-1 flex items-center transition-all bg-white/10 dark:bg-black/30 backdrop-blur-xl shadow-lg overflow-hidden cursor-none"
              data-cursor="pointer"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ x: theme === 'dark' ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-6 h-6 rounded-full flex items-center justify-center bg-primary"
                style={{ boxShadow: '0 0 10px rgba(0, 113, 227, 0.4)' }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-white" />
                )}
              </motion.div>
            </button>

            {/* Resume Capsule */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 text-white text-[10px] font-mono uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-none"
              data-cursor="pointer"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Futuristic Floating Bottom Dock (Desktop) */}
      <div className="fixed bottom-8 left-0 w-full z-[120] pointer-events-none hidden md:flex justify-center">
        <div 
          className="pointer-events-auto flex items-end gap-3 px-5 py-3 rounded-3xl bg-white/15 dark:bg-black/30 border border-white/20 dark:border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === idx;
            const isActive = activeSection === item.section;

            // macOS dock style dynamic scaling based on distance
            let scaleVal = 1;
            if (isHovered) scaleVal = 1.25;
            else if (hoveredIndex !== null && Math.abs(hoveredIndex - idx) === 1) scaleVal = 1.1;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.section)}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative flex flex-col items-center group cursor-none"
                data-cursor="pointer"
              >
                {/* Micro Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -45, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="absolute px-3 py-1 rounded-lg bg-black/80 dark:bg-white/90 text-white dark:text-black font-display font-medium text-[10px] tracking-wider uppercase backdrop-blur-md border border-white/10 dark:border-black/10 shadow-md whitespace-nowrap"
                    >
                      {item.name}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dock Capsule Grid */}
                <motion.div
                  animate={{ scale: scaleVal }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative border",
                    isActive 
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                      : "bg-white/10 dark:bg-white/5 text-black/70 dark:text-white/70 border-white/10 hover:bg-white/25 dark:hover:bg-white/15"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  
                  {/* Glowing Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-md shadow-white" />
                  )}
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Nav (Mobile) */}
      <div className="fixed bottom-4 inset-x-4 z-[120] pointer-events-auto md:hidden">
        <div className="flex items-center justify-around py-3 px-4 rounded-2xl bg-white/25 dark:bg-black/50 border border-white/20 dark:border-white/5 backdrop-blur-2xl shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.section)}
                className="relative flex flex-col items-center p-2 rounded-xl text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-all"
              >
                <Icon className={cn("w-5.5 h-5.5", isActive && "text-primary scale-110")} />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -bottom-1.5 w-4 h-1 bg-primary rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
