import "../styles/Projects.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const projectsData = [
  {
    id: 1,
    title: "Luxury Villa Project",
    location: "Bhusawal",
    type: "Residential",
    image: "/images/project1.jpg"
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Jalgaon",
    type: "Residential",
    image: "/images/project2.jpg"
  },
  {
    id: 3,
    title: "Premium Residential Building",
    location: "Nashik",
    type: "Residential",
    image: "/images/project3.jpg"
  },
  {
    id: 4,
    title: "Office Interior Workspace",
    location: "Pune",
    type: "Commercial",
    image: "/images/project4.jpg"
  },
  {
    id: 5,
    title: "Business District / Skyline",
    location: "Pune",
    type: "Commercial",
    image: "/images/project5.jpg"
  },
  {
    id: 6,
    title: "Modern Glass Office Building",
    location: "Mumbai",
    type: "Commercial",
    image: "/images/project6.jpg"
  }
];

function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.type === filter);

  return (
    <div className="projects-page">

      {/* HERO */}
      <div className="projects-hero">
        <div className="hero-overlay-dark"></div>

        <div className="projects-hero-content">
          <span>OUR PROJECTS</span>
          <h1>Signature Developments</h1>
          <p>Where vision meets luxury living</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        {["All", "Residential", "Commercial"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* PROJECTS */}
      <div className="projects-container">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <div
              className="project-image"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>

            <div className="project-info">
              <span className="tag">{project.type}</span>
              <h2>{project.title}</h2>
              <p>{project.location}</p>

              <button className="view-btn" onClick={() => navigate(`/projects/${project.id}`)}>
                View Project →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Projects;