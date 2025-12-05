import {
  Code2,
  Coffee,
  Database,
  Braces,
  Palette,
  Wind,
  Flame,
  GitBranch,
  Server,
  Command,
  Cpu,
  BookOpen
} from 'lucide-react'

/**
 * Skill Icons Mapping - Maps skill names to Lucide React icons
 * Used across About Section and About Page for visual skill representation
 */
export const SKILL_ICONS = {
  // Languages
  'JavaScript': Code2,
  'Java': Coffee,
  'C++': Braces,
  'SQL': Database,
  'HTML5': Code2,
  'CSS3': Palette,

  // Frameworks & Libraries
  'Node.js': Server,
  'Express.js': Server,
  'React.js': Code2,
  'Bootstrap': Palette,
  'Tailwind': Wind,

  // Databases
  'MongoDB': Database,

  // Tools
  'Git': GitBranch,
  'Firebase': Flame,

  // Defaults
  'default': Code2
}

/**
 * Get the appropriate icon component for a skill
 * @param {string} skillName - Name of the skill
 * @returns {React.ComponentType} - Lucide React icon component
 */
export function getSkillIcon(skillName) {
  return SKILL_ICONS[skillName] || SKILL_ICONS.default
}

/**
 * Skill colors for better visual distinction
 * Can be used with Tailwind color utilities
 */
export const SKILL_COLORS = {
  'JavaScript': 'text-yellow-400',
  'Java': 'text-orange-500',
  'C++': 'text-blue-500',
  'SQL': 'text-purple-500',
  'HTML5': 'text-red-500',
  'CSS3': 'text-blue-400',
  'Node.js': 'text-green-500',
  'Express.js': 'text-gray-400',
  'React.js': 'text-cyan-400',
  'Bootstrap': 'text-purple-600',
  'Tailwind': 'text-cyan-500',
  'MongoDB': 'text-green-600',
  'Git': 'text-red-600',
  'Firebase': 'text-yellow-500',
  'default': 'text-white/70'
}

/**
 * Get the appropriate color for a skill
 * @param {string} skillName - Name of the skill
 * @returns {string} - Tailwind color class
 */
export function getSkillColor(skillName) {
  return SKILL_COLORS[skillName] || SKILL_COLORS.default
}
