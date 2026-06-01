import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setTimeout(() => {
          setProducts(res.data);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <div className="spinner"></div>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "18px",
            color: "orange",
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product, e) => {
  addToCart(product);
  setClickedId(product.id);

  
  e.target.classList.add("button-clicked");
  setTimeout(() => {
    e.target.classList.remove("button-clicked");
    setClickedId(null); // reset text after delay
  }, 1000);
};

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.75rem",
          marginBottom: "1.5rem",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "1rem",
        }}
      />

      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
            }}
          >

             {/* Product image */}
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />

            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              {product.title}
            </h3>
            <p style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
              ${product.price}
            </p>
            <button
               onClick={(e) => handleAddToCart(product, e)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "transform 0.1s ease, background 0.3s ease",
                }}
              >
                {clickedId === product.id ? "Added!" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
