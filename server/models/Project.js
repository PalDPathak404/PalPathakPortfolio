import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  category: { type: String, enum: ['personal', 'hackathon'], required: true },
  subCategory: { type: String, enum: ['Game', 'Clone', 'Full Stack', 'Frontend'], required: true },
  tags: [String],
  thumbnail: { type: String, required: true },
  githubUrl: String,
  liveUrl: String,
  youtubeId: String,
  postmanUrl: String,
  figmaUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
