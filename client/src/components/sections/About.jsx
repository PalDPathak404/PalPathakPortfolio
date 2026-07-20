import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, User, Sparkles, Terminal, Rocket, Award, ShieldCheck } from 'lucide-react';
import { TiltWrapper } from '../common/TiltWrapper.jsx';

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4"
          >
            <User className="w-3.5 h-3.5" />
            <span>BIOGRAPHY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black uppercase mb-4 tracking-tight text-black dark:text-white"
          >
            The Developer <span className="text-stroke">Behind the Screen</span>
          </motion.h2>
          <p className="text-black/50 dark:text-white/50 max-w-lg mx-auto italic">
            Engineering high-end digital experiences where flawless performance meets interactive design.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bento Card 1: Main Story (8 Cols on Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <TiltWrapper tiltAmount={3}>
              <div className="glass-card backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden h-full bg-white/40 dark:bg-black/20">
                {/* Background geometric flare */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div style={{ transform: "translateZ(30px)" }}>
                  <div className="flex items-center gap-2.5 text-primary mb-6">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">CORE PHILOSOPHY</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold mb-6 text-black dark:text-white leading-tight">
                    Engineering Digital Journeys, Not Just Web Applications.
                  </h3>
                  
                  <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-6">
                    I am a high-performance Full-Stack Developer and Creative Engineer based in Gujarat. My expertise lies at the intersection of robust backend architectures and highly interactive, motion-rich frontend experiences.
                  </p>
                  
                  <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-8">
                    I believe a true web experience is alive. Every interaction should feel organic, responsive, and tactile. By pairing modern backend technology like MERN with immersive motion platforms (Three.js and Framer Motion), I craft polished digital landscapes that leaving lasting impressions.
                  </p>
                </div>

                {/* Checkmark values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/10 dark:border-white/10 pt-6" style={{ transform: "translateZ(40px)" }}>
                  {[
                    'Obsessive attention to UI/UX performance',
                    'Deep understanding of MERN & Cloud services',
                    'Passion for Creative Coding, 3D, and Audio synthesis',
                    'Active contributor to open-source software'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-black/80 dark:text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

          {/* Bento Card 2: Interactive Avatar (4 Cols on Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4"
          >
            <TiltWrapper tiltAmount={5}>
              <div
                className="glass-card backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group cursor-none h-full bg-white/40 dark:bg-black/20"
                data-cursor="view"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 mb-6 group" style={{ transform: "translateZ(30px)" }}>
                  <img
                    src="https://res.cloudinary.com/dprcvoo9b/image/upload/v1776441789/Pokecut_1776424114577_ff45kc.jpg"
                    alt="Pal Pathak"
                    className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 mix-blend-overlay" />
                  
                  {/* Floating verification badge */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-xl" style={{ transform: "translateZ(20px)" }}>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[9px] font-mono text-white tracking-widest font-bold">VERIFIED PROFILE</span>
                  </div>
                </div>

                <div className="text-center" style={{ transform: "translateZ(20px)" }}>
                  <h4 className="text-xl font-display font-bold text-black dark:text-white mb-2">Pal Pathak</h4>
                  <p className="text-xs text-black/50 dark:text-white/50 font-mono tracking-widest uppercase mb-4">MERN Stack Lead</p>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50">AVAILABLE FOR HIRE</span>
                  </div>
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

          {/* Bento Card 3: Mini Stat 1 (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <TiltWrapper tiltAmount={4}>
              <div className="glass-card backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:border-primary/30 transition-all h-full bg-white/40 dark:bg-black/20">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0" style={{ transform: "translateZ(20px)" }}>
                  <Rocket className="w-6 h-6" />
                </div>
                <div style={{ transform: "translateZ(10px)" }}>
                  <h4 className="font-display font-bold text-lg text-black dark:text-white">Fast Shipper</h4>
                  <p className="text-xs text-black/50 dark:text-white/50">Rapid MVP deployment from idea to secure product cloud staging.</p>
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

          {/* Bento Card 4: Mini Stat 2 (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-4"
          >
            <TiltWrapper tiltAmount={4}>
              <div className="glass-card backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:border-accent/30 transition-all h-full bg-white/40 dark:bg-black/20">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shrink-0" style={{ transform: "translateZ(20px)" }}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div style={{ transform: "translateZ(10px)" }}>
                  <h4 className="font-display font-bold text-lg text-black dark:text-white">Secure & Scalable</h4>
                  <p className="text-xs text-black/50 dark:text-white/50">Rigorous system architectures focusing on robust Auth and DB schemas.</p>
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

          {/* Bento Card 5: Mini Stat 3 (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4"
          >
            <TiltWrapper tiltAmount={4}>
              <div className="glass-card backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:border-pink-500/30 transition-all h-full bg-white/40 dark:bg-black/20">
                <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 border border-pink-500/20 shrink-0" style={{ transform: "translateZ(20px)" }}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div style={{ transform: "translateZ(10px)" }}>
                  <h4 className="font-display font-bold text-lg text-black dark:text-white">UX Obsessed</h4>
                  <p className="text-xs text-black/50 dark:text-white/50">Subtle interactive animations, smooth scrolling, and dynamic elements.</p>
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
