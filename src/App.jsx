import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/Cart";
import ProfilePage from "./pages/Profile";
import CheckoutForm from "./pages/CheckoutForm";
import CheckoutPage from "./pages/CheckoutPage";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/checkout-success" element={<CheckoutPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
