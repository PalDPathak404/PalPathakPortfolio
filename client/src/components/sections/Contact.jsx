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
        navigator.clipboard.writeText('hello@dev.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-white dark:bg-black">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-full text-[25vw] font-black opacity-[0.02] dark:opacity-[0.03] select-none pointer-events-none -translate-y-1/2 whitespace-nowrap leading-none">
                GET IN TOUCH • GET IN TOUCH • GET IN TOUCH
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Content */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center space-x-2 text-primary font-mono text-xs uppercase tracking-[0.4em] mb-6"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Available for new projects</span>
                            </motion.div>

                            <h2 className="text-7xl md:text-9xl font-display font-black uppercase leading-[1.1] md:leading-[0.85] tracking-tighter">
                                Let's <br />
                                Create <br />
                                <span className="text-gradient">Magic.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 max-w-md">
                            <p className="text-xl text-black/60 dark:text-white/60 leading-relaxed">
                                Have an ambitious project in mind? Or just want to say hi?
                                My inbox is always open. I'm especially interested in
                                collaborating on creative frontend experiences and robust
                                MERN systems.
                            </p>

                            <div className="flex flex-col space-y-6">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center group space-x-4"
                                >
                                    <div className="w-14 h-14 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shrink-0">
                                        {copied ? <Check className="w-5 h-5 text-white" /> : <Mail className="w-5 h-5 group-hover:text-white transition-colors" />}
                                    </div>
                                    <div>
                                        <span className="block text-sm uppercase tracking-widest opacity-40 font-bold text-left">Email Me</span>
                                        <span className="text-2xl font-display font-bold group-hover:text-primary transition-colors block text-left">{copied ? 'Copied!' : 'hello@dev.com'}</span>
                                    </div>
                                </button>

                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block text-sm uppercase tracking-widest opacity-40 font-bold text-left">Location</span>
                                        <span className="text-2xl font-display font-bold block text-left">Gujarat, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="hidden lg:block">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center"
                            >
                                <Sparkles className="w-6 h-6 text-primary/40" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Premium Form Card */}
                    <div className="lg:col-span-7 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative p-8 md:p-14 rounded-[2rem] shadow-2xl overflow-hidden neon-border"
                            style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.97), rgba(20,20,20,0.97))' }}
                        >
                            {/* Form Decorations */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 blur-[80px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 blur-[60px] -z-10" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2 w-full">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-white/20"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-white/20"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-primary outline-none transition-all rounded-xl placeholder:text-white/20"
                                        placeholder="Ref: Project Inquiry"
                                    />
                                </div>

                                <div className="space-y-2 w-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">The Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-primary outline-none transition-all rounded-xl resize-none placeholder:text-white/20"
                                        placeholder="Tell me about your vision..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={cn(
                                        "w-full group relative py-5 rounded-xl font-display font-black text-xl uppercase tracking-tighter overflow-hidden transition-all",
                                        status === 'loading' ? "bg-white/10 cursor-not-allowed text-white/40" : "bg-primary text-white"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 rounded-xl" />
                                    <div className="relative z-10 flex items-center justify-center space-x-3 group-hover:text-primary">
                                        {status === 'loading' ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                                        className="absolute inset-0 z-30 bg-gradient-to-br from-primary to-orange-600 flex flex-col items-center justify-center p-12 text-white rounded-[2rem]"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-32 h-32 mb-8"
                                        >
                                            <Lottie animationData={successAnimation} loop={false} />
                                        </motion.div>
                                        <h3 className="text-3xl md:text-4xl font-display font-black uppercase mb-4 text-center">Message Dispatched!</h3>
                                        <p className="text-center text-white/80 max-w-sm mb-10">
                                            I've received your inquiry and will revert with a technical perspective within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="px-8 py-3 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform"
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
