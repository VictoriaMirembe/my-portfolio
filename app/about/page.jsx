import Wrapper from "../components/Wrapper"
export default function About() {
  return (
    <Wrapper>
      <main>
      <h1>Learn About Me</h1>
      <p>
        I am Victoria, a Software Developer based in Kampala, Uganda, currently
        working at MCI Media Lab. I build web, mobile, and backend applications,
        and integrate AI capabilities where they add real value.
      </p>

      <div className="skills-">
        <h2>This is my Skills Set</h2>
        <div className="skills-set">
          <div className="skill">HTML & CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">React</div>
          <div className="skill">Next.js</div>
          <div className="skill">React Native</div>
          <div className="skill">Node.js & Express</div>
          <div className="skill">Databases (MongoDB/SQL)</div>
          <div className="skill">REST APIs</div>
          <div className="skill">Claude AI API</div>
          <div className="skill">Git & GitHub</div>
        </div>
      </div>

      <div className="education">
        <h2>Education</h2>
        <div className="card">
          <h3>Diploma in Data Science Management Analytics</h3>
          <p>Uganda Institute of Information and communication Technology — 2026</p>
        </div>
      </div>

    </main>
    </Wrapper>
  )
}