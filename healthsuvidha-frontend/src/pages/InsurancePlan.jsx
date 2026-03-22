
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./InsurancePlan.css";

const planData = {
  basic: {
    name: "Basic Health Plan",
    price: "₹999 / year",
    badge: "Affordable",
    coverage: "Individual Coverage",
    highlights: [
      "Cashless Hospitalization",
      "Doctor Consultation",
      "Diagnostic Tests",
      "Emergency Support",
    ],
    eligibility: "18 – 60 Years",
    validity: "1 Year",
  },
  premium: {
    name: "Premium Health Plan",
    price: "₹2999 / year",
    badge: "Most Popular",
    coverage: "Individual + Family",
    highlights: [
      "All Basic Benefits",
      "ICU & Surgery Cover",
      "Emergency Ambulance",
      "24×7 Doctor Support",
      "Family Coverage",
    ],
    eligibility: "18 – 65 Years",
    validity: "1 Year",
  },
  family: {
    name: "Family Health Plan",
    price: "₹4999 / year",
    badge: "Best for Families",
    coverage: "Up to 4 Members",
    highlights: [
      "Family Coverage",
      "Maternity Benefits",
      "Child Healthcare",
      "Annual Health Checkup",
      "Priority Claims",
    ],
    eligibility: "18 – 60 Years",
    validity: "1 Year",
  },
  senior: {
    name: "Senior Citizen Plan",
    price: "₹1999 / year",
    badge: "For Seniors",
    coverage: "Individual / Family",
    highlights: [
      "Chronic Disease Support",
      "Hospitalization Cover",
      "Home Doctor Visits",
      "Annual Health Checkup",
    ],
    eligibility: "60+ Years",
    validity: "1 Year",
  },
};

function InsurancePlan() {
  const { planType } = useParams();
  const navigate = useNavigate();
  const plan = planData[planType];

  if (!plan) {
    return <h2 style={{ textAlign: "center" }}>Plan Not Found ❌</h2>;
  }

  return (
    <>
      <Navbar />

      <section className="insurance-plan-container">
        <div className="plan-header">
          <span className="plan-badge">{plan.badge}</span>
          <h2>{plan.name}</h2>
          <p className="plan-price">{plan.price}</p>
          <p className="plan-coverage">{plan.coverage}</p>
        </div>

        <div className="plan-highlights">
          {plan.highlights.map((item, idx) => (
            <div key={idx} className="highlight-card">
              ✔ {item}
            </div>
          ))}
        </div>

        <div className="plan-info">
          <div className="info-card">
            <h4>Eligibility</h4>
            <p>{plan.eligibility}</p>
          </div>

          <div className="info-card">
            <h4>Policy Validity</h4>
            <p>{plan.validity}</p>
          </div>

          <div className="info-card">
            <h4>Claim Process</h4>
            <p>Cashless & Reimbursement</p>
          </div>
        </div>

        <div className="plan-actions">
          <button className="buy-btn">Buy Plan</button>
          <button className="back-btn" onClick={() => navigate("/insurance")}>
            Back to Plans
          </button>
        </div>
      </section>
    </>
  );
}

export default InsurancePlan;
