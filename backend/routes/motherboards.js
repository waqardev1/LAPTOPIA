import express from "express";
import Motherboard from "../models/Motherboard.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const motherboards = await Motherboard.find();
    res.json(motherboards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch motherboards" });
  }
});

export default router;
