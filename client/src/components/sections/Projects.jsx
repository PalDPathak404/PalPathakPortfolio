import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Play, Sparkles, Folder, Maximize, Minimize, Youtube } from 'lucide-react';
import { cn } from '../../lib/utils.js';

const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  const [viewMode, setViewMode] = useState('thumbnail');
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-[250] flex items-center justify-center overflow-hidden transition-all duration-300",
        isFullscreen ? "p-0" : "p-4 md:p-12"
      )}
    >
      {/* Heavy frosted overlay behind the theater modal */}
      <div 
        className="absolute inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <motion.div
        layoutId={`project-${project._id}`}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className={cn(
          "relative bg-white/95 dark:bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/20 dark:border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300",
          isFullscreen ? "w-full h-full max-w-none max-h-none rounded-none" : "w-full max-w-6xl h-full max-h-[85vh] rounded-3xl"
        )}
      >
        {/* Left: Interactive Stage (Thumbnail / Video / Live) */}
        <div className={cn("bg-[#030303] flex items-center justify-center relative overflow-hidden group", isFullscreen ? "w-full" : "w-full md:w-3/5")}>
          {/* Subtle vignette back drop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10 pointer-events-none" />

          {viewMode === 'live' && project.liveUrl ? (
            <div className="w-full h-full relative z-0">
               <iframe 
                 src={project.liveUrl}
                 title={`${project.title} live preview`}
                 className="absolute inset-0 w-full h-full border-0 bg-white"
                 sandbox="allow-same-origin allow-scripts"
               />
               <div className="absolute top-4 left-4 z-20 flex gap-2">
                 <button 
                   onClick={() => setViewMode('thumbnail')}
                   className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold rounded-lg hover:bg-black transition-colors cursor-none border border-white/20"
                   data-cursor="pointer"
                 >
                   Back to Media
                 </button>
                 <button 
                   onClick={() => setIsFullscreen(!isFullscreen)}
                   className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white rounded-lg hover:bg-black transition-colors cursor-none border border-white/20 flex items-center justify-center"
                   data-cursor="pointer"
                   title="Toggle Fullscreen"
                 >
                   {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                 </button>
               </div>
            </div>
          ) : project.youtubeId ? (
            <div className="w-full h-full relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1`}
                title={project.title}
                className="absolute top-0 left-0 w-full h-full border-0 z-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img 
                src={project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[2s]" 
              />
              {project.liveUrl && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => setViewMode('live')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-primary/90 text-white backdrop-blur-md border border-white/30 rounded-xl shadow-2xl transition-all font-bold tracking-widest text-[10px] uppercase cursor-none"
                    data-cursor="pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> View Live
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Nav arrows: absolute Apple-style rounded plates */}
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 dark:bg-black/40 hover:bg-white/20 dark:hover:bg-white/10 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/5 transition-all active:scale-90 z-20 cursor-none"
            data-cursor="pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 dark:bg-black/40 hover:bg-white/20 dark:hover:bg-white/10 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/5 transition-all active:scale-90 z-20 cursor-none"
            data-cursor="pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Right: Technical Details Panel (Frosted Sidebar) */}
        <div className={cn("w-full md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between bg-white/20 dark:bg-black/10", isFullscreen ? "hidden" : "flex")}>
          
          {/* Close button top right */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2.5 bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all z-20 cursor-none"
            data-cursor="pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex flex-wrap gap-2 items-center mb-6 mt-4">
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] uppercase font-bold tracking-widest rounded-md">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] uppercase font-bold tracking-widest rounded-md">
                {project.subCategory}
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-6 text-black dark:text-white">
              {project.title}
            </h3>
            
            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-8 whitespace-pre-line font-medium">
              {project.longDescription || project.description}
            </p>

            {/* Core Stack Block */}
            <div className="mb-10">
              <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-40 font-bold mb-4">
                CORE ECOSYSTEM
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 text-[10px] font-mono text-black/80 dark:text-white/80 rounded-lg font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons footer */}
          <div className="flex flex-wrap gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/15 text-black dark:text-white font-bold uppercase text-[9px] tracking-widest rounded-xl transition-all cursor-none min-w-[120px]"
                data-cursor="pointer"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}
            {project.youtubeUrl && (
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 text-[#FF0000] font-bold uppercase text-[9px] tracking-widest rounded-xl transition-all cursor-none min-w-[120px]"
                data-cursor="pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>Video</span>
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/95 text-white font-bold uppercase text-[9px] tracking-widest rounded-xl transition-all shadow-lg shadow-primary/20 cursor-none min-w-[120px]"
                data-cursor="pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Launch</span>
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

import { useMotionValue, useSpring, useTransform } from 'motion/react';

const ProjectCard = ({ project, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        layout
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className="group relative bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-none"
        data-cursor="pointer"
      >
        {/* Thumbnail block */}
        <div className="relative aspect-[4/3] overflow-hidden" style={{ transform: "translateZ(30px)" }}>
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center gap-2">
              <Folder className="w-10 h-10 text-primary/40" />
              <span className="text-[10px] font-mono opacity-40 uppercase">No Media Available</span>
            </div>
          )}

          {/* Hover glass cover plate */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none z-10">
            <div className="w-14 h-14 bg-white/25 border border-white/30 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 backdrop-blur-md shadow-lg">
              <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
            </div>
          </div>
          
          {/* Subcategory float badge */}
          <div className="absolute top-4 left-4 z-10" style={{ transform: "translateZ(40px)" }}>
             <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[8px] uppercase font-bold tracking-widest border border-white/20 rounded-md shadow-md">
               {project.subCategory}
             </span>
          </div>
        </div>

        {/* Details Box */}
        <div className="p-8" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-2xl font-display font-bold text-black dark:text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-2">
               {project.githubUrl && (
                 <a 
                   href={project.githubUrl} 
                   target="_blank" 
                   rel="noreferrer"
                   className="p-1 hover:text-primary text-black/50 dark:text-white/50 transition-colors cursor-none"
                   onClick={(e) => e.stopPropagation()}
                   data-cursor="pointer"
                 >
                   <Github className="w-4 h-4" />
                 </a>
               )}
               {project.youtubeUrl && (
                 <a 
                   href={project.youtubeUrl} 
                   target="_blank" 
                   rel="noreferrer"
                   className="p-1 hover:text-[#FF0000] text-black/50 dark:text-white/50 transition-colors cursor-none"
                   onClick={(e) => e.stopPropagation()}
                   data-cursor="pointer"
                 >
                   <Youtube className="w-4 h-4" />
                 </a>
               )}
               {project.liveUrl && (
                 <a 
                   href={project.liveUrl} 
                   target="_blank" 
                   rel="noreferrer"
                   className="p-1 hover:text-primary text-black/50 dark:text-white/50 transition-colors cursor-none"
                   onClick={(e) => e.stopPropagation()}
                   data-cursor="pointer"
                 >
                   <ExternalLink className="w-4 h-4" />
                 </a>
               )}
            </div>
          </div>
          
          <p className="text-xs text-black/50 dark:text-white/50 mb-6 line-clamp-2 italic font-medium leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(10px)" }}>
             {project.tags.slice(0, 3).map(tag => (
               <span key={tag} className="text-[9px] font-mono uppercase tracking-wider bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-2 py-0.5 rounded-md text-black/60 dark:text-white/60">
                 #{tag}
               </span>
             ))}
          </div>

          <button 
             className="w-full py-3.5 border border-black/10 dark:border-white/10 text-[9px] font-bold uppercase tracking-widest relative group/btn overflow-hidden rounded-xl bg-white/10 dark:bg-white/5 shadow-sm"
             onClick={onClick}
          >
             <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
             <span className="relative z-10 group-hover/btn:text-white transition-colors">Discover Project</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects = () => {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('personal');
  const [activeSubCategory, setActiveSubCategory] = useState('Frontend Clones');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const filteredProjects = projects.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeCategory === 'personal' && p.subCategory !== activeSubCategory) return false;
    return true;
  });
  
  const selectedProject = projects.find(p => p._id === selectedProjectId);
  const selectedIndex = filteredProjects.findIndex(p => p._id === selectedProjectId);

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[nextIndex]._id);
  };

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[prevIndex]._id);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* Background radial soft aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading Theater */}
        <div className="text-center mb-16">
           <motion.div
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4"
           >
             <Sparkles className="w-3.5 h-3.5" />
             <span>PORTFOLIO WORK</span>
           </motion.div>

           <motion.h2 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-display font-black uppercase mb-8 tracking-tight"
           >
             Featured <span className="text-stroke">Creations</span>
           </motion.h2>

           {/* Elegant Glass Tabs */}
           <div className="inline-flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-xl mb-8">
              {['personal', 'hackathon', 'leetcode'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(3); }}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-none",
                    activeCategory === cat 
                      ? "bg-white dark:bg-white/10 text-primary dark:text-white shadow-md border border-white/10" 
                      : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                  )}
                  data-cursor="pointer"
                >
                  {cat === 'leetcode' ? 'Leetcode Directory' : `${cat} Projects`}
                </button>
              ))}
           </div>

           {/* Sub Categories for Personal Projects */}
           <AnimatePresence>
             {activeCategory === 'personal' && (
               <motion.div 
                 initial={{ opacity: 0, height: 0, y: -10 }}
                 animate={{ opacity: 1, height: 'auto', y: 0 }}
                 exit={{ opacity: 0, height: 0, y: -10 }}
                 className="flex flex-wrap justify-center gap-3 overflow-hidden"
               >
                 {['Full Stack', 'Frontend Clones', 'Backend Projects', 'Apps'].map((subCat) => (
                   <button
                     key={subCat}
                     onClick={() => { setActiveSubCategory(subCat); setVisibleCount(3); }}
                     className={cn(
                       "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border cursor-none",
                       activeSubCategory === subCat
                         ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                         : "bg-transparent border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-primary/50 hover:text-primary"
                     )}
                     data-cursor="pointer"
                   >
                     {subCat}
                   </button>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Dynamic Responsive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence>
             {filteredProjects.slice(0, visibleCount).map((project, i) => (
               <ProjectCard key={project._id} project={project} onClick={() => setSelectedProjectId(project._id)} />
             ))}
           </AnimatePresence>
        </div>

        {/* Apple Style Reveal More mechanism */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-20 flex justify-center">
             <button 
               onClick={() => setVisibleCount(prev => prev + 3)}
               className="group relative px-10 py-4 bg-transparent border border-primary text-primary hover:text-white rounded-full overflow-hidden transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest cursor-none"
               data-cursor="pointer"
             >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                <span className="relative z-10">
                  Reveal More
                </span>
             </button>
          </div>
        )}
      </div>

      {/* Project Viewer Modal with heavy theater-backdrop */}
      <AnimatePresence>
        {selectedProjectId && selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProjectId(null)} 
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
