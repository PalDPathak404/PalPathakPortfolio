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
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/85 dark:bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="relative w-full max-w-5xl bg-white/95 dark:bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2.5 bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white rounded-full z-20 hover:rotate-90 transition-transform cursor-none"
          data-cursor="pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Imagery Gallery */}
        <div className="w-full md:w-1/2 bg-[#020202] flex flex-col h-[300px] md:h-auto relative group/gal">
           <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              <AnimatePresence>
                 <motion.img 
                    key={activeImg}
                    src={hack.images?.[activeImg] || `https://picsum.photos/seed/${hack._id}/1200/800`} 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    alt={hack.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                 />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 pointer-events-none" />
              
              {/* Navigation Arrows */}
              {hack.images && hack.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImg(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/15 transition-all opacity-0 group-hover/gal:opacity-100 cursor-none"
                    data-cursor="pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImg(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/15 transition-all opacity-0 group-hover/gal:opacity-100 cursor-none"
                    data-cursor="pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hack.images && hack.images.length > 1 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white text-[10px] font-mono font-bold tracking-wider">
                  {activeImg + 1} / {hack.images.length}
                </div>
              )}
           </div>

           {/* Thumbnail Strip */}
           {hack.images && hack.images.length > 1 && (
             <div className="flex gap-2 p-3 bg-black/40 border-t border-white/10 overflow-x-auto no-scrollbar justify-center">
               {hack.images.map((img, i) => (
                 <button
                   key={i}
                   onClick={() => setActiveImg(i)}
                   className={cn(
                     "w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-none",
                     activeImg === i ? "border-primary opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-70"
                   )}
                   data-cursor="pointer"
                 >
                   <img src={img} alt={`${hack.name} ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white/20 dark:bg-black/10 flex flex-col justify-between">
           <div className="space-y-8">
              <header className="relative">
                 <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-bold uppercase tracking-widest rounded-md mb-4 shadow-sm shadow-blue-500/5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{hack.outcome}</span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-2 text-black dark:text-white">{hack.name}</h3>
                 <p className="text-[10px] opacity-40 font-mono tracking-widest uppercase">{hack.date} • Team size: {hack.teamSize || 1}</p>
              </header>

              <section className="bg-black/5 dark:bg-white/5 p-5 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2 mb-3 opacity-50 font-bold text-black dark:text-white">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">The Problem</span>
                 </div>
                 <p className="text-sm text-black/80 dark:text-white/80 leading-relaxed font-semibold">
                    {hack.problemStatement}
                 </p>
              </section>

              <section>
                 <div className="flex items-center gap-2 mb-3 opacity-50 font-bold text-black dark:text-white">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Our Solution</span>
                  </div>
                  <div className="bg-primary/5 p-5 border-l-4 border-primary rounded-r-2xl mb-4 shadow-sm shadow-primary/5">
                     <p className="text-sm text-black/80 dark:text-white/85 leading-relaxed font-semibold italic">
                        {hack.solution}
                     </p>
                  </div>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed whitespace-pre-line text-xs font-medium">
                     {hack.longSolution}
                  </p>
              </section>

              {/* Highlights */}
              {hack.highlights && hack.highlights.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3 opacity-50 font-bold text-black dark:text-white">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Project Highlights</span>
                  </div>
                  <div className="space-y-2">
                    {hack.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 p-3 bg-white/5 border border-white/5 rounded-xl"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span className="text-xs text-black/70 dark:text-white/70 font-semibold">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                 <div className="flex items-center gap-2 mb-3 opacity-50 font-bold text-black dark:text-white">
                    <Code className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Technologies Deployed</span>
                 </div>
                 <div className="flex flex-wrap gap-1.5">
                    {hack.techStack.map(tech => (
                       <span key={tech} className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-lg text-[10px] font-mono uppercase font-bold text-black/80 dark:text-white/80">
                          {tech}
                       </span>
                    ))}
                 </div>
              </section>
           </div>

           {/* Call to action buttons */}
           <div className="pt-6 mt-8 border-t border-black/10 dark:border-white/10 flex gap-4">
              {hack.repoUrl && (
                 <a 
                   href={hack.repoUrl} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex-1 py-3.5 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/15 text-black dark:text-white text-center text-[9px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 cursor-none"
                   data-cursor="pointer"
                 >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                 </a>
              )}
              {hack.demoUrl && (
                 <a 
                   href={hack.demoUrl} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex-1 py-3.5 bg-primary hover:bg-primary/95 text-white text-center text-[9px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 cursor-none"
                   data-cursor="pointer"
                 >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                 </a>
              )}
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
    <section id="hackathons" className="py-32 relative overflow-hidden bg-black/5 dark:bg-[#070707] border-y border-black/5 dark:border-white/5">
      
      {/* Background soft glowing blur */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Theater */}
        <div className="text-center mb-24">
           <motion.div
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-500 mb-4"
           >
             <Trophy className="w-3.5 h-3.5" />
             <span>COMPETITIVE HIGHLIGHTS</span>
           </motion.div>

           <motion.h2 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-display font-black uppercase mb-8 tracking-tight"
           >
             Hackathon <span className="text-stroke">Excursions</span>
           </motion.h2>
           <p className="text-black/50 dark:text-white/50 italic max-w-xl mx-auto">
             Intense developer marathons where rapid ideation meets fast architecture. Click to explore our journey.
           </p>
        </div>

        {/* Timelines of Hackathons */}
        <div className="space-y-10">
           {hackathons.map((hack, i) => (
             <motion.div
               key={hack._id}
               initial={{ y: 30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               onClick={() => setSelectedHackId(hack._id)}
               className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 md:p-12 group hover:border-primary/50 transition-all rounded-3xl cursor-none shadow-md hover:shadow-xl"
               data-cursor="pointer"
             >
                {/* Visual Rank/Award Badge */}
                <div className="lg:col-span-3 flex flex-col items-center justify-center lg:border-r border-black/10 dark:border-white/10 lg:pr-8">
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                      <Trophy className="w-8 h-8 text-primary" />
                   </div>
                   <span className="text-xl font-display font-black tracking-widest uppercase text-black dark:text-white text-center">
                     {hack.outcome}
                   </span>
                   <span className="text-[10px] font-mono opacity-30 mt-1 uppercase tracking-wider font-bold">
                     {hack.date}
                   </span>
                </div>

                {/* Info summary */}
                <div className="lg:col-span-9 flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-black dark:text-white group-hover:text-primary transition-colors">
                        {hack.name}
                      </h3>
                      <div className="space-y-4">
                         <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed italic font-medium">
                            <span className="font-mono uppercase font-bold text-black dark:text-white text-[9px] tracking-widest bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md not-italic mr-2">
                              Theme:
                            </span> 
                            {hack.theme || 'Open Innovation'}
                         </p>
                         
                         <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-40 uppercase font-bold">
                               <Users className="w-3.5 h-3.5 text-primary" />
                               <span>Team: {hack.teamSize || 1} members</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-40 uppercase font-bold">
                               <Code className="w-3.5 h-3.5 text-primary" />
                               <div className="flex flex-wrap gap-1.5">
                                  {hack.techStack.slice(0, 3).map(t => (
                                    <span key={t} className="bg-black/5 dark:bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                                      {t}
                                    </span>
                                  ))}
                                  {hack.techStack.length > 3 && (
                                    <span className="opacity-50">+{hack.techStack.length - 3} more</span>
                                  )}
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Call to Action indicator */}
                   <div className="group/btn flex items-center gap-3 text-[9px] font-mono font-bold uppercase tracking-widest text-primary whitespace-nowrap">
                      <span>Explore Story</span>
                      <div className="w-10 h-[1.5px] bg-primary group-hover/btn:w-16 transition-all" />
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
