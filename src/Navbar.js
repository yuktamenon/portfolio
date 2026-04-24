import { NavLink } from "react-router-dom";
import "./Navbar.css";
 
export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">Yukta ✦</NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" end>About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li>
          <a href="#skills" onClick={e => {
            e.preventDefault();
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          }}>Skills</a>
        </li>
        <li>
          <a href="#contact" onClick={e => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}