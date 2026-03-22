


import { useEffect, useState } from "react";
import Chatbot from "../components/Chatbot";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Always fetch latest user from DB
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setUser(data);

        // sync localStorage
        localStorage.setItem("user", JSON.stringify(data));

      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ DELETE ACCOUNT
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/users/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert("Account deleted permanently");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />

      <section className="dashboard-container">
        <h2 className="dashboard-title">
          Welcome back, <span className="highlight">{user.name}</span> 👋
        </h2>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>📅 Appointments</h3>
            <p>Book or manage doctor visits</p>
            <button onClick={() => navigate("/appointments")}>Open</button>
          </div>

          <div className="dashboard-card">
            <h3>💊 Medicines</h3>
            <p>Order medicines & upload prescription</p>
            <button onClick={() => navigate("/medicine")}>Order</button>
          </div>

          <div className="dashboard-card">
            <h3>📄 Medical Reports</h3>
            <p>View lab & test reports</p>
            <button onClick={() => navigate("/reports")}>View</button>
          </div>

          <div className="dashboard-card">
            <h3>💳 Insurance</h3>
            <p>Manage your health plans</p>
            <button onClick={() => navigate("/insurance")}>View</button>
          </div>

          <div className="dashboard-card blood">
            <h3>🩸 Blood Bank</h3>
            <p>Donate or request blood</p>
            <button onClick={() => navigate("/blood")}>Open</button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-panel">
          <div className="profile-header">
            <img
              src={user.photo || require("../assets/user.png")}
              alt="User"
              className="profile-img"
            />
            <div>
              <h3>👤 Personal Details</h3>
              <p className="profile-sub">Your health profile</p>
            </div>
          </div>

          <div className="profile-grid">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone || "N/A"}</p>
            <p><b>Gender:</b> {user.gender || "N/A"}</p>
            <p><b>Age:</b> {user.age || "N/A"}</p>
            <p><b>Blood Group:</b> {user.bloodGroup || "N/A"}</p>
            <p><b>City:</b> {user.city || "N/A"}</p>
            <p><b>Emergency Contact:</b> {user.emergencyContact || "N/A"}</p>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            {user.phone ? "Edit Profile" : "Add Details"}
          </button>

          <button
            className="delete-account-btn"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </section>

      <Chatbot />
    </>
  );
}

export default Dashboard;