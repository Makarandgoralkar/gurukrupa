import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Home.css";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg"
];

function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">

      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          Shri Gurukrupa Constructions | Best Construction Company in Bhusawal
        </title>

        <meta
          name="description"
          content="Shri Gurukrupa Constructions offers premium residential, commercial, RCC design, renovation and interior solutions in Bhusawal with expert engineers."
        />

        <meta
          name="keywords"
          content="construction company Bhusawal, Shri Gurukrupa Constructions, home builder Bhusawal, RCC design, interior design Bhusawal"
        />

        <link
          rel="canonical"
          href="https://gurukrupa-construction.web.app/"
        />
      </Helmet>

      {/* ================= BACKGROUND ================= */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-bg ${index === currentHero ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="hero-overlay"></div>

      {/* ================= CONTENT ================= */}
      <div className="hero-content">

        {/* 🔥 ANIMATED BRAND HEADING */}
        <h1 className="hero-title">
          <span className="brand-name">
            Shri Gurukrupa Constructions
          </span>

          <span className="hero-highlight">
            Best Construction Company in Bhusawal
          </span>
        </h1>

        {/* 🔥 DYNAMIC SUBTITLE */}
        <p className="hero-subtitle">
          We build <span>premium homes</span> & <span>commercial spaces</span>
          with modern architecture, RCC expertise, and trusted engineering excellence.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <a href="/contact">
            <button className="btn-primary">Get Free Quote</button>
          </a>

          <a href="/about">
            <button className="btn-outline">View Projects</button>
          </a>
        </div>

        {/* TRUST */}
        <div className="trust-badges">
          ⭐ 4.8 Rating &nbsp; | &nbsp; 🏗️ 100+ Projects &nbsp; | &nbsp; 👷 25+ Engineers
        </div>

      </div>

    </div>
  );
}

export default Home;