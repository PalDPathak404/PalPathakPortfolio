import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { X, ZoomIn, Download, Award } from 'lucide-react';
import { cn } from '../../lib/utils.js';

const CertificateModal = ({ cert, onClose }) => {
  const [zoom, setZoom] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 bg-black/95 transition-all"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl bg-white dark:bg-dark-surface rounded-2xl overflow-hidden flex flex-col items-center"
      >
        {/* Controls */}
        <div className="absolute top-6 right-6 flex items-center space-x-4 z-20">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md">
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          <a
            href={cert.imageUrl}
            download={`${cert.title}.jpg`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download Certificate</span>
          </a>
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="w-full overflow-auto p-12 flex justify-center custom-scrollbar h-[80vh]">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            className="max-w-full h-auto shadow-2xl origin-center"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full bg-white/5 dark:bg-black/40 backdrop-blur-md p-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div>
            <h3 className="text-2xl font-display font-bold">{cert.title}</h3>
            <p className="opacity-50 text-sm tracking-widest uppercase">{cert.issuer} • {cert.issueDate}</p>
          </div>
          <p className="max-w-md text-sm text-black/60 dark:text-white/60 italic">
            {cert.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 cursor-pointer flex flex-col items-center text-center rounded-xl"
    >
      <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
        <Award className="w-10 h-10 group-hover:text-white transition-colors" />
      </div>

      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden border border-black/5 dark:border-white/5 rounded-lg">
        <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
      </div>

      <h4 className="text-xl font-display font-bold mb-2">{cert.title}</h4>
      <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-4">{cert.issuer}</p>
      <span className="text-[10px] font-mono opacity-30">{cert.issueDate}</span>
    </motion.div>
  );
};

export const Certificates = () => {
  const { certificates } = usePortfolio();
  const [activeTab, setActiveTab] = useState('educational');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedCertId, setSelectedCertId] = useState(null);

  const filteredCerts = certificates.filter(c => c.category === activeTab);
  const selectedCert = certificates.find(c => c._id === selectedCertId);

  return (
    <section id="certificates" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-6xl font-display font-black uppercase mb-4">
              Hall of <br />
              <span className="text-stroke">Recognition</span>
            </h2>
            <p className="opacity-50 italic">Validation of expertise from industry leaders and competitive arenas.</p>
          </div>

          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10">
            {['educational', 'hackathon'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setVisibleCount(3); }}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-black dark:bg-white text-white dark:text-black shadow-lg" : "opacity-50 hover:opacity-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCerts.slice(0, visibleCount).map((cert) => (
              <CertificateCard key={cert._id} cert={cert} onClick={() => setSelectedCertId(cert._id)} />
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < filteredCerts.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="text-xs font-bold uppercase tracking-[0.4em] hover:text-primary transition-all relative group py-2"
            >
              Load More Certificates
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCertId && selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCertId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
