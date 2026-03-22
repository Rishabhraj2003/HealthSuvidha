import Navbar from "../components/Navbar";
import "./About.css";

const teamMembers = [
  {
    name: "Dr. A. Sharma",
    role: "Chief Medical Officer",
    img: "/assets/doctor1.jpg",
  },
  {
    name: "Dr. R. Singh",
    role: "Head of Research",
    img: "/assets/doctor2.jpg",
  },
  {
    name: "Rishabh",
    role: "Founder & Developer",
    img: "/assets/developer.jpg",
  },
  {
    name: "Anjali",
    role: "Customer Support Lead",
    img: "/assets/support.jpg",
  },
];

function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <h2>
          About <span className="highlight">Healthसुविधा</span>
        </h2>
        <p>
          <strong>Healthसुविधा</strong> is your trusted healthcare companion,
          making <em>medical services simple, reliable, and accessible</em> for
          everyone. From doctors to medicines to insurance guidance, we are here
          for you.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className="about-details">
        <div className="about-card">
          <h3>🌍 Our Mission</h3>
          <p>
            Ensure every person has access to the right healthcare at the right
            time, wherever they live.
          </p>
        </div>

        <div className="about-card">
          <h3>💡 Our Vision</h3>
          <p>
            Build a healthier tomorrow with smart digital healthcare solutions
            for India and beyond.
          </p>
        </div>

        <div className="about-card">
          <h3>🤝 Why Choose Us?</h3>
          <ul>
            <li>Trusted doctors & easy appointments</li>
            <li>Doorstep medicine delivery</li>
            <li>Insurance support & guidance</li>
            <li>24×7 emergency helpline</li>
            <li>AI-powered healthcare innovation</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>
          Meet Our <span className="highlight">Team</span>
        </h2>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member">
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>
            Contact us:{" "}
            <a href="mailto:info@healthsuvidha.com">info@healthsuvidha.com</a>
          </p>
          <p>
            Follow us: <a href="#">Facebook</a> | <a href="#">Twitter</a> |{" "}
            <a href="#">Instagram</a>
          </p>
          <p>© 2025 Healthसुविधा. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default About;
