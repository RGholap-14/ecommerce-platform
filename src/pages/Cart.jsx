import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout");
  };
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <h1
        style={{
          textAlign: "center",
          background: "lightviolet",
          padding: "0.5rem",
          borderRadius: "6px",
          marginBottom: "1rem"
        }}
      >
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  style={{ width: "80px", height: "80px", objectFit: "contain",marginBottom: "1rem" }}
                />

                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontWeight: 600 }}>{item.title || item.name}</div>
                  <div style={{ color: "#555", marginTop: "0.25rem" }}>${item.price}</div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "transparent",
                    border: "1px solid #cbd5e1",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p style={{ 
          marginTop: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          background: "#f9f9f9",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          color: "green",
          fontSize: "1.2rem"}}>
            
                Total: ${total.toFixed(2)}
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleCheckout}
              style={{
                marginTop: "1rem",
                background: "green",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default CartPage;
