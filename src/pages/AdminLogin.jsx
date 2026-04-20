import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1200,
        showConfirmButton: false
      });

      navigate("/dashboard");

    } catch {
      setError("Invalid Email or Password"); // ✅ no ESLint warning
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        title: "Reset Link Sent",
        text: "Check your email"
      });

    } catch {
      setError("Failed to send reset email"); // ✅ fixed here too
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin} autoComplete="off">

          {/* ERROR */}
          {error && <p className="error">{error}</p>}

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              autoComplete="new-password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* FORGOT PASSWORD */}
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </p>

          {/* BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;