import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript"],
  Frontend: ["React JS", "Next JS", "Redux", "RTK Query", "Tailwind CSS", "Context API", "Tanstack Query", "Material UI", "jQuery", "Bootstrap"],
  Backend: ["Node JS", "Express JS", "Firebase", "RESTful APIs"],
  Database: ["MongoDB", "NoSQL Databases"],
  "Tools & Platforms": ["Git / GitHub", "Postman", "Nginx", "Vite", "Babel", "CI/CD"],
  Methodology: ["Agile", "Scrum"],
};

const PROJECTS = [
  {
    title: "TrackFlow",
    subtitle: "Daily Habit Tracking App",
    description: "Full-stack habit tracking application with real-time analytics. Improved user task completion by 30% through smart tracking and push notifications.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "MongoDB", "Tailwind", "Redux"],
    metrics: ["+30% completion", "+35% engagement", "Dark mode", "Push notifications"],
    color: "#00D4FF",
  },
  {
    title: "Quiz App",
    subtitle: "Interactive Quiz Platform",
    description: "Responsive quiz application with dynamic questions, real-time scoring, and optimized component architecture.",
    tech: ["React.js", "TypeScript", "Material UI"],
    metrics: ["+40% participation", "-25% bugs", "Real-time scoring", "Responsive"],
    color: "#FF6B6B",
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const heroRef = useRef(null);

  const handleResumeDownload = () => {
    setDownloading(true);
    // In production: replace this URL with your actual hosted resume PDF path
    // e.g. "/resume/Dhruv_Khambhata_Resume.pdf" (place the PDF in /public/resume/)
    const resumeUrl = "/resume/Dhruv_Khambhata_Resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Dhruv_Khambhata_Frontend_Developer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  const titles = ["Frontend Developer", "React Specialist", "UI Architect", "TypeScript Engineer"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Outfit', 'Sora', sans-serif",
      background: "#030712",
      color: "#E2E8F0",
      minHeight: "100vh",
      width: "100%",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { 
          width: 100%; 
          min-height: 100vh; 
          background: #030712;
        }
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#00D4FF, #7B2FBE); border-radius: 2px; }

        .cursor-glow {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          transition: left 0.15s ease, top 0.15s ease;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.loaded { opacity: 1; transform: translateY(0); }
        
        .nav-link {
          position: relative;
          cursor: pointer;
          padding: 6px 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748B;
          transition: color 0.3s;
          text-decoration: none;
          border: none;
          background: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #00D4FF;
          transition: width 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: #E2E8F0; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .glow-text {
          background: linear-gradient(135deg, #00D4FF 0%, #7B2FBE 50%, #FF6B6B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,212,255,0.1);
        }

        .skill-tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #94A3B8;
          transition: all 0.2s;
          cursor: default;
          font-family: 'JetBrains Mono', monospace;
        }
        .skill-tag:hover {
          border-color: #00D4FF;
          color: #00D4FF;
          background: rgba(0,212,255,0.06);
        }

        .metric-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(0,212,255,0.1);
          border: 1px solid rgba(0,212,255,0.2);
          color: #00D4FF;
          font-family: 'JetBrains Mono', monospace;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(0.95); }
        }
        
        .grid-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw; height: 100vh;
          background-image: 
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #00D4FF;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          max-width: 40px;
          height: 1px;
          background: #00D4FF;
        }

        .exp-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00D4FF;
          box-shadow: 0 0 12px #00D4FF;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00D4FF, #7B2FBE);
          color: white;
          border: none;
        }
        .btn-primary:hover {
          box-shadow: 0 8px 30px rgba(0,212,255,0.4);
          transform: translateY(-2px);
        }
        .btn-outline {
          background: transparent;
          color: #E2E8F0;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .btn-outline:hover {
          border-color: #00D4FF;
          color: #00D4FF;
          transform: translateY(-2px);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-menu span {
          display: block;
          width: 22px;
          height: 2px;
          background: #E2E8F0;
          border-radius: 2px;
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: flex; }
          .hero-title { font-size: 48px !important; }
          .hero-subtitle { font-size: 22px !important; }
          .section-title { font-size: 36px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column; gap: 20px !important; }
          .contact-buttons { flex-direction: column; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 12px #00D4FF; }
          50% { box-shadow: 0 0 24px #00D4FF, 0 0 40px rgba(0,212,255,0.3); }
        }
        .exp-dot { animation: pulse-glow 2s ease-in-out infinite; }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #00D4FF, #7B2FBE);
          animation: grow 1.5s ease forwards;
          transform-origin: left;
        }
        @keyframes grow {
          from { width: 0; }
        }

        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3,7,18,0.97);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          backdrop-filter: blur(20px);
        }
        .mobile-nav-link {
          font-size: 28px;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #00D4FF; }

        .btn-resume {
          background: transparent;
          color: #00D4FF;
          border: 1px solid #00D4FF;
          position: relative;
          overflow: hidden;
        }
        .btn-resume::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00D4FF, #7B2FBE);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-resume:hover::before { opacity: 1; }
        .btn-resume:hover { color: white; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,255,0.3); }
        .btn-resume span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { 
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite; display: inline-block;
        }

        .resume-nav-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 7px; font-size: 12px; font-weight: 600;
          letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s;
          border: 1px solid rgba(0,212,255,0.4); color: #00D4FF;
          background: rgba(0,212,255,0.05); font-family: 'Outfit', sans-serif;
        }
        .resume-nav-btn:hover { background: rgba(0,212,255,0.15); box-shadow: 0 0 16px rgba(0,212,255,0.2); }
      `}</style>

      {/* Background elements */}
      <div className="grid-bg" />
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div className="blob" style={{ width: 600, height: 600, background: "#00D4FF", top: -200, right: -200, animationDuration: "10s" }} />
      <div className="blob" style={{ width: 500, height: 500, background: "#7B2FBE", bottom: 100, left: -150, animationName: "float2", animationDuration: "12s" }} />

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="mobile-nav-overlay">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 28, right: 28, background: "none", border: "none", color: "#E2E8F0", fontSize: 28, cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map((link) => (
            <div key={link} className="mobile-nav-link" onClick={() => scrollTo(link)}>{link}</div>
          ))}
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 50,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(3,7,18,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 500, color: "#E2E8F0" }}>
          <span style={{ color: "#00D4FF" }}>{"<"}</span>
          DK
          <span style={{ color: "#00D4FF" }}>{"/>"}</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`nav-link ${activeSection === link ? "active" : ""}`}
              onClick={() => scrollTo(link)}
            >{link}</button>
          ))}
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="resume-nav-btn" onClick={handleResumeDownload}>
            {downloading ? <span className="spinner" /> : "↓"} Resume
          </button>
          <a href="mailto:khambhatadhruv28@gmail.com" className="contact-btn btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}>
            Hire Me
          </a>
        </div>
        <div className="mobile-menu" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* HERO */}
      <div style={{ width: "100%", background: "#030712" }}>
      <section
        id="about"
        data-section="About"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 40px 80px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className={`fade-up ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <div className="section-label">Available for work</div>
        </div>
        <div className={`fade-up ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <h1 className="hero-title" style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Dhruv<br />
            <span className="glow-text">Khambhata</span>
          </h1>
        </div>
        <div className={`fade-up ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <div className="hero-subtitle" style={{ fontSize: 28, fontWeight: 300, color: "#64748B", marginBottom: 32, fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: "#00D4FF" }}>{"// "}</span>
            {typedText}
            <span style={{ borderRight: "2px solid #00D4FF", marginLeft: 2, animation: "none" }}>|</span>
          </div>
        </div>
        <div className={`fade-up ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <p style={{ fontSize: 17, color: "#94A3B8", lineHeight: 1.8, maxWidth: 560, marginBottom: 48 }}>
            Frontend developer with <strong style={{ color: "#E2E8F0" }}>3+ years</strong> crafting enterprise-grade interfaces. 
            Specialized in React.js, Next.js & TypeScript — turning complex requirements into elegant, 
            performant user experiences.
          </p>
        </div>
        <div className={`fade-up ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.5s", display: "flex", gap: 16, flexWrap: "wrap" }} >
          <a href="mailto:khambhatadhruv28@gmail.com" className="contact-btn btn-primary">
            Get in Touch ↗
          </a>
          <button className="contact-btn btn-resume" onClick={handleResumeDownload}>
            <span>
              {downloading ? <span className="spinner" /> : "↓"}
              {downloading ? "Downloading..." : "Download Resume"}
            </span>
          </button>
          <a href="https://github.com/DhruvKhambhata" target="_blank" rel="noreferrer" className="contact-btn btn-outline">
            GitHub
          </a>
          <a href="https://linkedin.com/in/dhruv-khambhata" target="_blank" rel="noreferrer" className="contact-btn btn-outline">
            LinkedIn
          </a>
        </div>

        {/* Stats */}
        <div className={`fade-up stats-row ${isLoaded ? "loaded" : ""}`} style={{ transitionDelay: "0.6s", display: "flex", gap: 48, marginTop: 72, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { value: "3+", label: "Years Experience" },
            { value: "60%", label: "UI/UX Improvement" },
            { value: "2", label: "Major Projects" },
            { value: "10+", label: "Tech Stack" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#00D4FF", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* EXPERIENCE */}
      <div style={{ width: "100%", background: "#030712" }}>
      <section
        id="experience"
        data-section="Experience"
        style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div className="section-label">Work History</div>
        <h2 className="section-title" style={{ fontSize: 48, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>Experience</h2>

        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }} className="card-hover">
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00D4FF, #7B2FBE)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Associate Software Developer</h3>
              <div style={{ color: "#00D4FF", fontWeight: 600, fontSize: 15 }}>Bankai Informatics Pvt. Ltd.</div>
              <div style={{ color: "#64748B", fontSize: 13, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>formerly Acute Informatics Pvt. Ltd.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                Dec 2022 – Feb 2026
              </div>
              <div style={{ color: "#64748B", fontSize: 12, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>3+ years</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "🏦", text: "Developed and maintained the frontend of an enterprise banking platform (EasyLOS), converting business requirements into stable, scalable user interfaces." },
              { icon: "🎙️", text: "Built a voice assistant feature leveraging react-speech-recognition for hands-free banking interactions." },
              { icon: "🏗️", text: "Migrated legacy frontend architecture into a monorepo structure, streamlining dependency management and improving cross-team efficiency." },
              { icon: "📈", text: "Improved UI/UX quality by 60% through seamless REST API integration and frontend-backend synchronization, significantly reducing user errors." },
              { icon: "⚡", text: "Optimized application performance by managing state updates efficiently, minimizing re-renders and handling API responses for faster page loads." },
              { icon: "🔒", text: "Developed a custom form-to-grid data integration module enabling secure data transfer while maintaining backward compatibility." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div className="exp-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }} className="card-hover">
          <div>
            <div style={{ fontSize: 12, color: "#7B2FBE", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>Education</div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Bachelor of Computer Applications (BCA)</h3>
            <div style={{ color: "#94A3B8", fontSize: 14, marginTop: 4 }}>Navgujarat College of Computer Applications</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>Jun 2016 – Apr 2019</div>
            <div style={{ color: "#7B2FBE", fontSize: 13, marginTop: 4 }}>Score: 60%</div>
          </div>
        </div>
      </section>
      </div>

      {/* PROJECTS */}
      <div style={{ width: "100%", background: "#030712" }}>
      <section
        id="projects"
        data-section="Projects"
        style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div className="section-label">What I've Built</div>
        <h2 className="section-title" style={{ fontSize: 48, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>Projects</h2>

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {PROJECTS.map((project, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: 40,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }} className="card-hover">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
              <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: project.color, opacity: 0.04, filter: "blur(20px)" }} />

              <div>
                <div style={{ fontSize: 11, color: project.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                  Featured Project
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{project.title}</h3>
                <div style={{ color: "#64748B", fontSize: 13 }}>{project.subtitle}</div>
              </div>

              <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7 }}>{project.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.metrics.map((m) => (
                  <span key={m} className="metric-badge" style={{ borderColor: `rgba(${project.color === "#00D4FF" ? "0,212,255" : "255,107,107"},0.2)`, color: project.color, background: `rgba(${project.color === "#00D4FF" ? "0,212,255" : "255,107,107"},0.08)` }}>{m}</span>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {project.tech.map((t) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* SKILLS */}
      <div style={{ width: "100%", background: "#030712" }}>
      <section
        id="skills"
        data-section="Skills"
        style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div className="section-label">Tech Stack</div>
        <h2 className="section-title" style={{ fontSize: 48, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>Skills</h2>

        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <div key={category} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 28,
            }} className="card-hover">
              <div style={{ fontSize: 11, color: "#00D4FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                {["⚡", "🎨", "🔧", "🗄️", "🛠️", "📋"][i]} {category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={hoveredSkill === skill ? { borderColor: "#00D4FF", color: "#00D4FF", background: "rgba(0,212,255,0.06)" } : {}}
                  >{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div style={{ marginTop: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 36 }}>
          <div style={{ fontSize: 14, color: "#64748B", fontFamily: "'JetBrains Mono', monospace", marginBottom: 28 }}>// Core proficiency</div>
          {[
            { name: "React.js / Next.js", level: 92 },
            { name: "TypeScript", level: 85 },
            { name: "Node.js / Express", level: 72 },
            { name: "MongoDB / Firebase", level: 70 },
          ].map((item) => (
            <div key={item.name} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "#E2E8F0", fontFamily: "'JetBrains Mono', monospace" }}>{item.name}</span>
                <span style={{ fontSize: 13, color: "#00D4FF", fontFamily: "'JetBrains Mono', monospace" }}>{item.level}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div className="progress-bar-fill" style={{ width: `${item.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* CONTACT */}
      <div style={{ width: "100%", background: "#030712" }}>
      <section
        id="contact"
        data-section="Contact"
        style={{ padding: "100px 40px 140px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24,
          padding: "72px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.05), transparent 60%)" }} />
          <div className="section-label" style={{ justifyContent: "center" }}>Let's Work Together</div>
          <h2 style={{ fontSize: 52, fontWeight: 900, marginBottom: 20, letterSpacing: "-0.02em", position: "relative" }}>
            Got a <span className="glow-text">project</span> in mind?
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 17, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7, position: "relative" }}>
            I'm currently available for freelance work and full-time roles. Let's build something amazing together.
          </p>
          <div className="contact-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <a href="mailto:khambhatadhruv28@gmail.com" className="contact-btn btn-primary" style={{ fontSize: 15 }}>
              ✉️ khambhatadhruv28@gmail.com
            </a>
            <button className="contact-btn btn-resume" onClick={handleResumeDownload} style={{ fontSize: 15 }}>
              <span>
                {downloading ? <span className="spinner" /> : "↓"}
                {downloading ? "Downloading..." : "Download Resume"}
              </span>
            </button>
            <a href="tel:+917990603842" className="contact-btn btn-outline" style={{ fontSize: 15 }}>
              📞 +91 79906 03842
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 48 }}>
            {[
              { label: "GitHub", url: "https://github.com/DhruvKhambhata" },
              { label: "LinkedIn", url: "https://linkedin.com/in/dhruv-khambhata" },
            ].map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{ color: "#64748B", fontSize: 14, textDecoration: "none", transition: "color 0.2s", fontFamily: "'JetBrains Mono', monospace" }}
                onMouseEnter={(e) => e.target.style.color = "#00D4FF"}
                onMouseLeave={(e) => e.target.style.color = "#64748B"}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", background: "#030712" }}>
      <footer style={{ textAlign: "center", padding: "32px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#334155", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", position: "relative", zIndex: 1 }}>
        <span style={{ color: "#00D4FF" }}>{"<"}</span>
        Dhruv Khambhata
        <span style={{ color: "#00D4FF" }}>{" />"}</span>
        {" · "}
        Built with React · 2026
      </footer>
      </div>
    </div>
  );
}
