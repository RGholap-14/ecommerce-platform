import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/products" element={<h1>ProductsPage</h1>} />
        <Route path="/cart" element={<h1>CartsPage</h1>} />
        <Route path="/profile" element={<h1>ProfilePage</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;