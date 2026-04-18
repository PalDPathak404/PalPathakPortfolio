import { useEffect, useRef, useState } from 'react';

const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [techLogo, setTechLogo] = useState(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

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
          
          if (dotRef.current) {
             const dotX = lerp(e.clientX, centerX, 0.2);
             const dotY = lerp(e.clientY, centerY, 0.2);
             dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
          }
        } else {
          magneticElement.style.transform = 'translate(0, 0)';
        }
      }
    };

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const getRingClasses = () => {
    const base = 'fixed top-0 left-0 rounded-full pointer-events-none z-[300] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-radius,border-color] duration-300 ease-out flex items-center justify-center overflow-hidden';
    
    switch (cursorType) {
      case 'pointer':
        return `${base} w-14 h-14 border-2 border-primary bg-primary/10`;
      case 'view':
        return `${base} w-24 h-24 border-2 border-primary bg-primary/20`;
      case 'drag':
        return `${base} w-20 h-20 border-2 border-primary bg-primary/20`;
      case 'tech':
        // No background, no border — just the logo with a subtle dark backdrop
        return `${base} w-16 h-16 border-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm shadow-lg shadow-primary/20`;
      case 'text':
        return `${base} w-6 h-6 border-2 border-primary`;
      default:
        return `${base} w-10 h-10 border-2 border-primary`;
    }
  };

  return (
    <>
      {/* Small Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[301] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out"
        style={{ scale: cursorType === 'text' ? 0.5 : 1 }}
      />
      
      {/* Larger Ring */}
      <div
        ref={ringRef}
        className={getRingClasses()}
      >
        {cursorType !== 'tech' && (
          <div className="absolute inset-0 border border-primary/20 animate-[spin_4s_linear_infinite] rounded-full" />
        )}
        {cursorType === 'view' && <span className="text-[10px] font-bold text-primary tracking-widest uppercase">VIEW</span>}
        {cursorType === 'drag' && <span className="text-[10px] font-bold text-primary tracking-widest uppercase">DRAG</span>}
        {cursorType === 'tech' && techLogo && (
          <img 
            src={techLogo} 
            alt="Tech Icon" 
            className="w-10 h-10 object-contain p-1 rounded-md drop-shadow-[0_0_8px_rgba(242,125,38,0.4)]" 
            style={{ filter: 'brightness(1.2)' }}
          />
        )}
      </div>
    </>
  );
};
