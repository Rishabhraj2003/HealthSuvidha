
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./Doctors.css";

function Doctors() {
  const location = useLocation();
  const navigate = useNavigate();

  const { city, disease, date } = location.state || {};

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/doctors?city=${city}&disease=${disease}`,
        );
        const data = await res.json();

        console.log("API Response:", data);

        // ✅ Handle different backend response formats
        if (Array.isArray(data)) {
          setDoctors(data);
        } else if (data.doctors) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }

        setLoading(false);
      } catch (error) {
        console.log("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    if (city && disease) {
      fetchDoctors();
    }
  }, [city, disease]);

  return (
    <>
      <Navbar />

      <section className="doctor-list-container">
        <h2>👨‍⚕️ Doctors in {city}</h2>
        <p>Disease: {disease}</p>

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
                <b>Address:</b> {doc.address}
              </p>

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
      </section>

      <Chatbot />
    </>
  );
}

export default Doctors;
