

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE 👉", data);

      if (res.ok) {
        alert("Registered Successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed ❌");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <>
      <Navbar />

      <section className="register-section">
        <div className="register-card">
          <h2>
            Create <span className="highlight">Account</span>
          </h2>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>👤 Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
              <label>🔑 Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password">👁</span>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2025 Healthसुविधा</p>
      </footer>
    </>
  );
}

export default Register;
