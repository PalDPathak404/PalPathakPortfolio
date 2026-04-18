import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils.js';

gsap.registerPlugin(ScrollTrigger);

export const Education = () => {
    const { education } = usePortfolio();
    const timelineRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (!lineRef.current || !timelineRef.current) return;

        gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="education" className="py-24 bg-black/5 dark:bg-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-display font-black uppercase mb-8"
                    >
                        Academic <br />
                        <span className="text-stroke">Foundations</span>
                    </motion.h2>
                    <p className="opacity-50 italic uppercase tracking-[0.2em] text-xs">The structural knowledge powering my digital builds.</p>
                </div>

                <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                    {/* Progress Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-black/5 dark:bg-white/5 -translate-x-1/2" />
                    <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 origin-top z-10" />

                    <div className="space-y-24">
                        {education.map((edu, i) => (
                            <div key={edu._id} className={cn(
                                "relative flex items-center justify-between md:justify-normal w-full md:odd:flex-row-reverse",
                                i % 2 === 0 ? "md:odd" : ""
                            )}>
                                {/* Card */}
                                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                                    <motion.div
                                        initial={{ x: i % 2 === 0 ? 50 : -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true }}
                                        className="bg-white dark:bg-black p-8 border border-black/10 dark:border-white/10 rounded-2xl relative"
                                    >
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <GraduationCap className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-display font-bold leading-tight">{edu.institution}</h3>
                                                <span className="text-xs opacity-50 font-bold uppercase tracking-widest">{edu.degree}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-xs opacity-60">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{edu.startYear} — {edu.endYear}</span>
                                            </div>
                                            <div className="flex items-center text-xs opacity-60">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{edu.field}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                                            <span className="text-[10px] uppercase tracking-widest opacity-30 italic">Academic Performance</span>
                                            <span className="text-lg font-display font-bold text-primary">{edu.grade}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-6 h-6 bg-white dark:bg-black border-4 border-primary rounded-full z-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
