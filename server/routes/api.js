import express from 'express';
import { 
  getProjects, 
  getSkills, 
  getCertificates, 
  getHackathons, 
  getAchievements, 
  getEducation 
} from '../controllers/portfolioController.js';
import axios from 'axios/dist/node/axios.cjs'; // Updated this line

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

router.get('/stats/github', async (req, res) => {
  const GITHUB_USERNAME = process.env.VITE_GITHUB_USERNAME || 'placeholder';
  
  if (githubCache && Date.now() - githubCacheTime < 3600000) {
    return res.json(githubCache);
  }

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    githubCache = {
      repos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      stars: 0, // Would need separate call for stars
      mainLanguage: 'TypeScript',
      contributions: [] // Heatmap is harder to fetch directly without scraping or special API
    };
    githubCacheTime = Date.now();
    res.json(githubCache);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
});

export default router;
