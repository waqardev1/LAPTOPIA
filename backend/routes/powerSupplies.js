import express from "express";
import PowerSupply from "../models/PowerSupply.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const psus = await PowerSupply.find();
    res.json(psus);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch power supplies",err });
  }
});

export default router;
