import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../context/CartContext";


function CheckoutForm() {
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // ✅ hook for navigation

  const { cartItems, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );
  const amountInCents = Math.round(total * 100);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (formData.address.length < 10) newErrors.address = "Address must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 1. Validate user details
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before checking out.");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    // ✅ 2. Get card element from Stripe
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    if (amountInCents < 50) {
      alert("Cart total is too low for payment processing. Add more items to checkout.");
      return;
    }

    // ✅ 3. Call backend to create payment intent
    const response = await fetch("http://localhost:5000/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents, currency: "usd" })
    });
    const data = await response.json();
    if (!response.ok || !data.clientSecret) {
      console.error("Payment intent creation failed:", data);
      alert("Payment setup failed: " + (data.error || "invalid server response"));
      return;
    }
    const { clientSecret } = data;

    // ✅ 4. Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: { line1: formData.address }
        }
      }
    });

    // ✅ 5. Handle result
    if (error) {
      console.error("Payment failed:", error.message);
      alert("Payment failed: " + error.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      clearCart();
      navigate("/checkout-success"); // redirect to success page
    }
  };

  return (
     <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
          Order total: ${total.toFixed(2)}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Delivery Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.address}
            helperText={errors.address}
          />

          <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
              <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </Box>

          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            Place Order
          </Button>
        </form>
      </Box>
    </Container>
  );
}


export default CheckoutForm;
