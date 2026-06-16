import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {NavLink} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
          <h2>My Store</h2>
      <ul>
        <li><NavLink to="/"className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>

        <li><NavLink to="/products"className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink></li>

        <li><NavLink to="/cart"className={({ isActive }) => isActive ? "active-link" : ""} 
         style={{ position: "relative", cursor: "pointer" }}>
            🛒 Cart
        {cartItems.length > 0 && (
          <span style={ {
                position: "absolute",
                top: "2px",          // fine-tuned vertical position
                right: "-20px",        // fine-tuned horizontal position
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "18px",        // fixed width
                height: "18px",       // fixed height
                display: "flex",      // centers text horizontally
                alignItems: "center", // centers text vertically
                justifyContent: "center",
                fontSize: "0.7rem",   // smaller text
                fontWeight: "bold",
                lineHeight: "1"
                
          }}>
            {cartItems.length}
          </span>
        )}</NavLink></li>

        <li><NavLink to="/profile"className={({ isActive }) => isActive ? "active-link" : ""}>Profile</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
        
      </ul>

    </nav>
  );
}

export default Navbar;