import { useParams, useNavigate } from "react-router-dom";
import "../styles/Projects.css";

const projectsData = [
  {
    id: 1,
    title: "Luxury Villa Project",
    location: "Bhusawal",
    type: "Residential",
    image: "/images/project1.jpg",
    description: "Luxury villas with premium amenities and modern architecture."
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Jalgaon",
    type: "Residential",
    image: "/images/project2.jpg",
    description: "Modern apartments with smart features and elegant design."
  },
  {
    id: 3,
    title: "Premium Residential Building",
    location: "Nashik",
    type: "Residential",
    image: "/images/project3.jpg",
    description: "Premium living spaces in prime Nashik locations."
  },
  {
    id: 4,
    title: "Office Interior Workspace",
    location: "Pune",
    type: "Commercial",
    image: "/images/project4.jpg",
    description: "Modern office interiors designed for productivity."
  },
  {
    id: 5,
    title: "Business District / Skyline",
    location: "Pune",
    type: "Commercial",
    image: "/images/project5.jpg",
    description: "Iconic skyline business district developments."
  },
  {
    id: 6,
    title: "Modern Glass Office Building",
    location: "Mumbai",
    type: "Commercial",
    image: "/images/project6.jpg",
    description: "Premium glass facade corporate office spaces."
  }
];

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return <h2 style={{ color: "white" }}>Project not found</h2>;
  }

  return (
    <div className="project-details-page">

      {/* FULL BACKGROUND IMAGE */}
      <div
        className="project-hero"
        style={{ backgroundImage: `url(${project.image})` }}
      >

        {/* DARK OVERLAY */}
        <div className="overlay"></div>

        {/* CONTENT OVER IMAGE */}
        <div className="project-content">

          <span className="type">{project.type}</span>

          <h1>{project.title}</h1>

          <p className="location">📍 {project.location}</p>

          <p className="desc">{project.description}</p>

          <button onClick={() => navigate(-1)}>
            ← Back
          </button>

        </div>
      </div>

    </div>
  );
}

export default ProjectDetails;