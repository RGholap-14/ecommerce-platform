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

<p>Total: ${total}</p>
  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
         <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
            Total: ${total}
          </p> 
  <button 
  onClick={handleCheckout} 
  style={{ 
    marginTop: "1rem", 
    background: "green", 
    color: "white", 
    border: "none", 
    padding: "0.5rem 1rem", 
    borderRadius: "4px", 
    cursor: "pointer" 
  }}
>
  Checkout
</button>

          </>
      )}
    </div>
  );
}
export default CartPage;
