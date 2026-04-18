import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Eye, Download, X, GraduationCap, Briefcase, Mail, Phone } from 'lucide-react';

// For react-pdf-viewer
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const resumeUrl = '/resume.pdf'; // Placeholder path

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
        >
           <div className="absolute inset-0" onClick={onClose} />
           
           <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative w-full max-w-6xl h-full bg-white dark:bg-dark-surface rounded-3xl overflow-hidden flex flex-col"
           >
              {/* Header */}
              <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-white dark:bg-black">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                       <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold">Curriculum Vitae</h3>
                       <p className="text-[10px] uppercase tracking-widest opacity-50">Interactive Viewer</p>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4">
                    <a 
                       href="https://drive.google.com/file/d/1y0PLuzB7oV0cojpOvJnKF85wL_LyipvM/view?usp=sharing" 
                       target="_blank"
                       rel="noreferrer"
                       className="flex items-center space-x-2 px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                       <Download className="w-4 h-4" />
                       <span>Download / View</span>
                    </a>
                    <button onClick={onClose} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
                       <X className="w-6 h-6" />
                    </button>
                 </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden bg-black/5 dark:bg-white/5 p-4 md:p-12">
                 <div className="h-full w-full bg-white shadow-2xl overflow-hidden rounded-t-xl flex items-center justify-center text-black">
                     <iframe 
                       src="https://drive.google.com/file/d/1y0PLuzB7oV0cojpOvJnKF85wL_LyipvM/preview" 
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
    <section id="resume" className="py-24 bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative group cursor-none" data-cursor="view" onClick={() => setIsResumeModalOpen(true)}>
           {/* Visual Preview Card */}
           <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
           
           <div className="relative bg-white dark:bg-black p-12 md:p-20 rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col md:flex-row items-center gap-12">
              {/* Left Column (Snapshot) */}
              <div className="w-full md:w-1/3 aspect-[3/4] bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500">
                 <div className="h-4 w-1/2 bg-black/10 dark:bg-white/20 mb-4" />
                 <div className="h-2 w-full bg-black/5 dark:bg-white/10 mb-2" />
                 <div className="h-2 w-full bg-black/5 dark:bg-white/10 mb-2" />
                 <div className="h-2 w-3/4 bg-black/5 dark:bg-white/10 mb-12" />
                 
                 <div className="space-y-4">
                    <div className="h-3 w-1/3 bg-primary/20" />
                    <div className="h-2 w-full bg-black/5 dark:bg-white/10" />
                    <div className="h-2 w-full bg-black/5 dark:bg-white/10" />
                    <div className="h-3 w-1/3 bg-primary/20 mt-8" />
                    <div className="h-2 w-full bg-black/5 dark:bg-white/10" />
                    <div className="h-2 w-full bg-black/5 dark:bg-white/10" />
                 </div>
              </div>

              {/* Right Column (Content) */}
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-8">
                    The <br />
                    <span className="text-stroke">Paperwork</span>
                 </h2>
                 <p className="text-xl text-black/60 dark:text-white/60 mb-12 italic leading-relaxed">
                    A comprehensive overview of my technical expertise, academic background, 
                    and the milestones that define my professional identity.
                 </p>
                 
                 <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <button 
                       id="resume-btn"
                       onClick={() => setIsResumeModalOpen(true)}
                       className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest overflow-hidden transition-all flex items-center justify-center space-x-3 w-full md:w-auto"
                    >
                       <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       <Eye className="relative z-10 w-5 h-5" />
                       <span className="relative z-10">View Resume</span>
                    </button>
                    
                    <span className="text-xs uppercase tracking-[0.4em] opacity-30 font-mono italic">
                       NO AUTO-DOWNLOAD
                    </span>
                 </div>
              </div>

              {/* Abstract Bg Graphics */}
              <div className="absolute -top-10 -right-10 w-64 h-64 border border-black/5 dark:border-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
           </div>
        </div>
      </div>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
};
