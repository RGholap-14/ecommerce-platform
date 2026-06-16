  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import { CartProvider } from "./context/CartContext.jsx";
  import { Elements } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";

  const stripePromise = loadStripe("pk_test_51TerGrV05DM6BKLULa8mxJ4QxjQ3ZzEtW1uztUmuA5DuYnuVYsAemiqjRuNZjxuczWfBIjdaKX9Ug9g4TR3DXDzc0066HJMgcp");

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </StrictMode>
  )

