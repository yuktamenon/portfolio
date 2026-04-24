import { useEffect } from "react";
import "./Projects.css";

const PROJECTS = [
  {
    id: "01",
    title: "NASA RUL Predictive Maintenance",
    desc: "A predictive maintenance project using NASA CMAPSS turbofan engine data to estimate Remaining Useful Life using ML models and performance metrics.",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    
  },
  {
    id: "02",
    title: "Chest X-Ray Classification",
    desc: "A CNN-based medical image classification project for identifying COVID-19, Pneumonia, and Normal chest X-ray images.",
    tags: ["TensorFlow", "CNN", "Keras", "Computer Vision"],
    
  },
  {
    id: "03",
    title: "Movie Recommendation Chatbot",
    desc: "A conversational movie discovery assistant using embeddings, semantic search, and retrieval-based recommendations.",
    tags: ["NLP", "FAISS", "Streamlit", "LLM"],
    
  },

];

export default function Projects() {
  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Magnetic
  useEffect(() => {
    const els = document.querySelectorAll(".magnetic");
    const handlers = [];
    els.forEach(el => {
      const onMove = e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.18}px,${(e.clientY-r.top-r.height/2)*0.18}px)`;
      };
      const onLeave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove",  onMove);
      el.addEventListener("mouseleave", onLeave);
      handlers.push({ el, onMove, onLeave });
    });
    return () => handlers.forEach(({ el, onMove, onLeave }) => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <section className="projects-page">
      {/* Background decoration */}
      <div className="projects-bg-word">projects</div>
      <div className="washi" style={{ top:80, left:40, width:100, transform:"rotate(2deg)", background:"repeating-linear-gradient(90deg,rgba(200,213,185,0.6) 0px,rgba(200,213,185,0.6) 15px,rgba(245,230,163,0.6) 15px,rgba(245,230,163,0.6) 30px)" }} />
      <div style={{ position:"absolute", bottom:60, left:30, fontSize:22, opacity:0.15, pointerEvents:"none" }}>✦ ✦</div>

      <div className="scroll-reveal">
        <div className="section-label">what i've built</div>
        <h2 className="section-title">Featured <em>Projects.</em></h2>

        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div className="project-card magnetic" key={p.id}>
              <div className="project-number">{p.id}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
              </div>
              <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                
              </a>
            </div>
          ))}

          {/* Placeholder card */}
          <div className="project-card placeholder magnetic">
            <div style={{ fontSize:32, opacity:0.3 }}>+</div>
            <div style={{ fontFamily:"'Caveat',cursive", fontSize:18, color:"var(--muted)" }}>More coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}