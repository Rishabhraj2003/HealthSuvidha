
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Insurance.css";

const plansData = [
  {
    type: "basic",
    name: "Basic Plan",
    price: 999,
    displayPrice: "₹999 / year",
    features: [
      "Hospitalization Coverage",
      "Doctor Consultation",
      "Diagnostic Tests",
      "Cashless Treatment",
    ],
  },
  {
    type: "premium",
    name: "Premium Plan",
    price: 2999,
    displayPrice: "₹2999 / year",
    badge: "Most Popular",
    features: [
      "All Basic Features",
      "Emergency Ambulance",
      "ICU & Surgery Cover",
      "Family Coverage",
      "24×7 Doctor Support",
    ],
  },
  {
    type: "family",
    name: "Family Plan",
    price: 4999,
    displayPrice: "₹4999 / year",
    badge: "Best for Families",
    features: [
      "Covers 4 Members",
      "Maternity Benefits",
      "Child Care Support",
      "Annual Health Checkup",
      "Priority Claims",
    ],
  },
  {
    type: "senior",
    name: "Senior Citizen Plan",
    price: 1999,
    displayPrice: "₹1999 / year",
    badge: "For Seniors",
    features: [
      "Hospitalization Cover",
      "Chronic Disease Support",
      "Annual Health Checkup",
      "Home Doctor Visits",
    ],
  },
];

function Insurance() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredPlans = plansData
    .filter((plan) => plan.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="insurance-hero">
        <h2>
          Health <span className="highlight">Insurance Plans</span>
        </h2>
        <p>Secure your health & finances with trusted insurance coverage.</p>
      </section>

      {/* Search & Sort */}
      <div className="plan-controls">
        <input
          type="text"
          placeholder="Search plan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort by Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Plans */}
      <section className="insurance-plans">
        {filteredPlans.map((plan) => (
          <div key={plan.type} className={`plan-card ${plan.type}`}>
            {plan.badge && <span className="badge">{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <p className="price">{plan.displayPrice}</p>
            <ul>
              {plan.features.map((feat, idx) => (
                <li key={idx}>✔ {feat}</li>
              ))}
            </ul>
            <button
              className="plan-btn"
              onClick={() => navigate(`/insurance/${plan.type}`)}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </section>

      {/* Benefits Section */}
      <section className="insurance-benefits">
        <h2>Why Choose Our Plans?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">💡 Cashless Treatment</div>
          <div className="benefit-card">🏥 Wide Hospital Network</div>
          <div className="benefit-card">🩺 24×7 Doctor Support</div>
          <div className="benefit-card">📋 Easy Claim Process</div>
          <div className="benefit-card">👨‍👩‍👧 Family Coverage Options</div>
          <div className="benefit-card">💰 Affordable Premiums</div>
        </div>
      </section>
    </>
  );
}

export default Insurance;
