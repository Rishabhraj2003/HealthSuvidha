

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ SAFE REDIRECT (NO UI CHANGE)
        const redirectTo = location.state?.redirectTo || "/dashboard";
        const medicineState = location.state?.medicine || null;

        navigate(redirectTo, { state: medicineState });
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch {
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="login-section">
        <div className="login-card">
          <h2>
            Login to <span className="highlight">Healthसुविधा</span>
          </h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>📧 Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>🔑 Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="signup-link">
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </section>

      <Chatbot />
    </>
  );
}

export default Login;
