
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function ConfirmAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Extract doctor, date, disease from previous page
  const { doctor, date, disease } = location.state || {};

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  if (!doctor || !date) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Navbar />
        <h2>Error: Doctor or date missing ❌</h2>
        <p>Please go back and select a doctor and date.</p>
      </div>
    );
  }

  const confirmBooking = async () => {
    setLoading(true);

    // 🔹 Build appointmentData object
    const appointmentData = {
      doctorId: doctor._id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      city: doctor.city,
      date,
      disease,
    };

    try {
      const res = await fetch("http://localhost:5000/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to book appointment ❌");
      }

      const data = await res.json();
      console.log("Appointment booked:", data);

      alert("✅ Appointment booked successfully!");
      navigate("/appointments"); // Redirect to My Appointments
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2>Confirm Appointment</h2>
        <p>👨‍⚕️ Doctor: {doctor.name}</p>
        <p>🩺 Specialization: {doctor.specialization}</p>
        <p>📍 City: {doctor.city}</p>
        <p>📅 Date: {new Date(date).toLocaleDateString()}</p>
        {disease && <p>⚕️ Disease: {disease}</p>}

        <button
          onClick={confirmBooking}
          disabled={loading}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>
    </>
  );
}

export default ConfirmAppointment;
