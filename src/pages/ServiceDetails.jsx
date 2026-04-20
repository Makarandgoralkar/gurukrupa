import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { servicesData } from "../data/servicesData";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.id === id);

  const [index, setIndex] = useState(0);

  // ✅ AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % service.images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, [service]);

  if (!service) {
    return <h2 style={{ textAlign: "center" }}>Service Not Found</h2>;
  }

  return (
    <div className="service-details">

      {/* HEADER */}
      <div className="service-header">
        <button
            className="back-btn-clean"
            onClick={() => navigate(-1)}
        >
            <ArrowLeft size={22} />
        </button>

        <h1 className="header-title">{service.title}</h1>
      </div>

      {/* IMAGE SLIDER */}
      <div className="image-slider">
        <img src={service.images[index]} alt={service.title} />
      </div>

      {/* ✅ DOTS */}
      <div className="dots">
        {service.images.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

      {/* DESCRIPTION */}
      <p className="service-desc">{service.desc}</p>

      {/* EXTRA DETAILS */}
      <p className="service-details-text">{service.details}</p>

      <Link to="/contact">
        <button className="btn-premium">Get Quote Now</button>
      </Link>
    </div>
  );
}

export default ServiceDetails;