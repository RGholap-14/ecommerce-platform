import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function CheckoutForm() {
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // ✅ hook for navigation

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // ✅ Redirect to success page
      navigate("/checkout-success");
    }
  };

  return (
     <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
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
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            Place Order
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default CheckoutForm;
