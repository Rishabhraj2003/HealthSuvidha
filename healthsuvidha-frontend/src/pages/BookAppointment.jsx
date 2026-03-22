import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [disease, setDisease] = useState("");

  const [cities, setCities] = useState([]);

  // ✅ Fetch Cities from Backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/doctors", {
      state: {
        city,
        date,
        disease,
      },
    });
  };

  return (
    <>
      <Navbar />

      <section className="book-appointment-container">
        <h2>📅 Book a New Appointment</h2>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Disease / Problem</label>
          <input
            type="text"
            placeholder="e.g. Fever, Heart, Skin"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">🔍 Find Doctors</button>
        </form>
      </section>

      <Chatbot />
    </>
  );
}

export default BookAppointment;

