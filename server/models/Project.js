import mongoose from 'mongoose'

/** Project schema stores portfolio projects */
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  techStack: { type: [String], default: [] },
  githubUrl: { type: String },
  demoUrl: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Project', ProjectSchema)
