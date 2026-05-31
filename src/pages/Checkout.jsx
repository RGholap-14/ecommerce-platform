import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();

 const handleContinueShopping = () => {
    navigate("/products");  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been placed successfully.</p>

    <button 
        onClick={handleContinueShopping} 
        style={{ 
          marginTop: "1rem", 
          background: "blue", 
          color: "white", 
          border: "none", 
          padding: "0.5rem 1rem", 
          borderRadius: "4px", 
          cursor: "pointer" 
        }}
      >
        Continue Shopping
      </button>


    </div>
  );
}

export default CheckoutPage;
