import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Project from './models/Project.js'

dotenv.config()

/** Seed sample projects into MongoDB Atlas */
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack MERN e-commerce application with cart, payments, and admin dashboard. Features include product filtering, user authentication, order tracking, and real-time inventory management.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Redux'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    featured: true,
  },
  {
    title: 'AI Chat Assistant',
    description: 'Real-time chat application powered by OpenAI GPT-4. Users can have intelligent conversations, get code help, and receive personalized recommendations.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Vercel AI SDK'],
    githubUrl: 'https://github.com/yourusername/ai-chat-assistant',
    demoUrl: 'https://ai-chat-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    featured: true,
  },
  {
    title: 'Task Management Dashboard',
    description: 'Kanban-style project management tool with drag-and-drop interface, team collaboration features, deadlines, and progress tracking.',
    techStack: ['React', 'Firebase', 'Material-UI', 'React Beautiful DnD'],
    githubUrl: 'https://github.com/yourusername/task-dashboard',
    demoUrl: 'https://task-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    featured: false,
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather application with 7-day forecasts, location search, current conditions, and interactive charts. Responsive design for all devices.',
    techStack: ['Vue.js', 'OpenWeather API', 'Chart.js', 'SASS'],
    githubUrl: 'https://github.com/yourusername/weather-app',
    demoUrl: 'https://weather-demo.surge.sh',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
    featured: false,
  },
  {
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for tracking social media metrics across multiple platforms. Real-time data visualization with engagement insights.',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Twitter API', 'Instagram API'],
    githubUrl: 'https://github.com/yourusername/social-analytics',
    demoUrl: 'https://analytics-demo.herokuapp.com',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    featured: true,
  },
  {
    title: 'Fitness Tracker',
    description: 'Personal fitness and workout tracking application with exercise logging, progress charts, goal setting, and nutrition tracking.',
    techStack: ['React Native', 'Expo', 'Firebase', 'Redux Toolkit'],
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    demoUrl: 'https://expo.dev/@yourusername/fitness-tracker',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    featured: false,
  },
]

async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'portfolioDB',
    })
    console.log('✅ Connected to MongoDB')

    // Clear existing projects (optional - comment out to keep existing)
    const deleteResult = await Project.deleteMany({})
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing projects`)

    // Insert sample projects
    const inserted = await Project.insertMany(sampleProjects)
    console.log(`✨ Successfully seeded ${inserted.length} projects:`)
    inserted.forEach((p) => console.log(`   - ${p.title}`))

    await mongoose.connection.close()
    console.log('👋 Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error.message)
    process.exit(1)
  }
}

seedProjects()
