import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorType, setCursorType] = useState('default');
  const [techLogo, setTechLogo] = useState(null);

  useEffect(() => {
    // Only apply on desktop devices that support hover
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Context detection
      const target = e.target;
      
      if (target.closest('a, button')) {
        setCursorType('pointer');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorType('drag');
      } else if (target.closest('[data-tech-logo]')) {
        const logoTarget = target.closest('[data-tech-logo]');
        setCursorType('tech');
        setTechLogo(logoTarget.getAttribute('data-tech-logo'));
      } else if (window.getComputedStyle(target).cursor === 'text') {
        setCursorType('text');
      } else {
        setCursorType('default');
        setTechLogo(null);
      }

      // Magnetic Effect
      const magneticElement = target.closest('[data-magnetic]');
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (distance < 70) {
          const strength = 0.3;
          const x = (e.clientX - centerX) * strength;
          const y = (e.clientY - centerY) * strength;
          magneticElement.style.transform = `translate(${x}px, ${y}px)`;
        } else {
          magneticElement.style.transform = 'translate(0, 0)';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const getRingClasses = () => {
    const base = 'rounded-full pointer-events-none transition-[width,height,background-color,backdrop-filter,border-color,border-radius] duration-300 ease-out flex items-center justify-center overflow-hidden';
    
    switch (cursorType) {
      case 'pointer':
        return `${base} w-12 h-12 bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 scale-150`;
      case 'view':
        return `${base} w-24 h-24 bg-black/30 dark:bg-white/30 backdrop-blur-xl border border-black/20 dark:border-white/30 scale-110`;
      case 'drag':
        return `${base} w-16 h-16 bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10`;
      case 'tech':
        return `${base} w-24 h-24 bg-white/50 dark:bg-black/50 backdrop-blur-xl shadow-2xl border border-black/10 dark:border-white/20`;
      case 'text':
        return `${base} w-6 h-6 border border-black/20 dark:border-white/20 opacity-50`;
      default:
        return `${base} w-8 h-8 border border-black/20 dark:border-white/20 backdrop-blur-sm`;
    }
  };

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[301]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="w-2 h-2 bg-black dark:bg-white rounded-full transition-transform duration-100 ease-out"
          style={{ 
            x: "-50%",
            y: "-50%",
            scale: cursorType === 'text' ? 0.5 : (cursorType === 'pointer' ? 0 : 1), 
            opacity: cursorType === 'pointer' ? 0 : 1 
          }}
        />
      </motion.div>
      
      {/* Larger Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[300]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className={getRingClasses()}
          style={{ 
            x: "-50%",
            y: "-50%"
          }}
        >
          {cursorType === 'view' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-bold text-black dark:text-white tracking-[0.3em] uppercase"
            >
              VIEW
            </motion.span>
          )}
          {cursorType === 'drag' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-bold text-black dark:text-white tracking-[0.3em] uppercase"
            >
              DRAG
            </motion.span>
          )}
          {cursorType === 'tech' && techLogo && (
            <motion.img 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              src={techLogo} 
              alt="Tech Icon" 
              className="w-12 h-12 object-contain p-1 rounded-md" 
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
};
