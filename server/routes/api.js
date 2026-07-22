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
        color: name === 'TypeScript' ? 'bg-blue-500' : name === 'JavaScript' ? 'bg-yellow-400' : name === 'HTML' ? 'bg-orange-500' : name === 'Python' ? 'bg-green-500' : 'bg-gray-400'
      }));

    const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
      .slice(0, 2)
      .map(r => ({
        name: r.name,
        desc: r.description || '',
        stars: r.stargazers_count,
        lang: r.language || 'Code'
      }));

    githubCache = {
      repos: userResponse.data.public_repos || 42,
      followers: userResponse.data.followers || 11,
      stars: totalStars,
      forks: totalForks,
      topLangs: topLangs.length > 0 ? topLangs : fallbackGitHubStats.topLangs,
      topRepos: topRepos.length > 0 ? topRepos : fallbackGitHubStats.topRepos
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
  easy: 198, medium: 27, hard: 2, totalSolved: 227,
  easyTotal: 955, mediumTotal: 2089, hardTotal: 955,
  ranking: 699794
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
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables: { username: LEETCODE_USERNAME }
    });
    
    if (response.data.errors || !response.data.data?.matchedUser) {
       throw new Error('LeetCode GraphQL error or user not found');
    }

    const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;
    const allCounts = response.data.data.allQuestionsCount || [];
    const ranking = response.data.data.matchedUser.profile?.ranking || 699794;

    const easy = stats.find(s => s.difficulty === 'Easy')?.count || 198;
    const medium = stats.find(s => s.difficulty === 'Medium')?.count || 27;
    const hard = stats.find(s => s.difficulty === 'Hard')?.count || 2;
    const totalSolved = stats.find(s => s.difficulty === 'All')?.count || (easy + medium + hard);

    const easyTotal = allCounts.find(c => c.difficulty === 'Easy')?.count || 955;
    const mediumTotal = allCounts.find(c => c.difficulty === 'Medium')?.count || 2089;
    const hardTotal = allCounts.find(c => c.difficulty === 'Hard')?.count || 955;

    leetcodeCache = {
      easy, medium, hard, totalSolved,
      easyTotal, mediumTotal, hardTotal,
      ranking
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

// LinkedIn API route
router.get('/stats/linkedin', async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json({
    connections: '500+',
    impressions: '10K+',
    endorsements: [
      { skill: 'Full-Stack Development', count: 48 },
      { skill: 'React / Next.js', count: 42 },
      { skill: 'System Architecture & DSA', count: 31 }
    ]
  });
});

export default router;
