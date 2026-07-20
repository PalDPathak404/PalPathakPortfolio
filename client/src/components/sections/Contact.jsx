import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Check, Loader2, MessageSquare, ArrowRight, Send, Sparkles } from 'lucide-react';
import Lottie from 'lottie-react';
import successAnimation from '../../assets/lottie/success.json';
import emailjs from '@emailjs/browser';
import { cn } from '../../lib/utils.js';

export const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            reply_to: formData.email,
        };

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText('palkumar.d.pathak.cg@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
            
            {/* Background glowing gradients */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left Side: Content Display */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>COMMUNICATIONS HUB</span>
                            </motion.div>

                            <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-4 tracking-tight leading-none text-black dark:text-white">
                              Let's Build <span className="text-stroke">Something Real.</span>
                            </h2>
                        </div>

                        <div className="space-y-8">
                            <p className="text-base text-black/60 dark:text-white/60 leading-relaxed font-semibold italic">
                                Have an ambitious startup idea, architectural challenge, or simply want to chat? Send me a line. I'm especially interested in pioneering conversational AI pipelines and responsive micro-frontends.
                            </p>

                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center group space-x-4 bg-black/5 dark:bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-primary/30 transition-all text-left cursor-none"
                                    data-cursor="pointer"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        {copied ? <Check className="w-4 h-4 text-primary" /> : <Mail className="w-4 h-4 text-primary" />}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-[9px] font-mono uppercase tracking-widest opacity-40 font-bold">EMAIL ADDRESS</span>
                                        <span className="text-sm md:text-base font-display font-bold group-hover:text-primary transition-colors block truncate text-black dark:text-white">
                                          {copied ? 'Copied to clipboard!' : 'palkumar.d.pathak.cg@gmail.com'}
                                        </span>
                                    </div>
                                </button>

                                <div className="flex items-center space-x-4 bg-black/5 dark:bg-white/5 border border-white/5 p-4 rounded-2xl text-left">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <span className="block text-[9px] font-mono uppercase tracking-widest opacity-40 font-bold">LOCATION</span>
                                        <span className="text-sm md:text-base font-display font-bold text-black dark:text-white">Gujarat, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rotating Sparkle Badge */}
                        <div className="hidden lg:block">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5"
                            >
                                <Sparkles className="w-5 h-5 text-primary/40" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Premium Glass Form Card */}
                    <div className="lg:col-span-7 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative p-8 md:p-12 rounded-3xl bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/25 dark:border-white/5 shadow-xl overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2 w-full">
                                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 p-4 text-black dark:text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-black/20 dark:placeholder:text-white/20 text-sm font-semibold"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 p-4 text-black dark:text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-black/20 dark:placeholder:text-white/20 text-sm font-semibold"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 p-4 text-black dark:text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-black/20 dark:placeholder:text-white/20 text-sm font-semibold"
                                        placeholder="Project Inquiry / Consulting"
                                    />
                                </div>

                                <div className="space-y-2 w-full">
                                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40 ml-1">The Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 p-4 text-black dark:text-white focus:border-primary outline-none transition-all rounded-xl resize-none placeholder:text-black/20 dark:placeholder:text-white/20 text-sm font-semibold"
                                        placeholder="Tell me about your product requirements..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={cn(
                                        "w-full group relative py-4.5 rounded-xl font-display font-black text-xs uppercase tracking-widest overflow-hidden transition-all cursor-none",
                                        status === 'loading' ? "bg-black/10 dark:bg-white/10 cursor-not-allowed text-black/40 dark:text-white/40" : "bg-primary text-white"
                                    )}
                                    data-cursor="pointer"
                                >
                                    <div className="absolute inset-0 bg-white dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl" />
                                    <div className="relative z-10 flex items-center justify-center space-x-3 group-hover:text-primary">
                                        {status === 'loading' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Deploy Message</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-30 bg-gradient-to-br from-primary to-orange-500 flex flex-col items-center justify-center p-12 text-white rounded-3xl"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-24 h-24 mb-6"
                                        >
                                            <Lottie animationData={successAnimation} loop={false} />
                                        </motion.div>
                                        <h3 className="text-3xl font-display font-black uppercase mb-3 text-center">Message Dispatched!</h3>
                                        <p className="text-center text-white/80 max-w-xs mb-8 text-xs font-semibold leading-relaxed">
                                            I have received your inquiry and will revert with a technical perspective within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="px-6 py-3 bg-white text-primary font-bold uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform cursor-none"
                                            data-cursor="pointer"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
