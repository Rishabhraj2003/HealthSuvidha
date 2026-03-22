
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Medicine.css";

function Medicine() {
  const navigate = useNavigate();

  // ✅ Hardcoded medicines
  const [medicines] = useState([
    {
      id: "m1",
      name: "Paracetamol 650mg",
      price: 30,
      company: "ABC Pharma",
      desc: "Fever & pain relief",
      category: "Pain Relief",
    },
    {
      id: "m2",
      name: "Cough Syrup",
      price: 85,
      company: "XYZ Pharma",
      desc: "Relief from cough & cold",
      category: "Cold & Flu",
    },
    {
      id: "m3",
      name: "Vitamin C Tablets",
      price: 199,
      company: "HealthPlus",
      desc: "Boost immunity",
      category: "Vitamins",
    },
    {
      id: "m4",
      name: "Diabetes Test Strips",
      price: 499,
      company: "AccuCheck",
      desc: "Blood sugar testing",
      category: "Diabetes",
    },
    {
      id: "m5",
      name: "Ibuprofen 400mg",
      price: 50,
      company: "Medico",
      desc: "Pain & inflammation",
      category: "Pain Relief",
    },
    {
      id: "m6",
      name: "Multivitamins",
      price: 299,
      company: "WellnessCorp",
      desc: "Daily nutrients",
      category: "Vitamins",
    },
    {
      id: "m7",
      name: "Antibiotic Ointment",
      price: 120,
      company: "HealFast",
      desc: "Infection prevention",
      category: "Skin Care",
    },
    {
      id: "m8",
      name: "Allergy Relief Tablets",
      price: 150,
      company: "AllerFree",
      desc: "Reduces allergy symptoms",
      category: "Cold & Flu",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Pain Relief",
    "Cold & Flu",
    "Vitamins",
    "Diabetes",
    "Skin Care",
  ];

  // ✅ Filter medicines by search & category
  const filteredMeds = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || med.category === category),
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="medicine-hero">
        <h2>
          Online <span className="highlight">Medicine Delivery</span>
        </h2>
        <p>Order genuine medicines delivered to your door.</p>
      </section>

      {/* Search */}
      <div className="medicine-search">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>Clear</button>
      </div>

      {/* Categories */}
      <div className="medicine-categories">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category"
            onClick={() => setCategory(cat)}
            style={{ background: category === cat ? "#caf0f8" : "#fff" }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Medicines Grid */}
      <section className="medicine-grid">
        {filteredMeds.length > 0 ? (
          filteredMeds.map((med) => (
            <div className="medicine-card" key={med.id}>
              <h3>{med.name}</h3>
              <p>{med.desc}</p>
              <p className="price">₹{med.price}</p>
              <button
                onClick={() => navigate("/medicine/details", { state: med })}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No medicines found 😔
          </p>
        )}
      </section>
    </>
  );
}

export default Medicine;
