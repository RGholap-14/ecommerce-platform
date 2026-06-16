import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = []; // temporary in-memory store

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // TODO: Save user to DB later
  // Save user in memory with default role
  users.push({ email, password: hashedPassword, role: "customer" });

  res.json({ message: "User created successfully", email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // TODO: Fetch user from DB later
  // Find user in memory
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const profile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = users.find((u) => u.email === decoded.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email, role: user.role });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};