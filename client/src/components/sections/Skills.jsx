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
    <section id="skills" className="py-24 bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold uppercase mb-4">
              Arsenal of <br />
              <span className="text-stroke">Technologies</span>
            </h2>
            <p className="text-black/50 dark:text-white/50 max-w-sm italic">
              A curated selection of tools I've mastered to bring digital visions to life.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === cat 
                    ? "bg-black dark:bg-white text-white dark:text-black" 
                    : "border border-black/10 dark:border-white/10 hover:border-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, i) => {
              const Icon = Icons[skill.icon] || Icons.Code;
              return (
                <motion.div
                  key={skill._id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-tech-logo={skill.logoUrl}
                  className="group relative p-8 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-primary/50 transition-all overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-6 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-xl group-hover:bg-primary transition-colors">
                      <Icon className="w-6 h-6 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-4">{skill.name}</h3>
                    
                    {/* Progress Bar */}
                    <div className="relative h-1 bg-black/5 dark:bg-white/5 overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute top-0 left-0 h-full bg-primary"
                       />
                    </div>
                  </div>

                  {/* Backdrop Number */}
                  <span className="absolute bottom-4 right-4 text-6xl font-display font-black opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
                    {skill.level}%
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Marquee Secondary Skills */}
        <div className="mt-24 relative overflow-hidden py-10 border-y border-black/5 dark:border-white/5">
           <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap space-x-12">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-12 items-center">
                  {['Redux', 'Zustand', 'Axios', 'Postman', 'Figma', 'AWS', 'Vercel', 'Netlify', 'Jest', 'Cypress'].map((s) => (
                    <span key={s} className="text-sm font-mono uppercase tracking-[0.4em] opacity-30">
                      {s}
                    </span>
                  ))}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
