import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {NavLink} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
      <ul>
        <li><NavLink to="/"className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
        <li><NavLink to="/products"className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink></li>
        <li><NavLink to="/cart"className={({ isActive }) => isActive ? "active-link" : ""}>Cart({cartItems.length})</NavLink></li>
        <li><NavLink to="/profile"className={({ isActive }) => isActive ? "active-link" : ""}>Profile</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;