import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const JWT_SECRET1="JWT_SECRET=myVerySecretKey123!"

const router = express.Router();
const JWT_SECRET = JWT_SECRET1;




// Register route
// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required." });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered." });

    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Account not found." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password." });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ token, user: { _id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// Check if email exists
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Account not found." });
  res.json({ userId: user._id });
});

// Reset password
router.post("/reset-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword)
    return res.status(400).json({ message: "Missing fields" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  res.json({ success: true });
});
router.post("/reset-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword)
    return res.status(400).json({ message: "Missing fields" });

  if (newPassword.length < 8)
    return res.status(400).json({ message: "Password must be at least 8 characters." });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  res.json({ success: true });
});


// GET all registered users (for testing only!)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

export default router;
