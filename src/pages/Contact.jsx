import { useState } from "react";
import { push, ref } from "firebase/database";
import { db } from "../firebase";
import Swal from "sweetalert2";
import "../styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    if (!name || !phone || !message) {
      Swal.fire("Error", "All fields required", "error");
      return;
    }

    setLoading(true);

    await push(ref(db, "messages"), {
      name,
      phone,
      message
    });

    setLoading(false);

    Swal.fire("Success", "Message Sent", "success");

    setName("");
    setPhone("");
    setMessage("");
  };

  return (
  <div className="contact page">
    <h2 className="contact-title">Get In Touch</h2>

    <div className="contact-container">

      {/* LEFT */}
      <div className="contact-info">
        <h3>Contact Information</h3>

        <p>📞 <a href="tel:08999916870">+91 8999916870</a></p>
        <p>📧 <a href="mailto:shrigurukrupac@gmail.com">shrigurukrupac@gmail.com</a></p>
        <p>💬 <a href="https://wa.me/918999916870" target="_blank">WhatsApp Chat</a></p>
        <p>📸 <a href="https://instagram.com/engineer.shrigurukrupa" target="_blank">Instagram</a></p>
      </div>

      {/* RIGHT */}
      <div className="contact-form">
        <input value={name} placeholder="Your Name" onChange={(e)=>setName(e.target.value)} />
        <input value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)} />
        <textarea value={message} placeholder="Your Message" onChange={(e)=>setMessage(e.target.value)} />
        <button onClick={submitForm} disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>

    </div>

    {/* MAP SECTION OUTSIDE GRID */}
    {/* MAP SECTION */}
<div className="map-section">
  <h3 className="map-title">Our Location</h3>

  <iframe
    className="map-frame"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.721123960794!2d75.8097947!3d21.0438417!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9a5001362fcd3%3A0x255aa321ae5cc46f!2sShri%20Gurukrupa%20Constructions%2C%20Bhusawal!5e0!3m2!1sen!2sin!4v1776169692285!5m2!1sen!2sin"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

  </div>
);
}

export default Contact;