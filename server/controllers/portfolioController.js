import { Project } from '../models/Project.js';
import { Skill, Certificate, Hackathon, Achievement, Education } from '../models/Schemas.js';

export const getProjects = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    
    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    
    const skills = await Skill.find(filter).sort({ level: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    
    const certificates = await Certificate.find(filter).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ date: -1 });
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ endYear: -1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
