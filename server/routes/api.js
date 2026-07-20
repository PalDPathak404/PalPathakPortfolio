import express from 'express';
import { 
  getProjects, 
  getSkills, 
  getCertificates, 
  getHackathons, 
  getAchievements, 
  getEducation 
} from '../controllers/portfolioController.js';
import axios from 'axios/dist/node/axios.cjs';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/certificates', getCertificates);
router.get('/hackathons', getHackathons);
router.get('/achievements', getAchievements);
router.get('/education', getEducation);

// Proxy for GitHub Stats (with simple in-memory cache)
let githubCache = null;
let githubCacheTime = 0;

const fallbackGitHubStats = {
  repos: 42,
  followers: 1200,
  stars: 350,
  forks: 45,
  topLangs: [
    { name: 'TypeScript', pct: 60, color: 'bg-blue-500' },
    { name: 'JavaScript', pct: 25, color: 'bg-yellow-400' },
    { name: 'Python', pct: 15, color: 'bg-green-500' }
  ],
  topRepos: [
    { name: 'shruviq-ai', desc: 'AI-driven voice feedback analytics dashboard.', stars: 120, lang: 'TypeScript' },
    { name: 'portfolio-v3', desc: 'Minimalist 3D portfolio experience built with React and Tailwind.', stars: 85, lang: 'JavaScript' }
  ]
};

router.get('/stats/github', async (req, res) => {
  const GITHUB_USERNAME = process.env.VITE_GITHUB_USERNAME || 'paldpathak404';
  
  if (githubCache && Date.now() - githubCacheTime < 3600000) {
    return res.json(githubCache);
  }
  
  try {
    const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
    const userResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    const reposResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, { headers });
    
    let totalStars = 0;
    let totalForks = 0;
    const languages = {};
    const repos = reposResponse.data;
    
    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLangs = Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / repos.length) * 100),
        color: name === 'TypeScript' ? 'bg-blue-500' : name === 'JavaScript' ? 'bg-yellow-400' : name === 'Python' ? 'bg-green-500' : 'bg-gray-400'
      }));

    const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 2).map(r => ({
      name: r.name,
      desc: r.description || '',
      stars: r.stargazers_count,
      lang: r.language
    }));

    githubCache = {
      repos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      stars: totalStars,
      forks: totalForks,
      topLangs,
      topRepos
    };
    githubCacheTime = Date.now();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.json(githubCache);
  } catch (err) {
    console.log('GitHub API error, using fallback data:', err.message);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.json(fallbackGitHubStats);
  }
});

let leetcodeCache = null;
let leetcodeCacheTime = 0;

const fallbackLeetCodeStats = {
  easy: 125, medium: 84, hard: 22,
  easyTotal: 800, mediumTotal: 1600, hardTotal: 700
};

router.get('/stats/leetcode', async (req, res) => {
  const LEETCODE_USERNAME = process.env.VITE_LEETCODE_USERNAME || 'paldpathak404';
  
  if (leetcodeCache && Date.now() - leetcodeCacheTime < 3600000) {
    return res.json(leetcodeCache);
  }

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables: { username: LEETCODE_USERNAME }
    });
    
    if (response.data.errors) {
       throw new Error('LeetCode GraphQL error');
    }

    const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;
    const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
    const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
    const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0;

    leetcodeCache = {
      easy, medium, hard,
      easyTotal: 800, mediumTotal: 1600, hardTotal: 700
    };
    leetcodeCacheTime = Date.now();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.json(leetcodeCache);
  } catch (err) {
    console.log('LeetCode API error, using fallback data:', err.message);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.json(fallbackLeetCodeStats);
  }
});

// Mock LinkedIn API to simulate live fetch (LinkedIn has no free public API)
router.get('/stats/linkedin', async (req, res) => {
  // We can't scrape LinkedIn on Vercel without getting blocked, so we use static data
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json({
    connections: '500+',
    impressions: '10K+',
    endorsements: [
      { skill: 'Full-Stack Development', count: 48 },
      { skill: 'React / Next.js', count: 42 },
      { skill: 'System Architecture', count: 31 }
    ]
  });
});

export default router;
