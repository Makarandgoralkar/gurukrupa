import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      
      {/* LOGO */}
      <NavLink to="/" className="logo">
        <img src="/images/logo.jpg" alt="Shri Gurukrupa Logo" />
      </NavLink>

      {/* MENU ICON */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* NAV LINKS */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active-link" : ""}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active-link" : ""}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active-link" : ""}>
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/gallery" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active-link" : ""}>
            Gallery
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active-link" : ""}>
            Contact
          </NavLink>
        </li>

        {!user ? (
          <li>
            <NavLink to="/admin-login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;