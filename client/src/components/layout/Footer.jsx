import React from 'react';
import { Github, Linkedin, Youtube, Twitter, ArrowUp, Code2 } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Code2, href: '#', label: 'LeetCode' },
];

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-20 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="md:col-span-2">
                    <div className="w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center font-display font-bold text-2xl mb-6">
                        PP
                    </div>
                    <p className="text-black/50 dark:text-white/50 max-w-sm mb-8 leading-relaxed">
                        A full-stack journey driven by curiosity, code, and a commitment to creating
                        impactful digital solutions. Built with React, GSAP, and a touch of magic.
                    </p>
                    <div className="flex space-x-4">
                        {socialLinks.map((social, i) => (
                            <a 
                              key={i} 
                              href={social.href} 
                              target="_blank" 
                              rel="noreferrer"
                              aria-label={social.label}
                              className="p-3 bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white transition-all rounded-xl group"
                            >
                                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-8 italic">Navigation</h4>
                    <ul className="space-y-4">
                        {['About', 'Skills', 'Projects', 'Hackathons', 'Contact'].map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase()}`} className="text-sm opacity-50 hover:opacity-100 hover:text-primary transition-all uppercase">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal / Contact info */}
                <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-8 italic">Legal</h4>
                    <ul className="space-y-4 text-sm opacity-50">
                        <li>© {new Date().getFullYear()} Pal Pathak Portfolio</li>
                        <li>Handcrafted with React 19</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-[10px] uppercase font-mono tracking-widest opacity-30 text-center md:text-left">
                    Built with React + Tailwind + GSAP + Framer Motion.
                    <br />
                    Hosted on Cloud Run.
                </div>

                <button
                    onClick={scrollToTop}
                    className="p-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white transition-all active:scale-95 group"
                >
                    <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    );
};
