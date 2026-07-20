import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { GraduationCap, Calendar, MapPin, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export const Education = () => {
    const { education } = usePortfolio();

    return (
        <section id="education" className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
            
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />

            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4"
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>QUALIFICATIONS</span>
                    </motion.div>

                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-black uppercase mb-4 tracking-tight leading-none text-black dark:text-white"
                    >
                        Academic <span className="text-stroke">Foundations</span>
                    </motion.h2>
                    <p className="text-black/50 dark:text-white/50 max-w-lg mx-auto italic">
                        The structured computer science theoretical frameworks powering my custom builds.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Simplified Center Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-black/10 dark:bg-white/10 -translate-x-1/2" />

                    <div className="space-y-16">
                        {education.map((edu, i) => (
                            <div key={edu._id} className={cn(
                                "relative flex flex-col md:flex-row items-stretch justify-between w-full md:odd:flex-row-reverse",
                                i % 2 === 0 ? "md:odd" : ""
                            )}>
                                {/* Card Column */}
                                <div className="w-full md:w-[46%] pl-16 md:pl-0">
                                    <motion.div
                                        initial={{ x: i % 2 === 0 ? 40 : -40, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 rounded-3xl relative shadow-md hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-start space-x-4 mb-6">
                                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-display font-bold leading-snug text-black dark:text-white">{edu.institution}</h3>
                                                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mt-1">{edu.degree}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-xs text-black/60 dark:text-white/60 font-semibold">
                                                <Calendar className="w-4 h-4 mr-2.5 text-primary shrink-0" />
                                                <span>Session: {edu.startYear} — {edu.endYear}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-black/60 dark:text-white/60 font-semibold">
                                                <MapPin className="w-4 h-4 mr-2.5 text-primary shrink-0" />
                                                <span>Specialization: {edu.field}</span>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                                            <span className="text-[9px] font-mono uppercase tracking-widest opacity-40 font-bold">Academic Grade</span>
                                            <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-black rounded-lg">
                                              {edu.grade}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Timeline Circle Badge */}
                                <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 w-6 h-6 bg-white dark:bg-black border-4 border-primary rounded-full z-20 shadow-md shadow-primary/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
