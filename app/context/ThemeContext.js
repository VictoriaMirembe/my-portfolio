'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the "radio station"
const ThemeContext = createContext();

// 2. This is the "broadcaster" — it wraps your whole app
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Remember the user's choice even after page refresh
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setIsDark(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {/* This adds 'dark-mode' class to whatever wraps the app */}
      <div className={isDark ? 'dark-mode' : ''} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 3. This is how any page "tunes in" to the station
export function useTheme() {
  return useContext(ThemeContext);
}