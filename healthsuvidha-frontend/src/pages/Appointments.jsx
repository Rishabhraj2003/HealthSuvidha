

// export default Appointments;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all user's appointments
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
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments ❌", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Cancel appointment
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
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Cancel failed ❌");
      }

      await res.json();
      fetchAppointments(); // 🔁 Refresh the list after cancel
    } catch (error) {
      console.error("Cancel Error ❌", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        📋 My Appointments
      </h2>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      )}

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
            {app.disease && <p>⚕️ Disease: {app.disease}</p>}

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
            {app.status === "Confirmed" && (
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

export default Appointments;
