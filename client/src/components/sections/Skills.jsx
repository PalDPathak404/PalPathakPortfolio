import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import * as Icons from 'lucide-react';
import { cn } from '../../lib/utils.js';

const categories = ['All', 'Frontend', 'Backend', 'Databases', 'Tools', 'DevOps'];

export const Skills = () => {
  const { skills } = usePortfolio();
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All' ? skills : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-black/5 dark:bg-[#070707] border-y border-black/5 dark:border-white/5">
      
      {/* Background aurora lights */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[160px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[160px] -z-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <Icons.Cpu className="w-3.5 h-3.5" />
              <span>TECHNOLOGIES</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-4 tracking-tight">
              My Core <span className="text-stroke">Tech Stack</span>
            </h2>
            
            <p className="text-black/60 dark:text-white/60 leading-relaxed text-base italic">
              A curated selection of modern, high-performance tools I've mastered to translate complex software requirements into lightweight, responsive digital applications.
            </p>
          </motion.div>

          {/* Frosted Tab Bar */}
          <div className="flex flex-wrap gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-none",
                  activeTab === cat 
                    ? "bg-white dark:bg-white/10 text-primary dark:text-white shadow-md border border-white/10" 
                    : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                )}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skills Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => {
              const Icon = Icons[skill.icon] || Icons.Code;
              
              return (
                <motion.div
                  key={skill._id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative p-8 bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-none"
                  data-tech-logo={skill.logoUrl}
                >
                  {/* Glowing card outline on hover using brand color */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${skill.color || '#0071E3'}, transparent 70%)` }}
                  />

                  {/* Brand Color Border Accent */}
                  <div 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r" 
                    style={{ 
                      backgroundColor: skill.color || '#0071E3',
                      width: '0%', 
                      transition: 'width 0.4s ease',
                      width: '100%',
                      opacity: 0.1,
                    }}
                  />

                  <div className="relative z-10">
                    
                    {/* SVG Icon Box with smooth translation */}
                    <div 
                      className="w-14 h-14 mb-6 flex items-center justify-center rounded-2xl border transition-all duration-300"
                      style={{ 
                        borderColor: `${skill.color || '#0071E3'}30`, 
                        backgroundColor: `${skill.color || '#0071E3'}10` 
                      }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" 
                        style={{ color: skill.color || '#0071E3' }}
                      />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1.5 block">
                      {skill.category}
                    </span>
                    
                    <h3 className="text-xl font-display font-bold mb-4 text-black dark:text-white group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    
                    {/* Dynamic Sleek Level Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="opacity-40 uppercase">EXPERTISE</span>
                        <span className="font-bold" style={{ color: skill.color || '#0071E3' }}>{skill.level}%</span>
                      </div>
                      <div className="relative h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ backgroundColor: skill.color || '#0071E3' }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Huge Decorative Background Number */}
                  <span className="absolute bottom-3 right-4 text-7xl font-display font-black opacity-[0.02] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
                    {skill.level}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Smooth Seamless Marquee of Tools & Ecosystem */}
        <div className="mt-28 relative overflow-hidden py-10 border-y border-black/5 dark:border-white/5">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap space-x-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-16 items-center shrink-0">
                {['Redux Toolkit', 'Zustand State', 'Axios Client', 'Postman Testing', 'Figma UX', 'Amazon AWS', 'Vercel Edge', 'Netlify Deploy', 'Jest Testing', 'Cypress Automation'].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 text-black dark:text-white font-semibold">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
