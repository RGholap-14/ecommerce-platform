import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div >
      <h1>Products</h1>
      <div  style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
    gap: "2 rem" 
  }}>
        {products.map(p => (
          <div  key={p.id} 
    style={{ 
      border: "1px solid #ccc", 
      padding: "1rem", 
      borderRadius: "8px", 
      width: "200px", 
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}  >
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => addToCart(p)} style={{ background: "orange", 
        color: "white", 
        border: "none", 
        padding: "0.5rem 1rem", 
        borderRadius: "4px", 
        cursor: "pointer" 
      }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductsPage;
