// Personal Data
export const PERSONAL_DATA = {
  name: 'Aryan Tiwari',
  title: 'Software Developer',
  email: 'aaryan.tiwari54@gmail.com',
  phone: '+91-8318574536',
  tagline: 'Designing Interfaces. Engineering Experiences. Built with Craft.',
  summary: 'Highly driven Software Developer proficient in MERN stack, backend engineering, AI fundamentals, and distributed web systems. Strong experience in building scalable full-stack applications, managing technical teams, and integrating secure blockchain + Web3 components. Passionate about designing robust systems, solving complex problems, and delivering production-grade software—actively seeking opportunities at Microsoft and Amazon to contribute to high-impact engineering work.',
  github: 'primexshade',
  leetcode: 'primexshade',
  resumePath: '/resume/Aryan_Tiwari.pdf',
  profileImage: '/images/profile.jpg',
  socialLinks: {
    github: 'https://github.com/primexshade',
    linkedin: 'https://www.linkedin.com/in/aryan-tiwari-shade',
    leetcode: 'https://leetcode.com/u/primexshade/',
  }
}

// Skills from Resume
export const SKILLS = {
  languages: ['Java', 'JavaScript (ES6+)', 'C', 'C++', 'Python (basic)'],
  frameworks: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'Mongoose'],
  cloud: ['AWS (EC2, S3, Lambda, Route 53, RDS)', 'Git', 'GitHub', 'CI/CD basics'],
  expertise: ['Backend Development', 'REST API Design', 'System Architecture', 'DSA', 'Problem Solving', 'Security Concepts', 'Social Engineering']
}

// Experience from Resume
export const EXPERIENCE = [
  {
    title: 'Full Stack Developer',
    company: 'Freelance & Academic Projects',
    period: '2023 — Present',
    description: [
      'Designed and deployed end-to-end MERN applications emphasizing scalability and clean backend architecture.',
      'Worked with REST APIs, authentication, JWT-based security, and Socket.io real-time communication.',
      'Collaborated with frontend teams to implement UI/UX-optimized features using React + Tailwind.'
    ]
  }
]

// Projects from Resume
export const FEATURED_PROJECTS = [
  {
    title: 'Alumni Management System',
    tech: 'MERN + Three.js',
    year: '2025',
    description: [
      'Built with JWT auth, role-based access, and optimized MongoDB schema design.',
      'Uses Three.js for interactive visuals.',
      'Includes alumni interaction flows and secure event posting.'
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Three.js', 'JWT', 'Express']
  },
  {
    title: 'Portfolio Website',
    tech: 'Next.js / MERN',
    year: '2025',
    description: [
      'Microsoft/Apple-inspired design with animations and resume integration.',
      'Dynamic rendering, dark/light mode, CMS-style architecture.'
    ],
    tags: ['React', 'Next.js', 'MERN', 'Tailwind', 'Framer Motion']
  }
]

// Achievements from Resume
export const ACHIEVEMENTS = [
  'President, GFG Student Chapter, 2024–25',
  'Participated in Smart India Hackathon',
  'Strong academics in SE, DBMS, AI, DSA, Networking',
  'Conducted workshops on AWS, Web Development, AI'
]

// Education from Resume
export const EDUCATION = {
  degree: 'B.Tech – Computer Science & Engineering',
  institution: 'SRM Institute of Science & Technology, NCR Campus',
  period: '2023 — Present',
  year: '3rd Year',
  cgpa: '8.03'
}

// UI color constants to keep design consistent
export const COLORS = {
  dark: {
    background: '#0D1117',
    text: '#C9D1D9',
    accent: '#2F81F7',
  },
  light: {
    background: '#F5F5F5',
    text: '#1A1A1A',
    accent: '#0078D4',
  },
}

// App routes for Navbar
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/stats', label: 'Stats' },
  { path: '/contact', label: 'Contact' },
]
