import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../../lib/utils.js';

const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12"
    >
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div
        layoutId={`project-${project._id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left: Video/Thumbnail */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative group">
          {project.youtubeId ? (
            <div className="w-full h-full relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1`}
                title={project.title}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          )}

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full z-20">
            <X className="w-6 h-6" />
          </button>

          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest rounded-full">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] uppercase font-bold tracking-widest rounded-full">
                {project.subCategory}
              </span>
            </div>
            
            <h3 className="text-4xl font-display font-bold mb-6">{project.title}</h3>
            
            <p className="text-black/60 dark:text-white/60 leading-relaxed mb-8 whitespace-pre-line">
              {project.longDescription}
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest opacity-50 font-bold mb-4 italic">Core Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 border border-black/10 dark:border-white/10 text-xs font-mono uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:opacity-90 transition-opacity">
                    <Github className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 py-4 bg-primary text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:opacity-90 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden cursor-none" data-cursor="view">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-6 h-6 text-black fill-current" />
            </div>
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
           <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[8px] uppercase font-bold tracking-widest rounded-full">
             {project.subCategory}
           </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">{project.title}</h3>
          <div className="flex space-x-3">
             {project.githubUrl && (
               <a 
                 href={project.githubUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="p-1 hover:text-primary transition-colors"
                 onClick={(e) => e.stopPropagation()}
               >
                 <Github className="w-5 h-5" />
               </a>
             )}
             {project.liveUrl && (
               <a 
                 href={project.liveUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="p-1 hover:text-primary transition-colors"
                 onClick={(e) => e.stopPropagation()}
               >
                 <ExternalLink className="w-5 h-5" />
               </a>
             )}
          </div>
        </div>
        
        <p className="text-sm text-black/50 dark:text-white/50 mb-6 line-clamp-2 italic">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
           {project.tags.slice(0, 3).map(tag => (
             <span key={tag} className="text-[10px] font-mono uppercase tracking-wider opacity-60">#{tag}</span>
           ))}
        </div>

        <button 
           className="w-full py-4 border border-black/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] relative group/btn overflow-hidden"
           onClick={onClick}
        >
           <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
           <span className="relative z-10 group-hover/btn:text-white transition-colors">Discover Project</span>
        </button>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('personal');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const filteredProjects = projects.filter(p => p.category === activeCategory);
  
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
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-6xl md:text-8xl font-display font-black uppercase mb-8"
           >
             Featured <br />
             <span className="text-stroke">Creations</span>
           </motion.h2>

           {/* Category Toggle */}
           <div className="flex justify-center space-x-12 mb-12">
              {['personal', 'hackathon'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(3); }}
                  className={cn(
                    "relative py-4 text-sm font-bold uppercase tracking-[0.3em] transition-all",
                    activeCategory === cat ? "text-primary" : "text-black/30 dark:text-white/30"
                  )}
                >
                  {cat} Projects
                  {activeCategory === cat && (
                    <motion.div layoutId="catLine" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
                  )}
                </button>
              ))}
           </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence>
             {filteredProjects.slice(0, visibleCount).map((project, i) => (
               <ProjectCard key={project._id} project={project} onClick={() => setSelectedProjectId(project._id)} />
             ))}
           </AnimatePresence>
        </div>

        {/* Reveal More Mechanism */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-20 flex justify-center">
             <button 
               onClick={() => setVisibleCount(prev => prev + 3)}
               className="group relative px-12 py-6 bg-transparent border-2 border-primary rounded-full overflow-hidden"
             >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-display font-bold text-xl uppercase tracking-[0.2em] group-hover:text-white">
                  Reveal More
                </span>
             </button>
          </div>
        )}
      </div>

      {/* Project Viewer Modal */}
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
