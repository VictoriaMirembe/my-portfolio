'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Wrapper from './components/Wrapper';

export default function Home() {
  const fullName = "Ssekajja Victoria Mirembe Frontend Dev,"
  const [displayedName, setDisplayedName] = useState("")
  const [nameIndex, setNameIndex] = useState(0)

  useEffect(() => {
    if (nameIndex < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(prev => prev + fullName[nameIndex])
        setNameIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [nameIndex])

  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("jemistates7@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Wrapper>
      <main>
      <div className="hero-section">

        <div className="hero-text">
          <p className="hero-greeting">Hello, I am</p>
          <h1>{displayedName}<span className="cursor">|</span></h1>
          <h2>Junior AI Data Scientist</h2>
          <p className="hero-description">
            I build AI-powered tools for journalism education
            in East Africa. Based in Kampala, Uganda.
          </p>
          <div className="hero-buttons">
            <a href="/projects" className="btn">View My Work</a>
            <a href="/contact" className="btn-outline">Contact Me</a>
            <button onClick={copyEmail} className="btn-outline">
              {copied ? "✅ Copied!" : "📋 Copy Email"}
            </button>
          </div>
        </div>

        <div className="hero-image">
          <Image
            src="/profile.jpg"
            alt="Victoria Ssekajja"
            width={320}
            height={320}
          />
        </div>

      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>3+</h3>
          <p>Years of Experience</p>
        </div>
        <div className="stat-card">
          <h3>3+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-card">
          <h3>5+</h3>
          <p>AI Tools Built</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>Passion for Learning</p>
        </div>
      </div>

      <div className="services-section">
        <h2>What I Do</h2>
        <p>Here is how I can help your organisation</p>
        <div className="services">
          <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🤖</div>
            <h3>AI Integration</h3>
            <p>I connect AI tools like Claude and OpenAI into web applications to create smart interactive features.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌐</div>
            <h3>Web Development</h3>
            <p>I build clean responsive websites and platforms using React and Next.js that work on any device.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📚</div>
            <h3>E-Learning Tools</h3>
            <p>I create digital learning experiences that help educators teach complex topics in simple engaging ways.</p>
          </div>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🤖</div>
            <h3>AI Integration</h3>
            <p>I connect AI tools like Claude and OpenAI into web applications to create smart interactive features.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌐</div>
            <h3>Web Development</h3>
            <p>I build clean responsive websites and platforms using React and Next.js that work on any device.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📚</div>
            <h3>E-Learning Tools</h3>
            <p>I create digital learning experiences that help educators teach complex topics in simple engaging ways.</p>
          </div>
        </div>
        </div>
        
      </div>

    </main>
    </Wrapper>
  );
}