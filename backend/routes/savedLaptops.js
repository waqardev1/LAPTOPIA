// routes/savedLaptops.js
import express from "express";
import {
  saveLaptop,
  getSavedLaptops,
  deleteSavedLaptop,
} from "../controllers/savedLaptopController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, saveLaptop);
router.get("/", authMiddleware, getSavedLaptops);
router.delete("/:id", authMiddleware, deleteSavedLaptop);

export default router;
