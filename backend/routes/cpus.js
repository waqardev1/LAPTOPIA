import express from "express";
import Cpu from "../models/Cpu.js";

const router = express.Router();

// GET /api/cpus — return ALL CPUs as a flat array (no filters, no pagination)
router.get("/", async (req, res) => {
  try {
    const cpus = await Cpu.find().lean();
    res.json(cpus);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CPUs", details: err.message });
  }
});

export default router;
