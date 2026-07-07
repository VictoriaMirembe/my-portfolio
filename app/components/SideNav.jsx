'use client'

import { Home, User, Sparkles, FolderGit2, Mail } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'skills', label: 'Skills', Icon: Sparkles },
  { id: 'projects', label: 'Projects', Icon: FolderGit2 },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

export default function SideNav() {
  const activeId = useScrollSpy(NAV_ITEMS.map((item) => item.id))

  return (
    <div className="side-nav">
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`side-nav-item ${activeId === id ? 'side-nav-item-active' : ''}`}
        >
          <Icon size={18} />
          <span className="side-nav-tooltip">{label}</span>
        </a>
      ))}
    </div>
  )
}
