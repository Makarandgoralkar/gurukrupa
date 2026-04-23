import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg"
];

function Home() {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">

  <Helmet>
    <title>
      Shri Gurukrupa Constructions | Best Construction Company in Bhusawal
    </title>
  </Helmet>

  {/* BACKGROUND SLIDER */}
  {heroImages.map((img, index) => (
    <div
      key={index}
      className={`hero-bg ${index === currentHero ? "active" : ""}`}
      style={{ backgroundImage: `url(${img})` }}
    />
  ))}

  {/* PREMIUM OVERLAY */}
  <div className="hero-overlay"></div>

  {/* CONTENT */}
  <div className="hero-content">

    <h1 className="hero-title">
      <span className="line">Shri Gurukrupa</span>
      <span className="line gold">Constructions</span>
      <span className="line sub">Best Construction Company in Bhusawal</span>
    </h1>

    <p className="hero-subtitle">
      Premium residential & commercial construction with
      world-class architecture, RCC expertise, and trusted engineering.
    </p>

    <div className="hero-buttons">
      <button 
  className="btn-glass"
  onClick={() => navigate("/projects")}
>
  Explore Projects
</button>

      <a href="/contact">
        <button className="btn-gold">Book Consultation</button>
      </a>
    </div>

    {/* SCROLL INDICATOR */}
    <div className="scroll-indicator">
      <span></span>
    </div>

  </div>

</div>
  );
}

export default Home;