

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./Doctors.css";

function DoctorsList() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ State passed from BookAppointment
  const { city, disease, date } = location.state || {};
  const specialization = disease;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAFETY REDIRECT (VERY IMPORTANT)
  // If user opens /doctors directly → send back
  useEffect(() => {
    if (!city || !specialization || !date) {
      navigate("/book-appointment");
    }
  }, [city, specialization, date, navigate]);

  // ✅ Fetch doctors
  useEffect(() => {
    if (!city || !specialization) return;

    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/doctors/search?city=${city}&specialization=${specialization}`,
        );

        const data = await res.json();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching doctors ❌", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [city, specialization]);

  return (
    <>
      <Navbar />

      <div className="doctor-list-container">
        <h2>👨‍⚕️ Doctors in {city}</h2>
        <p>
          <b>Disease:</b> {specialization}
        </p>
        <p>
          <b>Date:</b> {date}
        </p>

        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p>❌ No doctors found</p>
        ) : (
          doctors.map((doc) => (
            <div className="doctor-card" key={doc._id}>
              <h3>{doc.name}</h3>

              <p>
                <b>Specialization:</b> {doc.specialization}
              </p>
              <p>
                <b>Hospital:</b> {doc.hospital}
              </p>
              <p>
                <b>Phone:</b> {doc.phone}
              </p>
              <p>
                <b>Timing:</b> {doc.timing}
              </p>
              <p>
                <b>Address:</b> {doc.address}
              </p>

              <p>⭐ Rating: {doc.rating}</p>

              {/* ✅ Google Map */}
              {doc.location?.lat && doc.location?.lng && (
                <>
                  <iframe
                    title={`map-${doc._id}`}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${doc.location.lat},${doc.location.lng}&output=embed`}
                  ></iframe>

                  <a
                    href={`https://www.google.com/maps?q=${doc.location.lat},${doc.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Open in Google Maps
                  </a>
                </>
              )}

              {/* ✅ Book Appointment */}
              <button
                onClick={() =>
                  navigate("/confirm-appointment", {
                    state: {
                      doctor: doc,
                      city,
                      date,
                      disease,
                    },
                  })
                }
              >
                Book Appointment
              </button>
            </div>
          ))
        )}
      </div>

      <Chatbot />
    </>
  );
}

export default DoctorsList;
