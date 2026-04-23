import "../styles/About.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

/* ========================= */
/* COUNTER HOOK */
/* ========================= */
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

function About() {
  const navigate = useNavigate();

  /* COUNTERS */
  const projects = useCounter(100);
  const clients = useCounter(50);
  const experience = useCounter(10);
  const engineers = useCounter(25);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1 data-aos="fade-down">About Our Construction Company</h1>
          <p data-aos="fade-up">
            Building dreams with precision, quality, and trust. We deliver modern
            construction solutions tailored to your needs.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              window.open("https://wa.me/+918999916870", "_blank")
            }
          >
            Get Free Consultation →
          </button>
        </div>
      </section>

      {/* STATS (UPDATED) */}
      <section className="about-stats" data-aos="fade-up">
        <div className="stat">
          <h2>{projects}+</h2>
          <p>Projects Completed</p>
        </div>
        <div className="stat">
          <h2>{clients}+</h2>
          <p>Happy Clients</p>
        </div>
        <div className="stat">
          <h2>{experience}+</h2>
          <p>Years Experience</p>
        </div>
        <div className="stat">
          <h2>{engineers}+</h2>
          <p>Expert Engineers</p>
        </div>
      </section>

      {/* IMAGE GRID */}
      <section className="about-images">
        <img src="/images/construction1.jpg" alt="Construction Site" data-aos="zoom-in"/>
        <img src="/images/construction.jpg" alt="Building Work" data-aos="zoom-in"/>
        <img src="/images/interior1.jpg" alt="Interior Design" data-aos="zoom-in"/>
        <img src="/images/elevation1.jpg" alt="Interior Design" data-aos="zoom-in"/>
      </section>

      {/* CONTENT */}
      <section className="about-content" data-aos="fade-up">
        <h2>Who We Are</h2>
        <p>
          We are a professional construction company specializing in residential,
          commercial, and interior design projects. With years of experience,
          we ensure high-quality work, timely delivery, and customer satisfaction.
        </p>

        <h2>Our Mission</h2>
        <p>
          To deliver reliable, cost-effective, and innovative construction
          solutions while maintaining the highest standards of safety and quality.
        </p>

        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Experienced Engineers & Designers</li>
          <li>✔ Modern Architecture & Smart Planning</li>
          <li>✔ On-Time Project Delivery</li>
          <li>✔ Transparent Pricing</li>
        </ul>
      </section>

      {/* PROJECT ENGINEER */}
      <section className="engineer-section" data-aos="fade-up">
        <h2 className="engineer-title">Our Project Engineer</h2>

        <div className="engineer-card">
          <div className="engineer-img">
            <img src="/images/team1.png" alt="Project Engineer" />
          </div>

          <div className="engineer-info">
            <h2>Er. Prafulla Wankhede</h2>
            <h4>Senior Project Engineer</h4>

            <p>
              With over 10+ years of experience in residential and commercial construction,
              Prafulla specializes in project planning, structural execution, and quality control.
              He has successfully delivered multiple high-quality projects with precision and safety.
            </p>

            <button
              className="contact-btn"
              onClick={() => (window.location.href = "tel:+918999916870")}
            >
              Contact Engineer →
            </button>
          </div>
        </div>
      </section>

      {/* DEVELOPER SECTION */}
<section className="developer-section" data-aos="fade-up">
  <h2 className="developer-title">Crafted by Makarand Goralkar</h2>

  <div className="developer-card premium-glass">
    
    <div className="developer-img">
      <img src="/images/developer.jpeg" alt="Developer" />
    </div>

    <div className="developer-info">
      <h2>Makarand Goralkar</h2>
      <h4>Full Stack Developer</h4>

      <p>
        Passionate Full Stack Developer specializing in modern web applications
        using React, Java, and scalable backend systems. Focused on performance,
        UI/UX, and real-world solutions.
      </p>

      {/* SOCIAL ICONS */}
      <div className="developer-socials">
        <a href="https://github.com/Makarandgoralkar" target="_blank">
          <i className="fab fa-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/makarand-goralkar-505788258/" target="_blank">
          <i className="fab fa-linkedin"></i>
        </a>

        <a href="https://tubular-paprenjak-fb76d2.netlify.app/" target="_blank">
          <i className="fas fa-globe"></i>
        </a>
      </div>

      <button
        className="contact-btn"
        onClick={() =>
          window.open("mailto:makarandgoralkar27@gmail.com")
        }
      >
        Hire Me →
      </button>
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Build Your Dream Project?</h2>
        <p>Contact us today and get a free consultation</p>

        <button
          className="btn-premium"
          onClick={() => navigate("/contact")}
        >
          Contact Now →
        </button>
      </section>

    </div>
  );
}

export default About;