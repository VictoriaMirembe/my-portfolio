'use client'

import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import useScrollSpy from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(NAV_ITEMS.map((item) => item.id))

  return (
    <nav>
      <div className="logo-group">
        <a href="#home" className="logo">Victoria</a>
        <span className="location-badge">📍 Based in Kampala, Uganda</span>
      </div>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? 'nav-link-active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>

      <ThemeToggle />
    </nav>
  )
}
