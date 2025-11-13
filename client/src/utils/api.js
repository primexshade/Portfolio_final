import axios from 'axios'

/**
 * Axios instance configured with API base URL.
 * VITE_API_BASE_URL should be set in client env (Vercel/Local).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Helper wrappers
export const getProjects = () => api.get('/api/projects')
export const postProject = (payload) => api.post('/api/projects', payload)
export const postContact = (payload) => api.post('/api/contact', payload)
export const getLeetCodeStats = (username) => api.get(`/api/leetcode?username=${encodeURIComponent(username)}`)
export const getGitHubUser = (username) => api.get(`/api/github?username=${encodeURIComponent(username)}`)
