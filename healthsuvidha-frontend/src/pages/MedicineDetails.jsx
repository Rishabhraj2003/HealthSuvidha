
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./MedicineDetails.css";

function MedicineDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <p style={{ textAlign: "center" }}>Medicine not found ❌</p>;

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === state.id);
    if (exists) exists.qty += 1;
    else cart.push({ ...state, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart");
  };

  return (
    <>
      <Navbar />
      <section className="medicine-details">
        <div className="details-card">
          <h2>{state.name}</h2>
          <p className="company">By {state.company}</p>
          <p className="price">₹{state.price}</p>
          <p className="desc">{state.desc}</p>
          <ul>
            <li>✔ Genuine Product</li>
            <li>✔ Fast Delivery</li>
            <li>✔ No Prescription Required</li>
          </ul>
          <div className="details-actions">
            <button className="buy-btn" onClick={handleAddToCart}>
              Buy Now
            </button>
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default MedicineDetails;
