import { useNavigate } from "react-router-dom";
import "../styles/Services.css";
import { servicesData } from "../data/servicesData";

function Services() {
  const navigate = useNavigate();

  return (
    <div className="services">
      <h2 className="services-title">Our Services</h2>

      <div className="service-grid">
        {servicesData.map((service) => {
          const Icon = service.icon;

          return (
            <div className="card" key={service.id}>
              <div className="icon">
                <Icon size={40} strokeWidth={1.5} />
              </div>

              <h3>{service.title}</h3>
              <p>{service.desc}</p>

              {/* ✅ BUTTON INSTEAD OF LINK */}
              <button
                className="btn-quote"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;