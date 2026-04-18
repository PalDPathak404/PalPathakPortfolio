import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Github, Linkedin, Youtube, Twitter, Code2, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { cn } from '../../lib/utils.js';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Stats', href: '#stats' },
    { name: 'Contact', href: '#contact' },
];

const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Code2, href: '#', label: 'LeetCode' },
    { icon: GraduationCap, href: '#', label: 'SoloLearn' },
];

export const Navbar = () => {
    const { theme, toggleTheme, activeSection, setIsResumeModalOpen } = usePortfolio();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('scroll-progress');
            if (bar) bar.style.width = scrolled + '%';
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
            isScrolled ? "py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10" : "py-8 bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="relative group">
                    <div className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-display font-bold text-xl transition-transform group-hover:-rotate-12">
                        PP
                    </div>
                    <div className="absolute inset-0 border-2 border-primary translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium tracking-widest uppercase transition-colors hover:text-primary relative py-2",
                                activeSection === link.href.slice(1) ? "text-primary" : "text-black/60 dark:text-white/60"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.slice(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    {/* Theme Toggle - Fixed */}
                    <button
                        onClick={toggleTheme}
                        className="group relative h-10 w-20 rounded-full border border-black/10 dark:border-white/20 p-1 flex items-center transition-all overflow-hidden"
                        style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            animate={{ x: theme === 'dark' ? 40 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center relative z-10"
                            style={{ backgroundColor: theme === 'dark' ? '#f27d26' : '#ffffff' }}
                        >
                            {theme === 'dark' ? (
                                <Moon className="w-4 h-4 text-white" />
                            ) : (
                                <Sun className="w-4 h-4 text-amber-500" />
                            )}
                        </motion.div>
                        <div className="absolute inset-x-2 flex justify-between opacity-30 pointer-events-none uppercase text-[8px] font-bold">
                            <span>LT</span>
                            <span>DK</span>
                        </div>
                    </button>

                    <button
                        id="resume-btn"
                        onClick={() => setIsResumeModalOpen(true)}
                        data-magnetic
                        className="hidden md:block px-6 py-2 border border-black dark:border-white text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                        Resume
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-white dark:bg-black p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <div className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-display font-bold text-xl">
                                PP
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-8 mb-auto">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-primary"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-8 pb-8 border-t border-black/10 dark:border-white/10 pt-8">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="flex justify-center p-4 bg-black/5 dark:bg-white/5 rounded-xl"
                                >
                                    <social.icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
