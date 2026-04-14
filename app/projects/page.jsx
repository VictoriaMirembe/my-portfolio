export default function Projects() {
  return (
    <main>
      <h1>My Projects</h1>
      <p>Here are some things I have built.</p>

      <div className="projects-grid">

        <div className="project-card">
          <h3>Zara — AI Story Friend</h3>
          <p>An AI-powered teaching tool that helps children aged 5 to 8 learn through stories and games using the Claude API.</p>
          <div className="project-tags">
            <span className="tag">Next.js</span>
            <span className="tag">Claude API</span>
            <span className="tag">React</span>
          </div>
          <a href="#" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>MCI E-Learning Platform</h3>
          <p>An e-learning platform for journalism educators to learn about AI-powered disinformation detection.</p>
          <div className="project-tags">
            <span className="tag">Next.js</span>
            <span className="tag">AI Integration</span>
            <span className="tag">CSS</span>
          </div>
          <a href="#" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>My Portfolio</h3>
          <p>A personal portfolio website built with Next.js to showcase my projects and skills as a Junior AI Technician.</p>
          <div className="project-tags">
            <span className="tag">Next.js</span>
            <span className="tag">CSS</span>
            <span className="tag">React</span>
          </div>
          <a href="#" className="btn">View Project</a>
        </div>

      </div>
    </main>
  )
}