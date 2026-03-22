

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user's appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await res.json();
      console.log("Appointments 👉", data); // 🔍 debug

      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments ❌", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Cancel Appointment
  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Cancel failed");
      }

      await res.json();
      fetchAppointments(); // 🔁 refresh list
    } catch (error) {
      console.error("Cancel Error ❌", error);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔹 Header */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>📋 My Appointments</h2>

        <button
          onClick={() => navigate("/book-appointment")}
          style={{
            marginTop: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➕ Book New Appointment
        </button>
      </div>

      {/* 🔹 Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* 🔹 No Data */}
      {!loading && appointments.length === 0 && (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      )}

      {/* 🔹 Appointments List */}
      <div style={{ maxWidth: "800px", margin: "20px auto" }}>
        {appointments.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3>👨‍⚕️ Doctor: {app.doctorName}</h3>
            <p>🩺 Speciality: {app.specialization}</p>
            <p>📍 City: {app.city}</p>
            <p>📅 Date: {new Date(app.date).toLocaleDateString()}</p>

            <p>
              🔔 Status:{" "}
              <b
                style={{
                  color:
                    app.status === "Confirmed"
                      ? "green"
                      : app.status === "Cancelled"
                        ? "red"
                        : "orange",
                }}
              >
                {app.status}
              </b>
            </p>

            {/* 🔄 Cancel Button */}
            {app.status !== "Cancelled" && (
              <button
                onClick={() => cancelAppointment(app._id)}
                style={{
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ❌ Cancel Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MyAppointments;
