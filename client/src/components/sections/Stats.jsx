import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Github, Code2, Linkedin, ExternalLink, GitFork, Star, Users, Trophy, Target, TrendingUp, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';

// Generate contribution data (GitHub-style grid)
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
    'bg-black/5 dark:bg-white/5 border border-white/5',
    'bg-primary/20 border border-primary/10',
    'bg-primary/40 border border-primary/25',
    'bg-primary/65 border border-primary/40',
    'bg-primary/90 border border-primary/60 shadow-sm shadow-primary/20',
  ];

  return (
    <div className="contribution-grid mt-4">
      {data.map((level, i) => (
        <div
          key={i}
          className={cn('contribution-cell rounded-[3px] aspect-square transition-all duration-300 hover:scale-125 hover:z-10', colors[level])}
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
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden shadow-md hover:shadow-2xl hover:border-primary/45 transition-all duration-500 cursor-none"
      data-cursor="pointer"
    >
      {/* Spotlight hover element inside the card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-2xl" 
        style={{ background: `radial-gradient(circle at top right, ${platform.brandColor}, transparent 70%)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 border border-white/10", platform.bgColor)}>
            <platform.icon className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-black dark:text-white group-hover:text-primary transition-colors">
              {platform.title}
            </h3>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{platform.username}</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">VISIT</span>
          <ExternalLink className="w-3 h-3 text-primary" />
        </div>
      </div>

      {/* Platform-Specific Content */}
      <div className="relative z-10">
        {platform.content}
      </div>

      {/* Background icon watermark */}
      <platform.icon 
        className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.012] group-hover:opacity-[0.035] transition-all duration-700 pointer-events-none" 
        style={{ color: platform.brandColor }}
      />
    </motion.a>
  );
};

const GitHubContent = () => {
  const [stats, setStats] = useState({
    repos: 42,
    followers: 11,
    stars: 3,
    forks: 3,
    topLangs: [
      { name: 'JavaScript', pct: 38, color: 'bg-yellow-400' },
      { name: 'HTML', pct: 29, color: 'bg-orange-500' },
      { name: 'TypeScript', pct: 7, color: 'bg-blue-500' },
      { name: 'C', pct: 5, color: 'bg-indigo-500' },
      { name: 'CSS', pct: 2, color: 'bg-purple-500' }
    ],
    topRepos: [
      { name: 'ReturnIQ', desc: 'AI & computer vision platform for product returns.', stars: 1, lang: 'JavaScript' },
      { name: 'Avenir_AI', desc: 'AI-powered Resume Gap Analyzer & Mock Interview Coach.', stars: 1, lang: 'JavaScript' }
    ]
  });

  useEffect(() => {
    fetch('/api/stats/github')
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (data && data.repos !== undefined) setStats(data);
      })
      .catch(async () => {
        // Direct Client-Side Fallback fetch for GitHub API
        try {
          const uRes = await fetch('https://api.github.com/users/paldpathak404');
          if (!uRes.ok) return;
          const uData = await uRes.json();
          const rRes = await fetch('https://api.github.com/users/paldpathak404/repos?per_page=100');
          if (!rRes.ok) return;
          const rData = await rRes.json();
          
          let totalStars = 0;
          let totalForks = 0;
          const languages = {};
          rData.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });
          const topLangs = Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({
              name,
              pct: Math.round((count / rData.length) * 100),
              color: name === 'TypeScript' ? 'bg-blue-500' : name === 'JavaScript' ? 'bg-yellow-400' : name === 'HTML' ? 'bg-orange-500' : name === 'Python' ? 'bg-green-500' : 'bg-gray-400'
            }));
          const topRepos = rData
            .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
            .slice(0, 2)
            .map(r => ({ name: r.name, desc: r.description || '', stars: r.stargazers_count, lang: r.language || 'Code' }));

          setStats({
            repos: uData.public_repos || 42,
            followers: uData.followers || 11,
            stars: totalStars,
            forks: totalForks,
            topLangs,
            topRepos
          });
        } catch (e) {
          console.warn('GitHub client fallback fetch error:', e);
        }
      });
  }, []);

  return (
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { icon: BookOpen, value: stats?.repos ?? '42', label: 'Repos' },
        { icon: Star, value: stats?.stars ?? '3', label: 'Stars' },
        { icon: GitFork, value: stats?.forks ?? '3', label: 'Forks' },
        { icon: Users, value: stats?.followers ?? '11', label: 'Followers' },
      ].map((stat, i) => (
        <div key={i} className="text-center p-3 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl hover:border-primary/25 transition-all">
          <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
          <span className="block text-lg font-display font-black tabular-nums text-black dark:text-white">{stat.value}</span>
          <span className="text-[8px] uppercase tracking-wider opacity-30 font-mono font-bold">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Contribution Grid */}
    <div>
      <div className="flex justify-between items-center mb-2 text-[9px] font-mono font-bold uppercase tracking-widest">
        <span className="opacity-30">Contribution Activity</span>
        <span className="text-primary">Active Contributor</span>
      </div>
      <ContributionGrid />
      <div className="flex items-center justify-end space-x-1.5 mt-3">
        <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest mr-1">Less</span>
        {['bg-black/5 dark:bg-white/5', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/90'].map((c, i) => (
          <div key={i} className={cn('w-2.5 h-2.5 rounded-[2px]', c)} />
        ))}
        <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest ml-1">More</span>
      </div>
    </div>

    {/* Top Languages */}
    {stats?.topLangs && stats.topLangs.length > 0 && (
      <div>
        <span className="text-[9px] font-mono uppercase tracking-widest opacity-30 font-bold block mb-3">Top Languages</span>
        <div className="flex gap-3 flex-wrap">
          {stats.topLangs.map((lang) => (
            <div key={lang.name} className="flex items-center space-x-1.5 text-[10px] opacity-75 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md font-semibold">
              <div className={cn('w-2 h-2 rounded-full shrink-0', lang.color)} />
              <span>{lang.name}</span>
              <span className="font-mono opacity-50">{lang.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Pinned Repos */}
    {stats?.topRepos && stats.topRepos.length > 0 && (
      <div>
        <span className="text-[9px] font-mono uppercase tracking-widest opacity-30 font-bold block mb-3">Featured Repositories</span>
        <div className="grid grid-cols-2 gap-3">
          {stats.topRepos.map((repo) => (
            <div key={repo.name} className="p-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary block mb-1">{repo.name}</span>
                <span className="text-[10px] opacity-50 block mb-3 font-semibold line-clamp-2">{repo.desc || 'Open-source repository'}</span>
              </div>
              <div className="flex items-center space-x-3 text-[9px] opacity-40 font-mono">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-primary" />
                  <span>{repo.stars}</span>
                </div>
                <span className="font-bold">{repo.lang}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

const LeetCodeContent = () => {
  const [stats, setStats] = useState({
    easy: 198, easyTotal: 955,
    medium: 27, mediumTotal: 2089,
    hard: 2, hardTotal: 955,
    totalSolved: 227,
    ranking: 699794
  });

  useEffect(() => {
    fetch('/api/stats/leetcode')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        if (data && !data.error && data.easy !== undefined) setStats(data);
      })
      .catch(async () => {
        // Direct Client-Side Fallback fetch for LeetCode API
        try {
          const query = `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats { acSubmissionNum { difficulty count } }
                profile { ranking }
              }
              allQuestionsCount { difficulty count }
            }
          `;
          const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { username: 'paldpathak404' } })
          });
          const json = await res.json();
          if (json.data?.matchedUser) {
            const subStats = json.data.matchedUser.submitStats.acSubmissionNum;
            const allCounts = json.data.allQuestionsCount || [];
            const easy = subStats.find(s => s.difficulty === 'Easy')?.count || 198;
            const medium = subStats.find(s => s.difficulty === 'Medium')?.count || 27;
            const hard = subStats.find(s => s.difficulty === 'Hard')?.count || 2;
            const easyTotal = allCounts.find(c => c.difficulty === 'Easy')?.count || 955;
            const mediumTotal = allCounts.find(c => c.difficulty === 'Medium')?.count || 2089;
            const hardTotal = allCounts.find(c => c.difficulty === 'Hard')?.count || 955;
            const ranking = json.data.matchedUser.profile?.ranking || 699794;
            setStats({ easy, medium, hard, easyTotal, mediumTotal, hardTotal, totalSolved: easy + medium + hard, ranking });
          }
        } catch (e) {
          console.warn('LeetCode fallback fetch error:', e);
        }
      });
  }, []);

  return (
  <div className="space-y-6">
    {/* Problem Stats */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Easy', solved: stats.easy, total: stats.easyTotal, color: 'text-green-400', bg: 'bg-green-400' },
        { label: 'Medium', solved: stats.medium, total: stats.mediumTotal, color: 'text-yellow-400', bg: 'bg-yellow-400' },
        { label: 'Hard', solved: stats.hard, total: stats.hardTotal, color: 'text-red-400', bg: 'bg-red-400' },
      ].map((diff, i) => (
        <div key={i} className="text-center p-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl">
          <span className={cn("block text-2xl font-display font-black tabular-nums", diff.color)}>{diff.solved}</span>
          <span className="text-[8px] uppercase font-mono tracking-wider opacity-30 font-bold">/{diff.total} {diff.label}</span>
          <div className="mt-2.5 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(parseInt(diff.solved) / parseInt(diff.total || 1)) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
              className={cn('h-full rounded-full', diff.bg)}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Contest & Global Ranking */}
    <div className="p-6 bg-gradient-to-br from-black/5 to-white/5 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-between">
      <div className="relative z-10">
        <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest font-bold block mb-1">Global LeetCode Rank</span>
        <span className="text-3xl font-display font-black text-yellow-500">#{stats.ranking ? stats.ranking.toLocaleString() : '699,794'}</span>
        <span className="text-[10px] text-green-400 flex items-center mt-1 font-bold">
          <TrendingUp className="w-3 h-3 mr-1" /> {stats.totalSolved || (stats.easy + stats.medium + stats.hard)} Problems Solved
        </span>
      </div>
      <Trophy className="w-16 h-16 text-yellow-500/20 relative z-10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-2xl" />
    </div>
  </div>
  );
};

const LinkedInContent = () => {
  const [stats, setStats] = useState({
    connections: '500+',
    impressions: '10K+',
    endorsements: [
      { skill: 'Full-Stack Development', count: 48 },
      { skill: 'React / Next.js', count: 42 },
      { skill: 'System Architecture & DSA', count: 31 }
    ]
  });

  useEffect(() => {
    fetch('/api/stats/linkedin')
      .then(res => res.json())
      .then(data => {
        if (data && data.connections) setStats(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
  <div className="space-y-6">
    {/* Engagement Stats */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { value: stats.connections, label: 'Connections', icon: Users },
        { value: stats.impressions, label: 'Post Impressions', icon: TrendingUp },
      ].map((stat, i) => (
        <div key={i} className="flex flex-col justify-center p-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl">
          <stat.icon className="w-5 h-5 text-blue-500 mb-2" />
          <span className="text-xl font-display font-black tabular-nums text-black dark:text-white">{stat.value}</span>
          <span className="text-[9px] uppercase font-mono tracking-wider opacity-40 font-bold mt-1">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Featured Endorsements */}
    {stats.endorsements.length > 0 && (
    <div>
      <span className="text-[9px] font-mono uppercase tracking-widest opacity-30 font-bold block mb-3">Top Endorsements</span>
      <div className="space-y-2">
        {stats.endorsements.map((item) => (
          <div key={item.skill} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
            <span className="text-[11px] font-semibold text-black/80 dark:text-white/80">{item.skill}</span>
            <div className="flex items-center bg-blue-500/10 px-2 py-1 rounded-md text-blue-500">
              <span className="text-[10px] font-bold">+{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    )}
  </div>
  );
};

export const Stats = () => {
  const platforms = [
    {
      title: 'GitHub',
      username: '@paldpathak404',
      href: 'https://github.com/paldpathak404',
      icon: Github,
      brandColor: '#2ea44f',
      bgColor: 'bg-[#24292e]',
      content: <GitHubContent />
    },
    {
      title: 'LeetCode',
      username: '@paldpathak404',
      href: 'https://leetcode.com/u/paldpathak404',
      icon: Code2,
      brandColor: '#ffa116',
      bgColor: 'bg-[#282828]',
      content: <LeetCodeContent />
    },
    {
      title: 'LinkedIn',
      username: 'in/paldpathak',
      href: 'https://linkedin.com/in/paldpathak',
      icon: Linkedin,
      brandColor: '#0a66c2',
      bgColor: 'bg-[#0a66c2]',
      content: <LinkedInContent />
    }
  ];

  return (
    <section id="stats" className="py-32 relative overflow-hidden bg-[#fafafa] dark:bg-[#030303]">
      
      {/* Heavy radial blur background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">DIGITAL FOOTPRINT</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-black dark:text-white">
              Metrics & <span className="text-stroke">Presence</span>
            </h2>
          </div>
          <p className="text-sm text-black/50 dark:text-white/50 max-w-sm leading-relaxed font-medium pb-2">
            A real-time aggregated view of my open-source contributions, algorithmic problem-solving capabilities, and professional network growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platforms.map((platform, i) => (
            <PlatformCard key={platform.title} platform={platform} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
