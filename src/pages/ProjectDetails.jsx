import { useParams, useNavigate } from "react-router-dom";
import "../styles/Projects.css";

const projectsData = [
  {
    id: 1,
    title: "Luxury Villa Project",
    location: "Bhusawal",
    type: "Residential",
    image: "/images/project1.jpg",
    description:
      "A premium luxury villa designed with modern architecture and spacious interiors.",
    details: [
      "4BHK Luxury Villa with private garden",
      "Modern elevation with glass & stone finish",
      "Premium Italian flooring",
      "Modular kitchen with smart storage",
      "Private parking & security system",
      "Built-up area: 3200 sq.ft"
    ]
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Jalgaon",
    type: "Residential",
    image: "/images/project2.jpg",
    description:
      "Contemporary apartments designed for urban lifestyle with smart features.",
    details: [
      "2BHK & 3BHK luxury apartments",
      "Smart home automation features",
      "Gym, garden & clubhouse facilities",
      "Earthquake-resistant structure",
      "24/7 security with CCTV",
      "Built-up area: 1100–1800 sq.ft"
    ]
  },
  {
    id: 3,
    title: "Premium Residential Building",
    location: "Nashik",
    type: "Residential",
    image: "/images/project3.jpg",
    description:
      "High-end residential building offering comfort and premium lifestyle.",
    details: [
      "Multi-storey premium apartments",
      "Elevator & power backup system",
      "Designer lobby and entrance",
      "Children play area",
      "Rooftop garden & sitting area",
      "Prime city location"
    ]
  },
  {
    id: 4,
    title: "Office Interior Workspace",
    location: "Pune",
    type: "Commercial",
    image: "/images/project4.jpg",
    description:
      "Modern office interiors designed to improve productivity and aesthetics.",
    details: [
      "Open workspace layout",
      "Ergonomic furniture design",
      "LED lighting system",
      "Conference & meeting rooms",
      "Minimalist corporate design",
      "High-speed network setup"
    ]
  },
  {
    id: 5,
    title: "Business District / Skyline",
    location: "Pune",
    type: "Commercial",
    image: "/images/project5.jpg",
    description:
      "A landmark commercial skyline project with premium business infrastructure.",
    details: [
      "High-rise commercial towers",
      "Glass facade modern architecture",
      "Retail + office space integration",
      "Basement parking facility",
      "Energy-efficient design",
      "City landmark development"
    ]
  },
  {
    id: 6,
    title: "Modern Glass Office Building",
    location: "Mumbai",
    type: "Commercial",
    image: "/images/project6.jpg",
    description:
      "Ultra-modern corporate office building with glass architecture.",
    details: [
      "Full glass elevation structure",
      "Smart office automation system",
      "Central air conditioning",
      "Fire safety compliance system",
      "Luxury reception area",
      "IT & startup friendly workspace"
    ]
  }
];

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return <h2 style={{ color: "white", padding: "100px" }}>Project not found</h2>;
  }

  return (
    <div className="project-details-page">

      <div className="project-details-container">

        {/* LEFT IMAGE */}
        <div
          className="project-details-image"
          style={{ backgroundImage: `url(${project.image})` }}
        ></div>

        {/* RIGHT CONTENT */}
        <div className="project-details-content">

          <span className="type">{project.type}</span>

          <h1>{project.title}</h1>

          <p className="location">📍 {project.location}</p>

          <p className="desc">{project.description}</p>

        <ul className="details-list">
        {project.details.map((item, index) => (
        <li key={index}>✔ {item}</li>
        ))}
        </ul>

          <button onClick={() => navigate(-1)}>
            ← Back to Projects
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;