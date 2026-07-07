import React from 'react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-top">
          <div className="logo-group">
            <a href="#home" className="logo">Victoria</a>
            <span className="location-badge">📍 Based in Kampala, Uganda</span>
          </div>
          <div className="footer-status">
            <span className="status-dot"></span>
            Available for work
          </div>
        </div>

        <div className="footer-links">
          <a href="https://github.com/VictoriaMirembe" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ssekajja-victoria-243216284/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:jemistates7@gmail.com">Email</a>
        </div>

        <p className="footer-copyright">
          © {year} Victoria Ssekajja. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
