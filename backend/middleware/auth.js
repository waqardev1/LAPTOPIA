// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('JWT payload:', payload);
    const userId = payload.userId;
    if (!userId) return res.status(401).json({ error: "Invalid token payload" });
    req.user = await User.findById(userId);
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    console.log("JWT error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
