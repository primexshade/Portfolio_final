import Project from '../models/Project.js'

/** GET /api/projects - fetch all projects */
export async function getProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) { next(err) }
}

/** POST /api/projects - create a new project */
export async function createProject(req, res, next) {
  try {
    const { title, description, techStack = [], githubUrl, demoUrl, imageUrl, featured } = req.body
    const project = await Project.create({ title, description, techStack, githubUrl, demoUrl, imageUrl, featured })
    res.status(201).json(project)
  } catch (err) { next(err) }
}
