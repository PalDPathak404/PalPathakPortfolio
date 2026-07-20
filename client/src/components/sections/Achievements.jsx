import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import * as Icons from 'lucide-react';

export const Achievements = () => {
  const { achievements } = usePortfolio();

  return (
    <section id="achievements" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-black uppercase mb-8"
          >
            Trophy <br />
            <span className="text-stroke">Cabinet</span>
          </motion.h2>
          <p className="opacity-50 italic uppercase tracking-[0.2em] text-xs">Milestones and recognitions on my professional path.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {achievements.map((ach, i) => {
            const Icon = Icons[ach.icon || 'Award'] || Icons.Award;
            return (
              <motion.div
                key={ach._id}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: i * 0.1 }}
                className="group bg-white dark:bg-black p-8 border border-black/10 dark:border-white/10 hover:bg-primary transition-all duration-500 rounded-2xl flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-display font-bold group-hover:text-white mb-2 transition-colors">{ach.title}</h3>
                <p className="text-sm opacity-50 group-hover:text-white/70 mb-4 transition-colors">{ach.description}</p>
                <div className="text-[10px] font-mono opacity-30 group-hover:text-white/50 transition-colors uppercase">{ach.date}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Marquee of Badges */}
      <div className="relative py-12 border-y border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap space-x-24">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-24 items-center">
              {['GOOGLE CLOUD', 'MICROSOFT AZURE', 'HACKERRANK PLATINUM', 'CODECHEF 5*', 'LEETCODE TOP 1%', 'MONGODB CERTIFIED', 'REACT DEVELOPER', 'GITHUB STAR'].map((badge) => (
                <span key={badge} className="text-2xl font-display font-black text-black/10 dark:text-white/10 select-none">
                  {badge}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
