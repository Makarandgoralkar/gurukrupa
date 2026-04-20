import "../styles/Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* TOP CTA */}
      <div className="footer-cta">
        <h2>Let’s Build Your Dream Project</h2>
        <p>Premium construction services in Bhusawal with trusted engineers</p>
        <a href="/contact">
          <button className="footer-btn">Get Free Consultation</button>
        </a>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-container">

        {/* COMPANY */}
        <div className="footer-col">
          <h3>Shri Gurukrupa Constructions</h3>
          <p>
            We deliver high-quality residential and commercial construction
            with modern design, strong structure, and trusted execution.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
  <h4>Quick Links</h4>

  <NavLink to="/" className={({ isActive }) => isActive ? "active-footer" : ""}>
    Home
  </NavLink>

  <NavLink to="/about" className={({ isActive }) => isActive ? "active-footer" : ""}>
    About
  </NavLink>

  <NavLink to="/services" className={({ isActive }) => isActive ? "active-footer" : ""}>
    Services
  </NavLink>

  <NavLink to="/gallery" className={({ isActive }) => isActive ? "active-footer" : ""}>
    Gallery
  </NavLink>

  <NavLink to="/contact" className={({ isActive }) => isActive ? "active-footer" : ""}>
    Contact
  </NavLink>
</div>

        {/* SERVICES */}
        <div className="footer-col">
          <h4>Services</h4>
          <p>Residential Construction</p>
          <p>Commercial Projects</p>
          <p>RCC Design</p>
          <p>Interior Design</p>
          <p>Renovation</p>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>📍 Bhusawal, Maharashtra</p>
          <p>📞 +91 8999916870</p>
          <p>✉️ shrigurukrupac@gmail.com</p>

          <div className="socials">
            <a href="https://instagram.com/engineer.shrigurukrupa">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=100076144624680#">Facebook</a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 Shri Gurukrupa Constructions. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;