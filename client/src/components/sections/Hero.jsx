import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { Github, Linkedin, Youtube, Twitter, Code2, ArrowDown, Sparkles, Cpu, Activity, Server } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/paldpathak404', label: 'GitHub' },
  { icon: Linkedin, href: 'http://www.linkedin.com/in/paldpathak/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/paldpathak', label: 'Twitter' },
  { icon: Youtube, href: 'https://www.youtube.com/@PalDPathak', label: 'YouTube' },
];

const Typewriter = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return <span className="text-primary font-bold">{texts[index].substring(0, subIndex)}<span className="animate-pulse">|</span></span>;
};

export const Hero = () => {
  const { setActiveSection } = usePortfolio();
  const roles = ["Full Stack Developer", "Founder @ Shruviq", "Creative Engineer", "MERN Specialist"];

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-white dark:bg-[#050505]">
      
      {/* Aurora Glassmorphism Background Spheres */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[15%] right-[5%] w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[160px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Subtle Technical Grid Overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.012] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Floating Elements (Background) */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-1/4 right-[15%] hidden lg:flex opacity-20 dark:opacity-40 pointer-events-none">
         <div className="w-20 h-20 bg-primary/10 border border-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
            <Code2 className="w-10 h-10 text-primary" />
         </div>
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: '-3s' }} className="absolute bottom-1/3 left-[5%] hidden lg:flex opacity-20 dark:opacity-40 pointer-events-none">
         <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl rounded-full flex items-center justify-center transform -rotate-12 shadow-2xl">
            <Server className="w-8 h-8 text-blue-500" />
         </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
        
        {/* LEFT PANEL: Typographic Pitch & CTAs (7 Cols) */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant Status Capsule */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 border border-primary/25 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-8 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>● Building the Future with Voice AI</span>
            </motion.div>

            {/* Split Display Headers */}
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display font-black leading-[0.85] tracking-tighter mb-4 text-black dark:text-white uppercase relative">
              <span className="block bg-gradient-to-r from-primary via-blue-400 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientFlow_5s_linear_infinite]">
                PAL
              </span>
              <span className="block text-black/80 dark:text-white/80">
                PATHAK
              </span>
              
              {/* Decorative accent */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                className="absolute -left-6 top-1/2 w-2 h-1/2 bg-primary transform origin-bottom" 
              />
            </motion.h1>

            {/* Role Subheading */}
            <motion.p variants={itemVariants} className="text-lg md:text-2xl mb-8 font-display font-medium text-black/60 dark:text-white/60 min-h-[36px] italic">
              I am a <Typewriter texts={roles} />
            </motion.p>

            <motion.p variants={itemVariants} className="text-sm md:text-base text-black/50 dark:text-white/50 max-w-lg mb-10 leading-relaxed font-medium">
              Architecting full-stack digital environments with robust backend security, rich interactivity, and responsive AI voice insights.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-12">
              <a
                href="#projects"
                onClick={() => setActiveSection('projects')}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-center cursor-none"
                data-cursor="pointer"
              >
                Discover Creations
              </a>
              <button
                onClick={() => document.getElementById('resume-btn')?.click()}
                className="w-full sm:w-auto px-8 py-4 border border-black/20 dark:border-white/20 hover:border-primary text-black dark:text-white hover:text-primary font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all text-center cursor-none bg-white/5 dark:bg-black/10 backdrop-blur-md"
                data-cursor="pointer"
              >
                Review Resume
              </button>
            </motion.div>

            {/* Social icons */}
            <div className="flex gap-3 justify-start items-center">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-primary/10 hover:border-primary flex items-center justify-center transition-all duration-300 group cursor-none"
                  aria-label={social.label}
                  data-cursor="pointer"
                >
                  <social.icon className="w-4 h-4 text-black/70 dark:text-white/70 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

          </motion.div>
        </div>

        {/* RIGHT PANEL: Breathtaking Floating Glass widgets (5 Cols) */}
        <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center h-[500px]">
          
          {/* Main central frosted display block */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 h-96 rounded-3xl bg-white/20 dark:bg-black/25 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl relative flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Spinning decorative geometric logo ring */}
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-primary/20 dark:border-white/10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-52 h-52 rounded-full border border-dotted border-primary/10 dark:border-white/5 animate-[spin_60s_linear_infinite_reverse]" />

            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
              <Cpu className="w-10 h-10 text-primary" />
            </div>

            <h3 className="text-2xl font-display font-black uppercase text-black dark:text-white tracking-wide">
              SOLO BUILDER
            </h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-2 max-w-[200px] font-medium leading-relaxed">
              Synthesizing Voice AI SaaS architectures from scratch.
            </p>

            <div className="flex gap-2 mt-6">
              <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/20 text-blue-500 text-[9px] font-mono rounded-md uppercase tracking-wider font-bold">
                MERN Stack
              </span>
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono rounded-md uppercase tracking-wider font-bold">
                Full-Stack
              </span>
            </div>
          </motion.div>

          {/* Floating Widget 1: AI Engine logs */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-12 -left-4 w-44 p-4 bg-white/25 dark:bg-[#090909]/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl flex items-center gap-3 text-left"
          >
            <div className="p-2 bg-blue-500/15 text-blue-500 border border-blue-500/30 rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-mono uppercase opacity-40 font-bold block">NLP Sent.</span>
              <span className="text-[10px] font-mono font-black text-black dark:text-white block">Active (99%)</span>
            </div>
          </motion.div>

          {/* Floating Widget 2: Database health */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-16 -right-4 w-48 p-4 bg-white/25 dark:bg-[#090909]/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl flex items-center gap-3 text-left"
          >
            <div className="p-2 bg-primary/15 text-primary border border-primary/30 rounded-xl">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-mono uppercase opacity-40 font-bold block">Firestore API</span>
              <span className="text-[10px] font-mono font-black text-black dark:text-white block">Staging Online</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 pointer-events-none">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] mb-1">Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>

    </section>
  );
};
