

import { useState } from "react";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./Blood.css";

function Blood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [showRequest, setShowRequest] = useState(false);

  const bloodBanks = [
    {
      id: 1,
      name: "District Blood Bank",
      city: "Kanpur",
      blood: "O+",
      units: 8,
      phone: "108",
      map: "https://maps.google.com/maps?q=kanpur&t=&z=13&ie=UTF8&iwloc=&output=embed",
    },
    {
      id: 2,
      name: "Red Cross Blood Center",
      city: "Lucknow",
      blood: "A+",
      units: 5,
      phone: "+91 9876543210",
      map: "https://maps.google.com/maps?q=lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed",
    },
  ];

  const filteredBanks = bloodBanks.filter(
    (b) =>
      (bloodGroup === "" || b.blood === bloodGroup) &&
      (city === "" || b.city.toLowerCase().includes(city.toLowerCase())),
  );

  // ✅ DONOR SUBMIT FUNCTION
  const handleDonorSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const donorData = {
      name: form[0].value,
      age: form[1].value,
      bloodGroup: form[2].value,
      city: form[3].value,
      phone: form[4].value,
      lastDonationDate: form[5].value,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/blood/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donorData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed ❌");
        return;
      }

      alert("Registered as donor successfully ❤️");

      form.reset();
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <>
      <Navbar />

      <section className="blood-container">
        <h2>🩸 Blood Bank Services</h2>

        {/* SEARCH */}
        <div className="search-box">
          <select onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* BLOOD BANK LIST */}
        <div className="blood-list">
          {filteredBanks.map((bank) => (
            <div key={bank.id} className="blood-card">
              <h3>{bank.name}</h3>
              <p>
                <b>City:</b> {bank.city}
              </p>
              <p>
                <b>Blood Group:</b> {bank.blood}
              </p>
              <p>
                <b>Available Units:</b> {bank.units}
              </p>

              <iframe title="map" src={bank.map} />

              <div className="blood-actions">
                <a href={`tel:${bank.phone}`} className="call-btn">
                  📞 Emergency
                </a>
                <button
                  onClick={() => setShowRequest(true)}
                  className="request-btn"
                >
                  Request Blood
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* REQUEST BLOOD FORM */}
        {showRequest && (
          <div className="modal">
            <div className="modal-content">
              <h3>🩸 Request Blood</h3>
              <form className="request-form">
                <input type="text" placeholder="Patient Name" required />
                <input type="number" placeholder="Age" required />
                <input type="text" placeholder="Blood Group" required />
                <input type="number" placeholder="Required Units" required />
                <input type="text" placeholder="Hospital Name" required />
                <input type="text" placeholder="City" required />
                <input type="tel" placeholder="Contact Number" required />
                <select required>
                  <option>Emergency</option>
                  <option>Normal</option>
                </select>

                <button type="submit">Submit Request</button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowRequest(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}

        {/* DONATE BLOOD */}
        <div className="donate-section">
          <h3>❤️ Register as Blood Donor</h3>
          <p>Eligible if age 18–65 & weight &gt; 50kg</p>

          <form className="donate-form" onSubmit={handleDonorSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Age" required />
            <input type="text" placeholder="Blood Group" required />
            <input type="text" placeholder="City" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="date" placeholder="Last Donation Date" />
            <button type="submit">Register Donor</button>
          </form>
        </div>
      </section>

      <Chatbot />
    </>
  );
}

export default Blood;
