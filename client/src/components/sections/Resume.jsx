import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Eye, Download, X, Sparkles } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
              className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white/95 dark:bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
           >
              {/* Header block */}
              <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-white/40 dark:bg-black/20 backdrop-blur-md">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                       <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-black dark:text-white">Curriculum Vitae</h3>
                       <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 font-bold">Interactive Viewer</p>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4">
                    <a 
                       href="https://drive.google.com/file/d/1qCxemvSmWmH4OJen6_Xrc8xMfe-Af5n9/view?usp=sharing" 
                       target="_blank"
                       rel="noreferrer"
                       className="flex items-center space-x-2 px-6 py-2.5 bg-primary hover:bg-primary/95 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 transition-all cursor-none"
                       data-cursor="pointer"
                    >
                       <Download className="w-4 h-4" />
                       <span>Download File</span>
                    </a>
                    <button 
                      onClick={onClose} 
                      className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all cursor-none"
                      data-cursor="pointer"
                    >
                       <X className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* PDF Frame Section */}
              <div className="flex-1 overflow-hidden bg-black/5 dark:bg-white/5 p-4 md:p-8">
                 <div className="h-full w-full bg-white shadow-2xl overflow-hidden rounded-2xl flex items-center justify-center text-black">
                      <iframe 
                        src="https://drive.google.com/file/d/1qCxemvSmWmH4OJen6_Xrc8xMfe-Af5n9/preview" 
                        title="Resume PDF Viewer"
                        className="w-full h-full border-none"
                        allow="autoplay"
                      />
                 </div>
              </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Resume = () => {
  const { isResumeModalOpen, setIsResumeModalOpen } = usePortfolio();

  return (
    <section id="resume" className="py-10 relative overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* Background radial glowing ball */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="relative group cursor-none" data-cursor="view" onClick={() => setIsResumeModalOpen(true)}>
           
           {/* Moving gradient outline plate */}
           <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-blue-400 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000" />
           
           <div className="relative bg-white/40 dark:bg-black/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 dark:border-white/5 overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
              
              {/* Left Column (Wireframe Snapshot) */}
              <div className="w-full md:w-[22%] aspect-[3/4] bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 shadow-2xl rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-500 relative overflow-hidden shrink-0">
                 {/* Visual grid backplate */}
                 <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                   backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }} />

                 <div className="h-4 w-1/2 bg-primary/20 rounded-md mb-6" />
                 <div className="h-2 w-full bg-black/10 dark:bg-white/10 mb-2.5 rounded-full" />
                 <div className="h-2 w-full bg-black/10 dark:bg-white/10 mb-2.5 rounded-full" />
                 <div className="h-2 w-3/4 bg-black/10 dark:bg-white/10 mb-12 rounded-full" />
                 
                 <div className="space-y-4">
                    <div className="h-3 w-1/3 bg-primary/20 rounded-md" />
                    <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full" />
                    <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full" />
                    <div className="h-3 w-1/3 bg-blue-500/20 mt-8 rounded-md" />
                    <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full" />
                    <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full" />
                 </div>

                 {/* Custom glowing thumbprint */}
                 <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                 </div>

                 {/* Laser Scanner Effect */}
                 <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "400%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(0,113,227,0.8)] z-20"
                 />
              </div>

              {/* Right Column (Typographic Pitch) */}
              <div className="flex-1 text-center md:text-left relative z-10">
                 
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CURRICULUM VITAE</span>
                 </div>

                 <h2 className="text-4xl md:text-5xl font-display font-black uppercase mb-4 tracking-tight text-black dark:text-white leading-none">
                    The <span className="text-stroke">Paperwork.</span>
                 </h2>
                 <p className="text-sm text-black/60 dark:text-white/60 mb-6 italic leading-relaxed font-semibold">
                    A highly comprehensive chronological catalog detailing my verified academic backgrounds, custom startup designs, production full-stack developments, and the competitive hackathons won.
                 </p>
                 
                 <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <button 
                       id="resume-btn"
                       onClick={() => setIsResumeModalOpen(true)}
                       className="group relative px-10 py-4.5 bg-primary hover:bg-primary/95 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/25 overflow-hidden transition-all flex items-center justify-center space-x-3 w-full md:w-auto cursor-none"
                       data-cursor="pointer"
                    >
                       <Eye className="w-4 h-4" />
                       <span>Launch Interactive Resume</span>
                    </button>
                    
                    <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-mono italic">
                       NO AUTO-DOWNLOAD TRIGGERED
                    </span>
                 </div>
              </div>

           </div>
        </div>
      </div>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
};
