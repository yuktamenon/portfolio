import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import profileImg from "./assets/profile.jpg";


/* ── Cursor component ── */
function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const trail  = document.getElementById("cursor-trail");
    let mx=0, my=0, tx=0, ty=0;

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx-6}px,${my-6}px)`;
    };
    document.addEventListener("mousemove", onMove);

    let raf;
    const anim = () => {
      tx += (mx-tx)*0.12; ty += (my-ty)*0.12;
      trail.style.transform = `translate(${tx-18}px,${ty-18}px)`;
      raf = requestAnimationFrame(anim);
    };
    anim();

    const els = document.querySelectorAll("a, button, .skill-tag, .project-card");
    els.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.background = "var(--blush)";
        trail.style.width = "56px"; trail.style.height = "56px";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.background = "var(--ink)";
        trail.style.width = "36px"; trail.style.height = "36px";
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div id="cursor" />
      <div id="cursor-trail" />
    </>
  );
}

/* ── Typed text hook ── */
function useTyping(text, delay = 800) {
  const elRef = useRef(null);
  const line2Ref = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const type = () => {
        if (!elRef.current) return;
        if (i < text.length) {
          elRef.current.textContent += text[i++];
          setTimeout(type, 60 + Math.random() * 40);
        } else {
          setTimeout(() => {
            if (cursorRef.current) cursorRef.current.style.display = "none";
            if (line2Ref.current) line2Ref.current.style.opacity = "1";
          }, 400);
        }
      };
      type();
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return { elRef, line2Ref, cursorRef };
}

/* ── Scroll reveal hook ── */
function useScrollReveal() {
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
}

/* ── Magnetic hook ── */
function useMagnetic() {
  useEffect(() => {
    const els = document.querySelectorAll(".magnetic");
    const handlers = [];
    els.forEach(el => {
      const onMove = e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width  / 2;
        const y = e.clientY - r.top  - r.height / 2;
        el.style.transform = `translate(${x*0.18}px,${y*0.18}px)`;
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
}

/* ── Hero parallax ── */
function useHeroParallax() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const onMove = e => {
      const scraps = hero.querySelectorAll(".scrap");
      const x = (e.clientX / window.innerWidth  - 0.5) * 22;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      scraps.forEach((el, i) => {
        const d = 0.3 + (i % 4) * 0.25;
        el.style.transform = `translate(${x*d}px,${y*d}px)`;
      });
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);
}
function PaperPlane() {
  useEffect(() => {
    const plane = document.querySelector(".paper-plane");

    const movePlane = () => {
      if (!plane) return;

      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / maxScroll;

      // Criss-cross horizontal movement
      const wave = Math.sin(progress * Math.PI * 6);

      const x = 50 + wave * 38;
      const y = 10 + progress * 78;
      const rotate = wave > 0 ? 28 : -28;

      plane.style.left = `${x}%`;
      plane.style.top = `${y}%`;
      plane.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
    };

    window.addEventListener("scroll", movePlane);
    movePlane();

    return () => window.removeEventListener("scroll", movePlane);
  }, []);

  return <div className="paper-plane">🦋</div>;
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
export default function Home() {
  const { elRef, line2Ref, cursorRef } = useTyping("Hi, I'm Yukta");
  useScrollReveal();
  useMagnetic();
  useHeroParallax();

  return (
    <>
      <Cursor />
      <PaperPlane />

      {/* ── HERO ── */}
      <section id="hero" className="hero-section">

        {/* Left scrapbook elements */}
        <div className="scrap" style={{ top:150, left:24, animation:"floatX 9s ease-in-out infinite", animationDelay:"0.3s", zIndex:3 }}>
          <div className="sticky-note" style={{ background:"var(--sage)", fontSize:25, color:"#2e4a2e", transform:"rotate(2deg)" }}>
            📍 Hyderabad, India
          </div>
        </div>

        <div className="washi" style={{ top:210, left:0, width:120, transform:"rotate(90deg) translateX(-48px)", background:"repeating-linear-gradient(90deg,rgba(212,197,226,0.65) 0px,rgba(212,197,226,0.65) 18px,rgba(249,213,211,0.65) 18px,rgba(249,213,211,0.65) 36px)" }} />

        <div className="scrap photo-frame" style={{ top:280, left:20, transform:"rotate(-5deg)", animation:"float 7s ease-in-out infinite", animationDelay:"1s" }}>
          <div style={{ width:90, height:80, background:"linear-gradient(135deg,var(--sky),var(--sage))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>🌸</div>
          <div style={{ fontFamily:"'Caveat',cursive", fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:6 }}>spring 2025</div>
        </div>

        <div className="scrap" style={{ bottom:160, left:30, animation:"floatX 10s ease-in-out infinite", animationDelay:"2s" }}>
          <div style={{ width:68, height:68, border:"3px solid var(--muted)", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", opacity:0.35, transform:"rotate(-8deg)" }}>
            <div style={{ fontSize:22 }}>✈</div>
            <div style={{ fontFamily:"'Caveat',cursive", fontSize:10, color:"var(--muted)", letterSpacing:1 }}>TRAVEL</div>
          </div>
        </div>

        <div className="scrap sticky-note" style={{ bottom:220, left:60, background:"var(--lavender)", fontSize:13, color:"#4a2e6b", transform:"rotate(4deg)", animation:"float 6s ease-in-out infinite", animationDelay:"0.7s" }}>
          ✨ 
        </div>

        {/* Right scrapbook elements */}
        <div className="scrap photo-frame" style={{ top:100, right:80, transform:"rotate(6deg)", animation:"float 6s ease-in-out infinite" }}>
          <div style={{ width:148, height:118, background:"linear-gradient(135deg,var(--blush),var(--lavender))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:48 }}>✈️</div>
          <div style={{ fontFamily:"'Caveat',cursive", fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:6 }}>wanderlust</div>
        </div>

        <div className="washi" style={{ top:98, right:60, width:170, transform:"rotate(6deg)", background:"repeating-linear-gradient(90deg,rgba(245,230,163,0.7) 0px,rgba(245,230,163,0.7) 20px,rgba(247,197,159,0.7) 20px,rgba(247,197,159,0.7) 40px)" }} />

        <div className="scrap sticker" style={{ top:195, right:265, width:50, height:50, background:"var(--butter)", animation:"floatX 5s ease-in-out infinite", animationDelay:"0.5s" }}>🦋</div>
        <div className="scrap sticker" style={{ top:155, right:310, width:36, height:36, background:"var(--blush)", animation:"float 6.5s ease-in-out infinite", animationDelay:"1.2s" }}>🌷</div>

        <div className="scrap" style={{ top:240, right:50, animation:"float 9s ease-in-out infinite", animationDelay:"1s" }}>
          <div style={{ background:"white", border:"1px solid rgba(58,48,40,0.09)", padding:"14px 18px", maxWidth:170, transform:"rotate(-3deg)", boxShadow:"3px 3px 0 var(--sage)" }}>
            <div style={{ fontFamily:"'Caveat',cursive", fontSize:14, color:"var(--muted)", lineHeight:1.5 }}>"I saw my life branching out before me like a fig tree"</div>
          </div>
        </div>

        <div className="scrap photo-frame" style={{ top:360, right:230, transform:"rotate(8deg)", animation:"float 7.5s ease-in-out infinite", animationDelay:"0.4s" }}>
          <div style={{ width:74, height:74, borderRadius:"50%", background:"linear-gradient(135deg,var(--sky),var(--lavender))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30 }}>🗺️</div>
        </div>

        <div className="scrap photo-frame" style={{ top:390, right:60, transform:"rotate(-6deg)", animation:"floatX 8s ease-in-out infinite", animationDelay:"1.5s" }}>
          <div style={{ width:100, height:90, background:"linear-gradient(135deg,var(--butter),var(--peach))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>📖</div>
          <div style={{ fontFamily:"'Caveat',cursive", fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:6 }}>always learning</div>
        </div>

        <div className="washi" style={{ bottom:148, right:80, width:130, transform:"rotate(-5deg)", background:"repeating-linear-gradient(90deg,rgba(200,213,185,0.65) 0px,rgba(200,213,185,0.65) 16px,rgba(184,216,232,0.65) 16px,rgba(184,216,232,0.65) 32px)" }} />

        <div className="scrap sticker" style={{ bottom:110, right:120, width:56, height:56, background:"var(--blush)", animation:"float 5.5s ease-in-out infinite", animationDelay:"0.9s" }}>🌺</div>

        <div className="scrap" style={{ bottom:170, right:40, animation:"floatX 11s ease-in-out infinite" }}>
          <div style={{ background:"white", padding:"10px 14px", borderRadius:2, transform:"rotate(10deg)", boxShadow:"2px 2px 0 var(--butter)", fontFamily:"'Caveat',cursive", fontSize:14, color:"#6b5a1e" }}>
            🌸
          </div>
        </div>

        {/* Centre extras */}
        <div className="scrap sticky-note" style={{ bottom:100, left:"42%", background:"var(--butter)", fontSize:13, color:"#6b5a1e", transform:"rotate(-2deg)", animation:"float 8s ease-in-out infinite", animationDelay:"1.8s" }}>
          "Anyways the wind blows."
        </div>

        {/* Doodle circles */}
        <div className="doodle-circle" style={{ width:160, height:160, top:170, right:420 }} />
        <div className="doodle-circle" style={{ width:90, height:90, bottom:200, right:440 }} />
        <div className="doodle-circle" style={{ width:60, height:60, top:350, left:190 }} />

        {/* Stars */}
        {[
          { top:310, right:195, size:18, delay:"0.8s", dur:"4s" },
          { top:450, right:420, size:12, delay:"1.5s", dur:"6s" },
          { top:160, right:520, size:10, delay:"0s",   dur:"5s" },
          { bottom:250, left:180, size:14, delay:"0.3s", dur:"7s" },
        ].map((s, i) => (
          <div key={i} style={{ position:"absolute", fontSize:s.size, opacity:0.25, animation:`float ${s.dur} ease-in-out infinite`, animationDelay:s.delay, color:"var(--muted)", pointerEvents:"none", ...s }}>✦</div>
        ))}

        {/* Squiggly SVG doodles */}
        <svg style={{ position:"absolute", top:320, left:160, width:100, height:40, opacity:0.18, pointerEvents:"none" }} viewBox="0 0 100 40">
          <path d="M5 20 Q25 5 45 20 Q65 35 85 20" fill="none" stroke="#7a6e66" strokeWidth="1.5" strokeDasharray="4 3"/>
        </svg>
        <svg style={{ position:"absolute", bottom:300, right:350, width:80, height:30, opacity:0.18, pointerEvents:"none" }} viewBox="0 0 80 30">
          <path d="M5 15 Q20 5 35 15 Q50 25 65 15" fill="none" stroke="#7a6e66" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>

        {/* Torn paper bottom */}
        <div className="torn-bottom" />

        {/* ── Hero text ── */}
        <div className="hero-content">
          <div className="hero-tag">✦ &nbsp; Portfolio </div>
          <h1 className="hero-name">
            <span style={{ display:"block", overflow:"hidden" }}>
              <span ref={elRef} className="typed-text" />
              <span ref={cursorRef} className="cursor-blink" />
            </span>
            <span ref={line2Ref} className="line-2">Menon</span>
          </h1>
          <p className="hero-subtitle">
            CS student &amp; Im a work in progress Computer Science student. Im driven by the desire to build things that matter. Currently learning and exploring Machine Learning and Artificial Intelligence and I aspire to build, understand and appreciate these algorithms at depth. Blending {" "}
            <span className="highlight-text">creativity</span> and{" "}
            <span className="highlight-text">technology</span>.
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="btn-primary magnetic">View My Work →</Link>
            <a href="#contact" className="btn-secondary magnetic"
              onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}>
              Get In Touch
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div style={{ position:"absolute", top:30, right:20, fontFamily:"'Caveat',cursive", fontSize:80, color:"rgba(58,48,40,0.03)", pointerEvents:"none", lineHeight:1 }}>about</div>
        <div style={{ position:"absolute", bottom:40, left:20, fontSize:18, opacity:0.12, color:"var(--muted)", pointerEvents:"none" }}>✦  ✦  ✦</div>

        <div className="about-grid scroll-reveal">
          <div className="about-text">
            <div className="section-label">who i am</div>
            <h2 className="section-title">A little bit<br /><em>about me.</em></h2>
            <p>Hi! I'm Yukta — a CS student with a love for building things that are both functional and beautiful. When I'm not coding, you'll find me hunting for good coffee, painting, or watching a good travel documentary.</p>
            <p>I believe great software starts with empathy for the user. I bring that mindset into every project I build.</p>
            <div className="about-details">

              {[
                
                { label:"Email", value:"yuktamenon455@gmail.com", small:true },
                { label:"Phone", value:"+91 7075544711" },
                
              ].map(d => (
                <div className="detail-card" key={d.label}>
                  <div className="label">{d.label}</div>
                  <div className="value" style={d.small ? { fontSize:12 } : {}}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="photo-polaroid">
                <img src={profileImg} alt="Yukta Menon" />
            </div>

            <div style={{ position:"absolute", bottom:20, left:"8%", background:"white", padding:"14px 18px", borderRadius:4, boxShadow:"3px 3px 0 var(--sage)", transform:"rotate(3deg)", fontFamily:"'Caveat',cursive", fontSize:16, color:"var(--ink)" }}>
              📚 Currently learning...<br /><span style={{ fontSize:14, color:"var(--muted)" }}>NLP + LLMS </span>
            </div>
            <div style={{ position:"absolute", top:40, right:"3%", background:"var(--butter)", padding:"10px 14px", borderRadius:2, transform:"rotate(5deg)", fontFamily:"'Caveat',cursive", fontSize:14, color:"#6b5a1e", boxShadow:"2px 2px 6px rgba(58,48,40,0.08)" }}>
              ✨ Research interests:<br />NLP &amp; Computer Vision
            </div>
            <div style={{ position:"absolute", bottom:90, right:"5%", fontSize:28, opacity:0.5, animation:"float 5s ease-in-out infinite" }}>🌿</div>

            </div>
        </div>
     </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <div style={{ position:"absolute", top:20, left:20, fontFamily:"'Caveat',cursive", fontSize:90, color:"rgba(58,48,40,0.025)", pointerEvents:"none", lineHeight:1 }}>skills</div>
        <div className="washi" style={{ top:60, right:60, width:140, transform:"rotate(-3deg)", background:"repeating-linear-gradient(90deg,rgba(249,213,211,0.6) 0px,rgba(249,213,211,0.6) 18px,rgba(212,197,226,0.6) 18px,rgba(212,197,226,0.6) 36px)" }} />
        <div style={{ position:"absolute", bottom:50, right:40, fontFamily:"'Caveat',cursive", fontSize:16, color:"rgba(58,48,40,0.2)", transform:"rotate(-3deg)" }}>and so much more ✦</div>

        <div className="scroll-reveal">
          <div className="section-label">what i know</div>
          <h2 className="section-title">Skills & <em>Technologies.</em></h2>
          <div className="skills-grid">
            {[
              ["HTML5","s1"],["CSS3","s2"],["JavaScript","s3"],["React","s4"],
              ["React Router","s5"],["Node.js","s6"],["Deep Learning","s1"],
              ["Python","s2"],["Unsupervised Learning","s3"],["RAG","s4"],
              ["Machine Learning","s5"],["Time Series","s6"],["Data Structures","s2"],["OOP","s3"],
            ].map(([name, cls]) => (
              <span key={name} className={`skill-tag ${cls}`}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="section-label" style={{ justifyContent:"center" }}>let's connect</div>
        <h2 className="section-title">Get In <em>Touch.</em></h2>
        <p>I'm always open to new opportunities, collaborations, or just a friendly chat.</p>
        <div className="contact-grid">
          {[
            { icon:"✉", label:"email",    href:"mailto:yuktamenon455@gmail.com" },
            { icon:"🎓", label:"linkedin",  href:"https://www.linkedin.com/in/yukta-menon/" },
            { icon:"📞", label:"phone",    href:"tel:+917075544711" },
            { icon:"⌥",  label:"GitHub",             href:"https://github.com/yuktamenon" },
          ].map(c => (
            <a key={c.label} href={c.href} className="contact-chip magnetic">
              <span>{c.icon}</span> {c.label}
            </a>
          ))}
        </div>
        <div style={{ fontFamily:"'Caveat',cursive", fontSize:18, color:"rgba(250,248,242,0.25)", marginTop:48, letterSpacing:1 }}>
          ✦ &nbsp; designed with care &nbsp; ✦
        </div>
      </section>
    </>
  );
}
