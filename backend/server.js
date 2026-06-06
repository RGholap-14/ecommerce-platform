const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Route to create payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body; // amount in smallest currency unit (cents)

    if (!amount || amount < 50) {
      return res.status(400).send({ error: "Amount must be at least 50 cents." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || "usd",
      payment_method_types: ["card"],
    });

    console.log("✅ PaymentIntent created:", paymentIntent); // log full object
    console.log("✅ Client Secret:", paymentIntent.client_secret); // log clientSecret

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));