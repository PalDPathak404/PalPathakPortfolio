import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { Github, Linkedin, Youtube, Twitter, Code2, ArrowDown } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/paldpathak404', label: 'GitHub' },
  { icon: Linkedin, href: 'http://www.linkedin.com/in/paldpathak/', label: 'LinkedIn' },
  { icon: Code2, href: 'https://leetcode.com/u/paldpathak404/', label: 'LeetCode' },
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
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return <span className="text-primary">{texts[index].substring(0, subIndex)}<span className="animate-pulse">|</span></span>;
};

export const Hero = () => {
  const { setActiveSection } = usePortfolio();
  const roles = ["Full Stack Developer", "Creative Engineer", "Problem Solver", "MERN Specialist"];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Greeting Tag */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block font-mono text-sm tracking-[0.3em] uppercase text-primary/80 mb-8 px-4 py-2 border border-primary/20 rounded-full"
          >
            ● Available for Opportunities
          </motion.span>

          {/* Name - Stylish Split Design */}
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-display font-bold leading-[0.85] mb-2 tracking-tighter">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-r from-primary via-[#ff6b6b] to-[#f953c6] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientFlow_4s_linear_infinite]"
              style={{ filter: 'drop-shadow(0 0 30px rgba(242, 125, 38, 0.4))' }}
            >
              PAL
            </motion.span>
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent"
              style={{ 
                WebkitTextStroke: '2px var(--color-primary)', 
               }}
            >
              PATHAK
            </motion.span>
          </h1>

          {/* Decorative Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(242, 125, 38, 0.8)' }}
          />

          {/* Typewriter Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-2xl mb-10 h-8 font-light italic"
          >
            I am a <Typewriter texts={roles} />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a
              href="#projects"
              onClick={() => setActiveSection('projects')}
              className="group relative px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest overflow-hidden transition-transform active:scale-95 rounded-full"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
              <span className="relative z-10 group-hover:text-primary transition-colors text-sm">View My Work</span>
            </a>
            <button
              onClick={() => document.getElementById('resume-btn')?.click()}
              className="group relative px-10 py-4 border-2 border-black/20 dark:border-white/20 font-bold uppercase tracking-widest overflow-hidden transition-all hover:border-primary rounded-full"
            >
              <div className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-full" />
              <span className="relative z-10 group-hover:text-white transition-colors text-sm">View Resume</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center space-x-4 mt-10"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Micro Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16 flex items-center justify-center space-x-12 md:space-x-16"
          >
            {[
              { value: '10+', label: 'Projects' },
              { value: '05+', label: 'Certificates' },
              { value: '03+', label: 'Hackathons' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-3xl md:text-4xl font-display font-bold">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
