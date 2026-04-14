export default function Contact() {
  return (
    <main>
      <h1>Contact Me</h1>
      <p>I am open to opportunities, collaborations and conversations. Feel free to reach out.</p>

      {/* Contact detail cards */}
      <div className="contact-grid">

        <div className="contact-card">
          <h3>Email</h3>
          <a href="mailto:jemistates7@gmail.com">jemistates7@gmail.com</a>
        </div>

        <div className="contact-card">
          <h3>LinkedIn</h3>
          <a href="https://linkedin.com" target="_blank">linkedin.com/in/Ssekajja Victoria</a>
        </div>

        <div className="contact-card">
          <h3>GitHub</h3>
          <a href="https://github.com" target="_blank">github.com/Victoria Mirembe</a>
        </div>

      </div>

      {/* Contact form */}
      <div className="contact-form">
        <h2>Send me a message</h2>

        <div className="form-group">
          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea rows="5" placeholder="Write your message here..."></textarea>
        </div>

        <button className="btn">Send Message</button>
      </div>

    </main>
  )
}