import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'Databases', 'Tools', 'DevOps'], required: true },
  icon: String, // lucide icon name
  level: { type: Number, min: 0, max: 100, required: true },
  color: String,
  logoUrl: String // for custom cursor icon
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema);

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, required: true },
  category: { type: String, enum: ['educational', 'hackathon'], required: true },
  imageUrl: { type: String, required: true },
  downloadUrl: String,
  description: String
}, { timestamps: true });

export const Certificate = mongoose.model('Certificate', certificateSchema);

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  theme: String,
  problemStatement: String,
  solution: String,
  outcome: String,
  teamSize: Number,
  repoUrl: String,
  demoUrl: String,
  techStack: [String],
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }
}, { timestamps: true });

export const Hackathon = mongoose.model('Hackathon', hackathonSchema);

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: String,
  icon: String, // lucide icon name
  type: String
}, { timestamps: true });

export const Achievement = mongoose.model('Achievement', achievementSchema);

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: String,
  field: String,
  startYear: String,
  endYear: String,
  grade: String,
  logoUrl: String
}, { timestamps: true });

export const Education = mongoose.model('Education', educationSchema);
