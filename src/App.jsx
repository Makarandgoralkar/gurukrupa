import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

import { FaRobot } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ServiceDetails from "./pages/ServiceDetails";

import Chatbot from "./components/Chatbot"; // 🤖 NEW
import ScrollToTop from "./components/ScrollToTop";

/* 🔥 Animated Routes Wrapper */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname}>
      <div className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/service/:id" element={<ServiceDetails />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-wrapper">

        <Navbar />

        <div className="main-content">
          <AnimatedRoutes />
        </div>

        {/* 🤖 FLOATING CHATBOT ICON */}
        <button
          className="chatbot-fab"
          onClick={() => setOpenChat(true)}
        >
          <FaRobot size={22} />
        </button>

        {/* 🤖 CHAT POPUP */}
        {openChat && (
          <Chatbot onClose={() => setOpenChat(false)} />
        )}

        <Footer />

      </div>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;