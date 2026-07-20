import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils.js';
import { 
  Sparkles, 
  QrCode, 
  Mic, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Github, 
  Globe, 
  Cpu, 
  Database, 
  Layers, 
  UserCheck, 
  MessageSquare, 
  AlertTriangle, 
  Volume2, 
  Activity, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw,
  Maximize,
  Minimize
} from 'lucide-react';

const feedbackTemplates = [
  {
    text: "The checkout process was super slow and it crashed when I entered my card. Please fix this!",
    category: "Technical Issues",
    sentiment: "negative",
    score: 1.2,
    rating: 2,
    insight: "High critical failure on payment gateway load. Immediate system review suggested."
  },
  {
    text: "Absolutely loved the friendly staff and the clean ambiance of the cafe! Will definitely recommend.",
    category: "Staff Behavior",
    sentiment: "positive",
    score: 4.8,
    rating: 5,
    insight: "High positive team interaction. Great potential for customer loyalty rewards."
  },
  {
    text: "The product quality is good, but delivery took almost an hour and the customer service chat was unhelpful.",
    category: "Customer Support",
    sentiment: "mixed",
    score: 3.1,
    rating: 3,
    insight: "Moderate friction in logistics. Refine customer support chatbot latency and auto-routing."
  }
];

export const Startups = () => {
  // Simulator State
  const [viewMode, setViewMode] = useState('sandbox'); // 'sandbox' | 'live'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('problem'); // problem, solution, features, architect
  const [selectedTemplate, setSelectedTemplate] = useState(feedbackTemplates[1]);
  const [customFeedback, setCustomFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulatedFeedback, setSimulatedFeedback] = useState({
    text: feedbackTemplates[1].text,
    category: feedbackTemplates[1].category,
    sentiment: feedbackTemplates[1].sentiment,
    score: feedbackTemplates[1].score,
    rating: feedbackTemplates[1].rating,
    insight: feedbackTemplates[1].insight
  });

  // Dashboard Cumulative Stats (State increments on simulation)
  const [totalVolume, setTotalVolume] = useState(9);
  const [averageExperience, setAverageExperience] = useState(3.4);
  const [categoryCounts, setCategoryCounts] = useState({
    'Customer Service': 4,
    'Technical Issues': 1,
    'Staff Behavior': 2,
    'Customer Support': 1,
    'Other': 1
  });

  const handleSimulate = (feedbackItem) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSimulatedFeedback(feedbackItem);
      // Increment stats slightly to simulate active database updates
      setTotalVolume(prev => prev + 1);
      setAverageExperience(prev => {
        const newAvg = ((prev * totalVolume) + feedbackItem.rating) / (totalVolume + 1);
        return parseFloat(newAvg.toFixed(1));
      });
      setCategoryCounts(prev => ({
        ...prev,
        [feedbackItem.category]: (prev[feedbackItem.category] || 0) + 1
      }));
      setIsProcessing(false);
    }, 1200);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customFeedback.trim()) return;

    // Very simple dynamic AI logic for simulated sandbox
    let cat = "Other";
    let sent = "neutral";
    let rat = 3;
    let score = 3.0;
    let ins = "Standard query captured. Action recommended: Review feedback trend.";

    const text = customFeedback.toLowerCase();
    if (text.includes("crash") || text.includes("slow") || text.includes("error") || text.includes("bug")) {
      cat = "Technical Issues";
      sent = "negative";
      rat = 1;
      score = 1.1;
      ins = "Flagged system error. Urgent patch recommended for page rendering or api response.";
    } else if (text.includes("good") || text.includes("love") || text.includes("best") || text.includes("friendly") || text.includes("polite")) {
      cat = "Staff Behavior";
      sent = "positive";
      rat = 5;
      score = 4.9;
      ins = "Outstanding satisfaction score. Recommend logging to praise team member.";
    } else if (text.includes("delivery") || text.includes("wait") || text.includes("delay") || text.includes("late")) {
      cat = "Customer Support";
      sent = "mixed";
      rat = 2;
      score = 2.4;
      ins = "Logistics/dispatch friction detected. Review dispatch timing buffers.";
    }

    handleSimulate({
      text: customFeedback,
      category: cat,
      sentiment: sent,
      score: score,
      rating: rat,
      insight: ins
    });
    setCustomFeedback('');
  };

  return (
    <section id="startups" className="py-32 relative overflow-hidden bg-black/5 dark:bg-[#070707]">
      {/* Dynamic colorful blur mesh backing */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0071E3]/10 rounded-full blur-[160px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#34C759]/5 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Flagship Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOUNDER'S VENTURE</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-black uppercase mb-4 tracking-tight text-gradient"
          >
            SHRUVIQ
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-black/60 dark:text-white/60 max-w-2xl mx-auto"
          >
            AI-Powered Customer Experience Intelligence Platform • <span className="font-bold text-primary">Working MVP</span>
          </motion.p>
        </div>

        {/* Apple Style Glassmorphic Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: High Fidelity SaaS Pitch Deck (8 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Top Cards: Core pitch with elegant Apple Tabs */}
            <div className="glass-card backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between h-full shadow-lg">
              <div>
                {/* Tabs Selector */}
                <div className="flex flex-wrap gap-2 mb-8 bg-black/5 dark:bg-white/5 p-1 rounded-2xl w-max">
                  {['problem', 'solution', 'features', 'role'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                        activeTab === tab 
                          ? 'bg-white dark:bg-white/10 text-primary dark:text-white shadow-sm border border-white/10' 
                          : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[250px]"
                  >
                    {activeTab === 'problem' && (
                      <div>
                        <div className="flex items-center gap-3 mb-4 text-[#ff5f5f]">
                          <AlertTriangle className="w-6 h-6" />
                          <h4 className="text-xl font-display font-bold">The Chaos of Unstructured Reviews</h4>
                        </div>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-6">
                          Businesses collect customer feedback every single day, but most of it remains scattered across 
                          Google reviews, text surveys, WhatsApp threads, voice recordings, and emails.
                        </p>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-base">
                          This feedback is largely unstructured. As a business grows, manual analysis becomes an 
                          impossible, time-consuming bottleneck. Recurring operational bottlenecks go unnoticed, causing silent customer churn.
                        </p>
                      </div>
                    )}

                    {activeTab === 'solution' && (
                      <div>
                        <div className="flex items-center gap-3 mb-4 text-[#34C759]">
                          <Sparkles className="w-6 h-6" />
                          <h4 className="text-xl font-display font-bold">Automatic Feedback-to-Intelligence Engine</h4>
                        </div>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-6">
                          Shruviq simplifies feedback completely. Customers simply scan an automated QR code at checkout, 
                          instantly leaving a quick voice note or text message.
                        </p>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-base">
                          Our real-time AI pipeline takes over: transcribing speech instantly, executing neural sentiment parsing, 
                          classifying topics, and aggregating everything into an elegant B2B workspace dashboard.
                        </p>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: QrCode, title: "QR-Based Surveys", desc: "Scan and submit feedback instantly, no account creation." },
                          { icon: Mic, title: "Voice-First Input", desc: "Customers easily record voice notes; AI handles the rest." },
                          { icon: Cpu, title: "AI Speech-to-Text", desc: "State-of-the-art transcriptions with sentiment insights." },
                          { icon: TrendingUp, title: "Operational Insights", desc: "Intelligent grouping helps resolve system pain points." }
                        ].map((feat, i) => (
                          <div key={i} className="flex gap-3 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                            <feat.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-bold text-sm mb-1">{feat.title}</h5>
                              <p className="text-xs text-black/50 dark:text-white/50">{feat.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'role' && (
                      <div>
                        <div className="flex items-center gap-3 mb-4 text-primary">
                          <UserCheck className="w-6 h-6" />
                          <h4 className="text-xl font-display font-bold">My Role: Solo Founder & Architect</h4>
                        </div>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-6">
                          As a solo builder, I designed, architected, and coded Shruviq from absolute zero:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Product Design (Figma)",
                            "Frontend (React, TypeScript, Tailwind)",
                            "Backend Infrastructure (Firebase Firestore, Auth)",
                            "AI Engine (Speech Transcription, NLP Sentiment)",
                            "B2B Workspace Security",
                            "Vercel Deployment Pipeline"
                          ].map((roleTag, i) => (
                            <span key={i} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-xs font-mono text-primary rounded-lg">
                              ✓ {roleTag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom CTAs & Social Links */}
              <div className="border-t border-black/10 dark:border-white/10 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <a 
                    href="https://shruviq.vercel.app" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-none"
                    data-cursor="pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Launch Web MVP</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  
                  <a 
                    href="https://github.com/paldpathak404/shruviq" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/25 dark:hover:bg-white/20 text-black dark:text-white font-bold text-xs uppercase tracking-widest rounded-full hover:scale-[1.02] active:scale-95 transition-all cursor-none"
                    data-cursor="pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                </div>

                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#34C759]/15 border border-[#34C759]/30 text-[#34C759] text-[10px] font-mono uppercase tracking-wider rounded-md">
                    #B2B SaaS
                  </span>
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-wider rounded-md">
                    #VoiceAI
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT PANEL: Live Interactive MVP Playground (5 Cols) */}
          <div className={isFullscreen ? "fixed inset-0 z-[300] flex flex-col p-4 md:p-12 bg-black/90 backdrop-blur-xl" : "lg:col-span-5 flex flex-col justify-between"}>
            
            <div className={cn("glass-card backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-6 shadow-xl flex flex-col h-full relative overflow-hidden", isFullscreen && "w-full max-w-6xl mx-auto h-full bg-white/5")}>
              
              {/* Decorative top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />

              {/* Sandbox title bar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  
                  {/* Mode Switcher */}
                  <div className="flex items-center ml-4 bg-black/20 dark:bg-white/10 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('sandbox')}
                      className={cn("px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-bold rounded-md transition-colors cursor-none", viewMode === 'sandbox' ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white")}
                      data-cursor="pointer"
                    >
                      Simulator
                    </button>
                    <button
                      onClick={() => setViewMode('live')}
                      className={cn("px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-bold rounded-md transition-colors cursor-none", viewMode === 'live' ? "bg-white/10 text-primary shadow-sm" : "text-white/50 hover:text-primary")}
                      data-cursor="pointer"
                    >
                      Live MVP
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {viewMode === 'sandbox' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg">
                      <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-primary font-mono tracking-widest uppercase hidden sm:block">LIVE ANALYTICS</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-none"
                    data-cursor="pointer"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {viewMode === 'live' ? (
                <div className="flex-grow w-full h-full relative rounded-xl overflow-hidden bg-white">
                  <iframe 
                    src="https://shruviq.vercel.app"
                    title="Shruviq Live Preview"
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              ) : (
                <>
                  {/* UPPER HALF: Simulated Real-Time B2B Dashboard */} */}
              <div className="bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-white/5 mb-6">
                
                {/* Stats row (similar to screenshot) */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  
                  {/* Score */}
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono uppercase opacity-50 block mb-1">Average Exp.</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-black text-primary">{averageExperience}</span>
                      <span className="text-xs opacity-50">/ 5</span>
                    </div>
                    <span className="text-[9px] text-[#34C759] font-mono block mt-1">↑ +0.2 from last week</span>
                  </div>

                  {/* Volume */}
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono uppercase opacity-50 block mb-1">Total Volume</span>
                    <span className="text-3xl font-display font-black text-white">{totalVolume}</span>
                    <span className="text-[9px] opacity-40 block mt-1">Audio / Text Records</span>
                  </div>

                </div>

                {/* Rating Distribution simulation */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex justify-between text-[9px] font-mono opacity-50 uppercase">
                    <span>Detected Categories Velocity</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(categoryCounts).map(([catName, count]) => (
                      <span key={catName} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-mono rounded-md text-primary">
                        {catName} ({count})
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* PLAYGROUND: Feedback Scanner & Process pipeline */}
              <div className="flex-grow flex flex-col justify-between">
                
                {/* AI Pipeline feedback logs */}
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5 min-h-[140px] flex flex-col justify-between mb-6">
                  {isProcessing ? (
                    <div className="flex-grow flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-7 h-7 text-primary animate-spin" />
                      <span className="text-xs font-mono tracking-widest text-primary animate-pulse">SHRUVIQ AI TRANSCRIBING & EXTRACTING...</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 bg-black/40 text-xs font-mono text-[#34C759] border border-[#34C759]/30 rounded-md">
                          Latest feedback analyzed
                        </span>
                        <div className="flex items-center gap-1">
                          {simulatedFeedback.sentiment === 'positive' && <ThumbsUp className="w-3.5 h-3.5 text-[#34C759]" />}
                          {simulatedFeedback.sentiment === 'negative' && <ThumbsDown className="w-3.5 h-3.5 text-[#ff5f5f]" />}
                          <span className={`text-[10px] font-bold uppercase ${
                            simulatedFeedback.sentiment === 'positive' ? 'text-[#34C759]' : 
                            simulatedFeedback.sentiment === 'negative' ? 'text-[#ff5f5f]' : 'text-amber-400'
                          }`}>
                            {simulatedFeedback.sentiment}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-white/80 line-clamp-2 italic mb-3 bg-white/5 p-2 rounded-lg border border-white/5">
                        "{simulatedFeedback.text}"
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div>
                          <span className="opacity-40">TOPIC:</span> <span className="text-primary font-bold">{simulatedFeedback.category}</span>
                        </div>
                        <div>
                          <span className="opacity-40">AI INSIGHT:</span> <span className="text-white/80 line-clamp-1">{simulatedFeedback.insight}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Templates & custom inputs */}
                <div>
                  <h5 className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-3">
                    Choose QR Feedback template to scan:
                  </h5>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {feedbackTemplates.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSimulate(item)}
                        className={`p-2.5 rounded-xl text-[10px] font-mono border text-left transition-all hover:scale-[1.02] leading-tight flex flex-col justify-between h-20 ${
                          simulatedFeedback.text === item.text 
                            ? 'bg-primary/10 border-primary text-white' 
                            : 'bg-white/5 border-white/5 text-black/60 dark:text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <span className="line-clamp-2">"{item.text}"</span>
                        <span className={`text-[8px] uppercase mt-1 font-bold ${
                          item.sentiment === 'positive' ? 'text-[#34C759]' : 
                          item.sentiment === 'negative' ? 'text-[#ff5f5f]' : 'text-amber-400'
                        }`}>
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Feedback Form */}
                  <form onSubmit={handleCustomSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Type custom feedback & trigger AI..."
                      value={customFeedback}
                      onChange={(e) => setCustomFeedback(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-xs text-black dark:text-white focus:outline-none focus:border-primary/50"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary hover:bg-primary/95 text-white rounded-lg transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>
              </>
            )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
