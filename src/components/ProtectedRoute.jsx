import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ wait until auth check completes
  if (loading) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
}

  // ❌ not logged in → redirect
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ✅ logged in → allow access
  return children;
}

export default ProtectedRoute;