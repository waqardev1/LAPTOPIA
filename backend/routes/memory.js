import express from "express";
import Memory from "../models/Memory.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const memory = await Memory.find();
    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch memory modules" });
  }
});

export default router;
