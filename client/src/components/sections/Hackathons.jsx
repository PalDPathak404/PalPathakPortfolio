import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { Trophy, Users, Code, Github, X, Target, Lightbulb, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils.js';

const HackathonModal = ({ hack, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  const nextImg = () => {
    if (hack.images) {
      setActiveImg((prev) => (prev + 1) % hack.images.length);
    }
  };

  const prevImg = () => {
    if (hack.images) {
      setActiveImg((prev) => (prev - 1 + hack.images.length) % hack.images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-5xl bg-white dark:bg-dark-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/5 dark:bg-white/10 rounded-full z-20 hover:rotate-90 transition-transform">
          <X className="w-6 h-6" />
        </button>

        {/* Left: Imagery Gallery */}
        <div className="w-full md:w-1/2 bg-black flex flex-col h-[300px] md:h-auto relative group/gal">
           <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                 <motion.img 
                    key={activeImg}
                    src={hack.images?.[activeImg] || `https://picsum.photos/seed/${hack._id}/1200/800`} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    alt={hack.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                 />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              
              {/* Navigation Arrows */}
              {hack.images && hack.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImg(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/gal:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImg(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/gal:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hack.images && hack.images.length > 1 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-mono">
                  {activeImg + 1} / {hack.images.length}
                </div>
              )}
           </div>

           {/* Thumbnail Strip */}
           {hack.images && hack.images.length > 1 && (
             <div className="flex gap-1 p-2 bg-black/80 overflow-x-auto no-scrollbar">
               {hack.images.map((img, i) => (
                 <button
                   key={i}
                   onClick={() => setActiveImg(i)}
                   className={cn(
                     "w-16 h-12 rounded-md overflow-hidden shrink-0 transition-all border-2",
                     activeImg === i ? "border-primary opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                   )}
                 >
                   <img src={img} alt={`${hack.name} ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-dark-surface">
           <div className="space-y-8">
              <header>
                 <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                    <Trophy className="w-3 h-3" />
                    <span>{hack.outcome}</span>
                 </div>
                 <h3 className="text-4xl font-display font-black uppercase mb-2">{hack.name}</h3>
                 <p className="text-sm opacity-50 font-mono italic">{hack.date} • Team of {hack.teamSize || 1}</p>
              </header>

              <section>
                 <div className="flex items-center space-x-3 mb-4 opacity-30 italic">
                    <Target className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">The Challenge</span>
                 </div>
                 <p className="text-base text-black/80 dark:text-white/80 leading-relaxed font-medium">
                    {hack.problemStatement}
                 </p>
              </section>

              <section>
                 <div className="flex items-center space-x-3 mb-4 opacity-30 italic">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Our Solution</span>
                 </div>
                 <div className="bg-black/5 dark:bg-white/5 p-6 border-l-4 border-primary rounded-r-2xl mb-4">
                    <p className="text-black/70 dark:text-white/70 leading-relaxed font-medium italic">
                       {hack.solution}
                    </p>
                 </div>
                 <p className="text-black/60 dark:text-white/60 leading-relaxed whitespace-pre-line text-sm">
                    {hack.longSolution}
                 </p>
              </section>

              {/* Highlights */}
              {hack.highlights && hack.highlights.length > 0 && (
                <section>
                  <div className="flex items-center space-x-3 mb-4 opacity-30 italic">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Key Highlights</span>
                  </div>
                  <div className="space-y-2">
                    {hack.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span className="text-sm text-black/70 dark:text-white/70">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                 <div className="flex items-center space-x-3 mb-4 opacity-30 italic">
                    <Code className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Stack</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {hack.techStack.map(tech => (
                       <span key={tech} className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-lg text-xs font-mono uppercase">
                          {tech}
                       </span>
                    ))}
                 </div>
              </section>

              <div className="pt-6 border-t border-black/5 dark:border-white/5 flex gap-4">
                 {hack.repoUrl && (
                    <a href={hack.repoUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black text-center text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-xl flex items-center justify-center space-x-2">
                       <Github className="w-4 h-4" />
                       <span>GitHub Repo</span>
                    </a>
                 )}
                 {hack.demoUrl && (
                    <a href={hack.demoUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-primary text-white text-center text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-xl flex items-center justify-center space-x-2">
                       <ExternalLink className="w-4 h-4" />
                       <span>Live Demo</span>
                    </a>
                 )}
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Hackathons = () => {
  const { hackathons } = usePortfolio();
  const [selectedHackId, setSelectedHackId] = useState(null);
  const selectedHack = hackathons.find(h => h._id === selectedHackId);

  return (
    <section id="hackathons" className="py-24 bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-6xl md:text-8xl font-display font-black uppercase mb-8"
           >
             Hackathon <br />
             <span className="text-stroke">Excursions</span>
           </motion.h2>
           <p className="opacity-50 italic max-w-xl mx-auto">
             Intense coding marathons where speed meets innovation. Click to explore our journey.
           </p>
        </div>

        <div className="space-y-12">
           {hackathons.map((hack, i) => (
             <motion.div
               key={hack._id}
               initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               onClick={() => setSelectedHackId(hack._id)}
               className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-black p-8 md:p-12 border border-black/10 dark:border-white/10 group hover:border-primary/50 transition-all rounded-3xl cursor-pointer"
             >
                {/* Visual Rank/Award */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center border-r border-black/5 dark:border-white/5 pr-8">
                   <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                      <Trophy className="w-10 h-10 text-primary" />
                   </div>
                   <span className="text-2xl font-display font-black tracking-widest uppercase">{hack.outcome}</span>
                   <span className="text-[10px] font-mono opacity-30 mt-1">{hack.date}</span>
                   {hack.images && (
                     <span className="text-[9px] font-mono text-primary mt-2">{hack.images.length} photos</span>
                   )}
                </div>

                {/* Info */}
                <div className="lg:col-span-10 flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="flex-1">
                      <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{hack.name}</h3>
                      <div className="space-y-4">
                         <p className="text-black/60 dark:text-white/60 leading-relaxed italic line-clamp-2">
                           <span className="font-bold text-black dark:text-white not-italic uppercase text-[10px] tracking-widest border-b border-black/10 mr-2">Core Theme:</span> {hack.theme}
                         </p>
                         
                         <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center space-x-2 text-xs opacity-50">
                               <Users className="w-4 h-4" />
                               <span>Team of {hack.teamSize || 1}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs opacity-50">
                               <Code className="w-4 h-4" />
                               <div className="flex gap-2">
                                  {hack.techStack.map(t => <span key={t} className="px-2 py-0.5 border border-black/10 dark:border-white/10">{t}</span>)}
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Call to Action */}
                   <div className="group/btn flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary whitespace-nowrap">
                      <span>Explore Story</span>
                      <div className="w-12 h-[1px] bg-primary group-hover/btn:w-20 transition-all" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedHackId && selectedHack && (
          <HackathonModal hack={selectedHack} onClose={() => setSelectedHackId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
