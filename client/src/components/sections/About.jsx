import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Photo */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 w-full aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl border-2 border-black dark:border-white">
                            <img
                                src="https://res.cloudinary.com/dprcvoo9b/image/upload/v1776441789/Pokecut_1776424114577_ff45kc.jpg"
                                alt="Pal Pathak"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        {/* Minimal Accents */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl -z-10" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative">
                        <motion.h2
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl font-display font-bold mb-8 uppercase"
                        >
                            Pal Pathak <br />
                            <span className="text-stroke">Engineering Digital Excellence</span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-lg text-black/60 dark:text-white/60 mb-10 leading-relaxed"
                        >
                            I am a high-performance Full-Stack Developer and Creative Engineer based in Gujarat.
                            My expertise lies at the intersection of robust backend architectures and highly
                            interactive, motion-rich frontend experiences. I don't just build apps; I craft
                            digital journeys.
                        </motion.p>

                        <ul className="space-y-4">
                            {[
                                'Obsessive attention to UI/UX performance',
                                'Deep understanding of MERN & Modern Web',
                                'Passion for Creative Coding and 3D',
                                'Active contributor to open-source software'
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
