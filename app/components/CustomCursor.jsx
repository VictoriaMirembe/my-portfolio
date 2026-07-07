'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, .card, .service-card, .featured-project-card, .side-nav-item, ' +
  '.skill, .contact-card, .chatbot-toggle, .chatbot-send, .nav-toggle, [role="button"]'

const TEXT_SELECTOR = 'input, textarea'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const wrapperRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    function handleMouseMove(e) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    function handleMouseOver(e) {
      if (!wrapperRef.current) return
      if (e.target.closest(TEXT_SELECTOR)) {
        wrapperRef.current.classList.add('is-text')
        wrapperRef.current.classList.remove('is-hovering')
      } else if (e.target.closest(INTERACTIVE_SELECTOR)) {
        wrapperRef.current.classList.add('is-hovering')
        wrapperRef.current.classList.remove('is-text')
      }
    }

    function handleMouseOut(e) {
      if (!wrapperRef.current) return
      const related = e.relatedTarget
      if (related && (related.closest?.(INTERACTIVE_SELECTOR) || related.closest?.(TEXT_SELECTOR))) return
      wrapperRef.current.classList.remove('is-hovering', 'is-text')
    }

    function handleMouseLeaveWindow() {
      if (wrapperRef.current) wrapperRef.current.style.opacity = '0'
    }

    function handleMouseEnterWindow() {
      if (wrapperRef.current) wrapperRef.current.style.opacity = '1'
    }

    function tick() {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={wrapperRef} className="cursor-wrapper">
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </div>
  )
}
