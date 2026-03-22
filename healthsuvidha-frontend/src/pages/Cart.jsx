import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>🛒 My Cart</h2>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {cartItems.length === 0 && (
        <p style={{ textAlign: "center" }}>Cart is empty.</p>
      )}

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button
            onClick={() => removeItem(item._id)}
            style={{
              background: "#ff4d4d",
              color: "#fff",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ❌ Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <h3 style={{ textAlign: "center" }}>Total: ₹{total}</h3>
      )}
    </>
  );
}

export default Cart;
