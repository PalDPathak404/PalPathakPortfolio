import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Figma as FigmaIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const mockFigma = [
  { 
    id: 1, 
    title: 'ElectroSell- A Figma Creation', 
    image: 'https://drive.google.com/uc?export=view&id=1d7tvjvHOP2NjfcANIUsONUdoCHGasePn', 
    link: 'https://www.figma.com/proto/bKRdU5q74OYXJxaAXLCljD/Work?page-id=86%3A6&node-id=184-18864&p=f&viewport=212%2C236%2C0.1&t=uzj8H5gE9h70KDUZ-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=91%3A13' 
  }
];

const FigmaCard = ({ design }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-none group bg-white dark:bg-black"
    >
      <img src={design.image} alt={design.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
      
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="absolute inset-x-6 bottom-6 p-6 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0"
      >
        <div className="flex justify-between items-center mb-2">
           <h4 className="text-xl font-display font-bold text-white">{design.title}</h4>
           <FigmaIcon className="w-5 h-5 text-white/50" />
        </div>
        <p className="text-white/60 text-xs mb-4">UI/UX Prototype built with Figma.</p>
        <a 
          href={design.link} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:underline"
        >
           <span>Open in Figma</span>
           <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

export const Figma = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="figma" className="py-24 bg-black/5 dark:bg-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
           <div>
              <h2 className="text-6xl font-display font-black uppercase mb-4">
                Visual <br />
                <span className="text-stroke">Blueprints</span>
              </h2>
              <p className="opacity-50 italic">Where logic meets aesthetics in structural prototyping.</p>
           </div>
           
           <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-4">
                 <button 
                   onClick={() => scroll('left')}
                   className="p-4 border border-black/10 dark:border-white/10 rounded-full hover:bg-primary hover:text-white transition-all active:scale-90"
                 >
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button 
                   onClick={() => scroll('right')}
                   className="p-4 border border-black/10 dark:border-white/10 rounded-full hover:bg-primary hover:text-white transition-all active:scale-90"
                 >
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-30">Drag or Use Arrows</span>
           </div>
        </div>

        <motion.div 
           ref={scrollRef}
           data-cursor="drag"
           className="flex gap-8 overflow-x-auto no-scrollbar pb-12 cursor-none snap-x snap-mandatory"
           whileTap={{ cursor: 'grabbing' }}
        >
          {mockFigma.map((design) => (
            <div key={design.id} className="min-w-[300px] md:min-w-[500px] snap-center">
               <FigmaCard design={design} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
