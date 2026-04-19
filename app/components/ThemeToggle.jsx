'use client';

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: '2px solid white',
        color: 'white',
        borderRadius: '8px',
        padding: '6px 14px',
        cursor: 'pointer',
        fontSize: '18px',
      }}
      title="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}