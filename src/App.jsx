import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript"],
  Frontend: [
    "React JS",
    "Next JS",
    "Redux",
    "RTK Query",
    "Tailwind CSS",
    "Context API",
    "Tanstack Query",
    "Material UI",
    "jQuery",
    "Bootstrap",
  ],
  Backend: ["Node JS", "Express JS", "Firebase", "RESTful APIs"],
  Database: ["MongoDB", "NoSQL Databases"],
  "Tools & Platforms": [
    "Git / GitHub",
    "Postman",
    "Nginx",
    "Vite",
    "Babel",
    "CI/CD",
  ],
  Methodology: ["Agile", "Scrum"],
};

const PROJECTS = [
  {
    title: "TrackFlow",
    subtitle: "Daily Habit Tracking App",
    description:
      "Full-stack habit tracking application with real-time analytics. Improved user task completion by 30% through smart tracking and push notifications.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Firebase",
      "MongoDB",
      "Tailwind",
      "Redux",
    ],
    metrics: [
      "+30% completion",
      "+35% engagement",
      "Dark mode",
      "Push notifications",
    ],
    color: "#00D4FF",
    liveUrl: "https://trackflow-beryl.vercel.app/",
  },
  {
    title: "Quiz App",
    subtitle: "Interactive Quiz Platform",
    description:
      "Responsive quiz application with dynamic questions, real-time scoring, and optimized component architecture.",
    tech: ["React.js", "TypeScript", "Material UI"],
    metrics: [
      "+40% participation",
      "-25% bugs",
      "Real-time scoring",
      "Responsive",
    ],
    color: "#FF6B6B",
    liveUrl: "https://quiezapp.netlify.app/",
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const heroRef = useRef(null);

  const titles = [
    "Frontend Developer",
    "React Specialist",
    "UI Architect",
    "TypeScript Engineer",
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleResumeDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/resume/Dhruv_Khambhata_Resume.pdf";
    link.download = "Dhruv_Khambhata_Frontend_Developer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const current = titles[titleIdx];
    const speed = deleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setTypedText(current.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setTypedText(current.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        } else {
          setDeleting(false);
          setTitleIdx((titleIdx + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, titleIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveSection(entry.target.dataset.section);
        });
      },
      { threshold: 0.3 },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section) => {
    document
      .getElementById(section.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="portfolio-root">
      {/* Background */}
      <div className="grid-bg" />
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-overlay">
          <button
            className="close-btn"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          {NAV_LINKS.map((link) => (
            <div
              key={link}
              className="mobile-nav-link"
              onClick={() => scrollTo(link)}
            >
              {link}
            </div>
          ))}
        </div>
      )}

      {/* NAV */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-bracket">{"<"}</span>DK
          <span className="logo-bracket">{"/>"}</span>
        </div>
        <div className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`nav-link ${activeSection === link ? "active" : ""}`}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}
        </div>
        <div className="nav-actions desktop-nav">
          <button
            className="resume-nav-btn"
            aria-label="Download Resume"
            onClick={handleResumeDownload}
          >
            {downloading ? (
              <span className="spinner" aria-hidden="true" />
            ) : (
              "↓"
            )}{" "}
            Resume
          </button>
          <a
            href="mailto:khambhatadhruv28@gmail.com"
            className="btn btn-primary"
          >
            Hire Me
          </a>
        </div>
        <button
          className="hamburger"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* HERO */}
      <section
        id="about"
        data-section="About"
        className="hero-section"
        ref={heroRef}
      >
        <div
          className={`fade-up ${isLoaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="section-label">Available for work</div>
        </div>
        <div
          className={`fade-up ${isLoaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <h1 className="hero-name">
            Dhruv
            <br />
            <span className="glow-text">Khambhata</span>
          </h1>
        </div>
        <div
          className={`fade-up ${isLoaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="hero-title-type">
            <span className="comment-slash">{"// "}</span>
            {typedText}
            <span className="cursor-blink">|</span>
          </div>
        </div>
        <div
          className={`fade-up ${isLoaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="hero-desc">
            Frontend Developer specializing in{" "}
            <strong>React.js, Next.js and TypeScript</strong>. Based in
            Ahmedabad and available as an <strong>Immediate Joiner</strong>. I
            build scalable, high-performance web applications with modern UI/UX.
          </p>
        </div>
        <div
          className={`fade-up ${isLoaded ? "loaded" : ""} hero-ctas`}
          style={{ transitionDelay: "0.5s" }}
        >
          <a
            href="mailto:khambhatadhruv28@gmail.com"
            className="btn btn-primary"
          >
            Get in Touch ↗
          </a>
          <button
            className="btn btn-resume"
            aria-label="Download Resume PDF"
            onClick={handleResumeDownload}
          >
            <span>
              {downloading ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Downloading...
                </>
              ) : (
                <>↓ Download Resume</>
              )}
            </span>
          </button>
          <a
            href="https://github.com/DhruvKhambhata"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dhruv-khambhata"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            LinkedIn
          </a>
        </div>
        <div
          className={`fade-up stats-row ${isLoaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.6s" }}
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "60%", label: "UI/UX Improvement" },
            { value: "2", label: "Major Projects" },
            { value: "10+", label: "Tech Stack" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        data-section="Experience"
        className="content-section"
      >
        <div className="section-label">Work History</div>
        <h2 className="section-title">Experience</h2>
        <div className="card card-accent-top">
          <div className="exp-header">
            <div>
              <h3 className="exp-role">Associate Software Developer</h3>
              <div className="exp-company">Bankai Informatics Pvt. Ltd.</div>
              <div className="exp-sub">
                formerly Acute Informatics Pvt. Ltd.
              </div>
            </div>
            <div className="exp-meta">
              <div className="badge-date">Dec 2022 – Feb 2026</div>
              <div className="exp-duration">3+ years</div>
            </div>
          </div>
          <div className="exp-bullets">
            {[
              {
                icon: "🏦",
                text: "Developed and maintained the frontend of an enterprise banking platform (EasyLOS), converting business requirements into stable, scalable user interfaces.",
              },
              {
                icon: "🎙️",
                text: "Built a voice assistant feature leveraging react-speech-recognition for hands-free banking interactions.",
              },
              {
                icon: "🏗️",
                text: "Migrated legacy frontend architecture into a monorepo structure, streamlining dependency management and improving cross-team efficiency.",
              },
              {
                icon: "📈",
                text: "Improved UI/UX quality by 60% through seamless REST API integration and frontend-backend synchronization, significantly reducing user errors.",
              },
              {
                icon: "⚡",
                text: "Optimized application performance by managing state updates efficiently, minimizing re-renders and handling API responses for faster page loads.",
              },
              {
                icon: "🔒",
                text: "Developed a custom form-to-grid data integration module enabling secure data transfer while maintaining backward compatibility.",
              },
            ].map((item, i) => (
              <div key={i} className="exp-bullet-row">
                <div
                  className="exp-dot"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <span className="exp-icon">{item.icon}</span>
                <p className="exp-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card education-card">
          <div className="edu-left">
            <div className="edu-tag">Education</div>
            <h3 className="edu-degree">
              Bachelor of Computer Applications (BCA)
            </h3>
            <div className="edu-college">
              Navgujarat College of Computer Applications
            </div>
          </div>
          <div className="edu-right">
            <div className="edu-year">Jun 2016 – Apr 2019</div>
            <div className="edu-score">Score: 60%</div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        data-section="Projects"
        className="content-section"
      >
        <div className="section-label">What I&apos;ve Built</div>
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div key={i} className="project-card card">
              <div
                className="project-accent"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                }}
              />
              <div
                className="project-glow"
                style={{ background: project.color }}
              />
              <div className="project-tag" style={{ color: project.color }}>
                Featured Project
              </div>
              <h3 className="project-title">{project.title}</h3>
              <div className="project-subtitle">{project.subtitle}</div>
              <p className="project-desc">{project.description}</p>
              <div className="metrics-row">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="metric-badge"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}33`,
                      background: `${project.color}14`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="tech-row">
                {project.tech.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="live-demo-btn"
                style={{ borderColor: project.color, color: project.color }}
              >
                <span
                  className="live-dot"
                  style={{ background: project.color }}
                />
                Live Demo ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" data-section="Skills" className="content-section">
        <div className="section-label">Tech Stack</div>
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <div key={category} className="card skill-card">
              <div className="skill-category">
                {["⚡", "🎨", "🔧", "🗄️", "🛠️", "📋"][i]} {category}
              </div>
              <div className="tags-wrap">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-tag ${hoveredSkill === skill ? "skill-tag-active" : ""}`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card proficiency-card">
          <div className="proficiency-label">{"// Core proficiency"}</div>
          {[
            { name: "React.js / Next.js", level: 92 },
            { name: "TypeScript", level: 85 },
            { name: "Node.js / Express", level: 72 },
            { name: "MongoDB / Firebase", level: 70 },
          ].map((item) => (
            <div key={item.name} className="prof-row">
              <div className="prof-meta">
                <span className="prof-name">{item.name}</span>
                <span className="prof-pct">{item.level}%</span>
              </div>
              <div className="prof-track">
                <div
                  className="prof-fill"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        data-section="Contact"
        className="content-section contact-section"
      >
        <div className="contact-card">
          <div className="contact-glow-top" />
          <div className="section-label" style={{ justifyContent: "center" }}>
            Let&apos;s Work Together
          </div>
          <h2 className="contact-title">
            Got a <span className="glow-text">project</span> in mind?
          </h2>
          <p className="contact-desc">
            I&apos;m currently available for freelance work and full-time roles.
            Let&apos;s build something amazing together.
          </p>
          <div className="contact-btns">
            <a
              href="mailto:khambhatadhruv28@gmail.com"
              className="btn btn-primary"
            >
              ✉️ khambhatadhruv28@gmail.com
            </a>
            <button
              className="btn btn-resume"
              aria-label="Download Resume PDF"
              onClick={handleResumeDownload}
            >
              <span>
                {downloading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />{" "}
                    Downloading...
                  </>
                ) : (
                  <>↓ Download Resume</>
                )}
              </span>
            </button>
            <a href="tel:+917990603842" className="btn btn-outline">
              📞 +91 79906 03842
            </a>
          </div>
          <div className="social-links">
            {[
              { label: "GitHub", url: "https://github.com/DhruvKhambhata" },
              {
                label: "LinkedIn",
                url: "https://linkedin.com/in/dhruv-khambhata",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="logo-bracket">{"<"}</span>
        Dhruv Khambhata
        <span className="logo-bracket">{" />"}</span>
        {" · Built with React · 2026"}
      </footer>
    </div>
  );
}
