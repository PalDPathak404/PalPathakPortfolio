import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Github, Code2, Linkedin, ExternalLink, GitFork, Star, Users, Trophy, Target, TrendingUp, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils.js';

// Generate mock contribution data (GitHub-style grid)
const generateContributionData = () => {
  const data = [];
  for (let i = 0; i < 84; i++) {
    const rand = Math.random();
    let level;
    if (rand < 0.3) level = 0;
    else if (rand < 0.55) level = 1;
    else if (rand < 0.75) level = 2;
    else if (rand < 0.9) level = 3;
    else level = 4;
    data.push(level);
  }
  return data;
};

const ContributionGrid = () => {
  const data = useMemo(() => generateContributionData(), []);
  const colors = [
    'bg-black/5 dark:bg-white/5',
    'bg-primary/20',
    'bg-primary/40',
    'bg-primary/60',
    'bg-primary/90',
  ];

  return (
    <div className="contribution-grid mt-4">
      {data.map((level, i) => (
        <div
          key={i}
          className={cn('contribution-cell rounded-sm', colors[level])}
          title={`${level * 3} contributions`}
        />
      ))}
    </div>
  );
};

const PlatformCard = ({ platform, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-primary/30 transition-all duration-500"
    >
      {/* Hover gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0", platform.bgColor)}>
            <platform.icon className="w-7 h-7 text-white relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{platform.title}</h3>
            <p className="text-xs font-mono opacity-40">{platform.username}</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center space-x-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">Visit</span>
          <ExternalLink className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Platform-Specific Content */}
      <div className="relative z-10">
        {platform.content}
      </div>

      {/* Background icon watermark */}
      <platform.icon className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.015] group-hover:opacity-[0.04] transition-opacity pointer-events-none" />
    </motion.a>
  );
};

const GitHubContent = () => (
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon: BookOpen, value: '45+', label: 'Repos' },
        { icon: Star, value: '120+', label: 'Stars' },
        { icon: GitFork, value: '85+', label: 'Forks' },
        { icon: Users, value: '200+', label: 'Followers' },
      ].map((stat, i) => (
        <div key={i} className="text-center p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl">
          <stat.icon className="w-4 h-4 mx-auto mb-1 text-primary/70" />
          <span className="block text-xl font-display font-black tabular-nums">{stat.value}</span>
          <span className="text-[8px] uppercase tracking-wider opacity-30 font-bold">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Contribution Grid */}
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold">Contribution Activity</span>
        <span className="text-[9px] uppercase tracking-widest text-primary font-bold">1,200+ this year</span>
      </div>
      <ContributionGrid />
      <div className="flex items-center justify-end space-x-1 mt-2">
        <span className="text-[8px] opacity-30">Less</span>
        {['bg-black/5 dark:bg-white/5', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/90'].map((c, i) => (
          <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />
        ))}
        <span className="text-[8px] opacity-30">More</span>
      </div>
    </div>

    {/* Top Languages */}
    <div>
      <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block mb-3">Top Languages</span>
      <div className="flex gap-2 flex-wrap">
        {[
          { name: 'JavaScript', pct: 42, color: 'bg-yellow-400' },
          { name: 'TypeScript', pct: 28, color: 'bg-blue-500' },
          { name: 'Python', pct: 15, color: 'bg-green-500' },
          { name: 'HTML/CSS', pct: 10, color: 'bg-orange-400' },
          { name: 'Other', pct: 5, color: 'bg-gray-400' },
        ].map((lang) => (
          <div key={lang.name} className="flex items-center space-x-1.5 text-[10px] opacity-60">
            <div className={cn('w-2 h-2 rounded-full', lang.color)} />
            <span>{lang.name}</span>
            <span className="font-mono opacity-60">{lang.pct}%</span>
          </div>
        ))}
      </div>
    </div>

    {/* Pinned Repos */}
    <div>
      <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block mb-3">Pinned Repositories</span>
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'nexus-ecommerce', desc: 'Full-stack luxury marketplace', stars: 32, lang: 'TypeScript' },
          { name: 'aether-os', desc: 'In-browser desktop environment', stars: 28, lang: 'React' },
        ].map((repo) => (
          <div key={repo.name} className="p-3 border border-black/5 dark:border-white/5 rounded-lg">
            <span className="text-xs font-bold text-primary block mb-1">{repo.name}</span>
            <span className="text-[10px] opacity-40 block mb-2">{repo.desc}</span>
            <div className="flex items-center space-x-3 text-[9px] opacity-40">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>{repo.stars}</span>
              </div>
              <span>{repo.lang}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LeetCodeContent = () => (
  <div className="space-y-6">
    {/* Problem Stats */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Easy', solved: '80', total: '800', color: 'text-green-400', bg: 'bg-green-400' },
        { label: 'Medium', solved: '55', total: '1600', color: 'text-yellow-400', bg: 'bg-yellow-400' },
        { label: 'Hard', solved: '15', total: '700', color: 'text-red-400', bg: 'bg-red-400' },
      ].map((diff, i) => (
        <div key={i} className="text-center p-4 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl">
          <span className={cn("block text-2xl font-display font-black tabular-nums", diff.color)}>{diff.solved}</span>
          <span className="text-[8px] uppercase tracking-wider opacity-30 font-bold">/{diff.total} {diff.label}</span>
          <div className="mt-2 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(parseInt(diff.solved) / parseInt(diff.total)) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
              className={cn('h-full rounded-full', diff.bg)}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Overall Stats */}
    <div className="grid grid-cols-2 gap-4">
      {[
        { icon: Trophy, value: '150+', label: 'Problems Solved', sub: 'Top 5% Global' },
        { icon: TrendingUp, value: '1,847', label: 'Contest Rating', sub: 'Knight Badge' },
        { icon: Target, value: '65+', label: 'Day Streak', sub: 'Max Streak' },
        { icon: Star, value: '12', label: 'Contests', sub: 'Participated' },
      ].map((stat, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl">
          <div className="w-10 h-10 bg-[#ffa116]/10 rounded-lg flex items-center justify-center shrink-0">
            <stat.icon className="w-5 h-5 text-[#ffa116]" />
          </div>
          <div>
            <span className="block text-lg font-display font-black tabular-nums leading-tight">{stat.value}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-30 font-bold">{stat.label}</span>
            <span className="block text-[8px] text-primary font-mono">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Skills Tags */}
    <div>
      <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block mb-3">Top Topics</span>
      <div className="flex flex-wrap gap-2">
        {['Dynamic Programming', 'Trees', 'Graphs', 'Arrays', 'Binary Search', 'Two Pointers', 'Stack', 'Backtracking'].map((topic) => (
          <span key={topic} className="px-3 py-1 border border-[#ffa116]/20 rounded-full text-[10px] font-mono text-[#ffa116]/70">
            {topic}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const LinkedInContent = () => (
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { value: '500+', label: 'Connections', icon: Users },
        { value: '15+', label: 'Endorsements', icon: Star },
        { value: '8', label: 'Articles', icon: BookOpen },
      ].map((stat, i) => (
        <div key={i} className="text-center p-4 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl">
          <stat.icon className="w-4 h-4 mx-auto mb-1 text-[#0077b5]/70" />
          <span className="block text-xl font-display font-black tabular-nums">{stat.value}</span>
          <span className="text-[8px] uppercase tracking-wider opacity-30 font-bold">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Recent Activity */}
    <div>
      <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block mb-3">Recent Activity</span>
      <div className="space-y-3">
        {[
          { type: 'Post', text: 'Shared insights on building scalable MERN architectures', engagement: '2.4k views' },
          { type: 'Article', text: 'How I won my first hackathon — lessons learned', engagement: '1.8k views' },
          { type: 'Post', text: 'Open-sourced my portfolio template for developers', engagement: '890 views' },
        ].map((activity, i) => (
          <div key={i} className="flex items-start space-x-3 p-3 border border-black/5 dark:border-white/5 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[#0077b5] mt-1.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] uppercase tracking-widest text-[#0077b5] font-bold">{activity.type}</span>
              <p className="text-xs opacity-60 leading-relaxed line-clamp-1">{activity.text}</p>
              <span className="text-[9px] opacity-30 font-mono">{activity.engagement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Skills & Endorsements */}
    <div>
      <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block mb-3">Top Skills</span>
      <div className="space-y-2">
        {[
          { skill: 'React.js', endorsements: 15 },
          { skill: 'Node.js', endorsements: 12 },
          { skill: 'Full Stack Development', endorsements: 10 },
        ].map((s) => (
          <div key={s.skill} className="flex items-center justify-between">
            <span className="text-xs font-medium">{s.skill}</span>
            <span className="text-[9px] font-mono opacity-40">{s.endorsements} endorsements</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Stats = () => {
  const platforms = [
    {
      title: 'GitHub',
      icon: Github,
      bgColor: 'bg-black dark:bg-zinc-800',
      username: '@viperscar404',
      href: 'https://github.com/viperscar404',
      content: <GitHubContent />,
    },
    {
      title: 'LeetCode',
      icon: Code2,
      bgColor: 'bg-[#ffa116]',
      username: '@viperscar404',
      href: 'https://leetcode.com/u/viperscar404',
      content: <LeetCodeContent />,
    },
    {
      title: 'LinkedIn',
      icon: Linkedin,
      bgColor: 'bg-[#0077b5]',
      username: '/in/viperscar404',
      href: 'https://linkedin.com/in/viperscar404',
      content: <LinkedInContent />,
    },
  ];

  return (
    <section id="stats" className="py-24 overflow-hidden border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 relative">
           <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.03 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black pointer-events-none uppercase tracking-tighter"
           >
              Socials
           </motion.div>
           <h2 className="text-6xl md:text-9xl font-display font-black uppercase mb-4 relative z-10 leading-none">
             Digital <br />
             <span className="text-stroke">Authority</span>
           </h2>
           <p className="text-xs uppercase tracking-[0.8em] opacity-30 font-bold mt-8">Measurable impact across the web</p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platforms.map((platform, i) => (
            <PlatformCard key={platform.title} platform={platform} delay={i * 0.15} />
          ))}
        </div>

        {/* Currently Bar */}
        <div className="relative py-16 mt-12 flex items-center justify-center overflow-hidden">
           <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] flex items-center space-x-16 opacity-20 font-display font-black text-3xl uppercase italic tracking-tighter">
              {[1, 2, 3, 4].map(i => (
                <React.Fragment key={i}>
                   <span>Architecting Future Web</span>
                   <span className="text-primary">/</span>
                   <span>Learning System Design</span>
                   <span className="text-primary">/</span>
                   <span>Open to Collaborative Roles</span>
                   <span className="text-primary">/</span>
                   <span>Based in Gujarat, Bharat</span>
                   <span className="text-primary">/</span>
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
