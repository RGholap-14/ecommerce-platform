import {NavLink} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
      <ul>
        <li><NavLink to="/"className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
        <li><NavLink to="/products"className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink></li>
        <li><NavLink to="/cart"className={({ isActive }) => isActive ? "active-link" : ""}>Cart</NavLink></li>
        <li><NavLink to="/profile"className={({ isActive }) => isActive ? "active-link" : ""}>Profile</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;