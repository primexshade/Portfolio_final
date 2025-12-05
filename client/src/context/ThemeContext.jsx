import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * ThemeContext provides a dark-first theme with persistence in localStorage.
 * - default: 'dark'
 * - toggles between 'dark' and 'light'
 */
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

const isLocalStorageAvailable = () => {
  if (typeof window === 'undefined') return false
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    console.warn('localStorage is not available:', e)
    return false
  }
}

const getStoredTheme = () => {
  try {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('theme') || 'dark'
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage:', e)
  }
  return 'dark'
}

const setStoredTheme = (theme) => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('theme', theme)
    }
  } catch (e) {
    console.warn('Failed to save theme to localStorage:', e)
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    setStoredTheme(theme)
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
