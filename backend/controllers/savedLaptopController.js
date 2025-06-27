// controllers/savedLaptopController.js
import SavedLaptop from "../models/SavedLaptop.js";

// POST /api/saved-laptops
export const saveLaptop = async (req, res) => {
  try {
    const userId = req.user._id; // set by auth middleware
    const { laptop, preferences, preferencesSource } = req.body;

    if (!laptop || !preferences)
      return res.status(400).json({ error: "Missing required fields" });

    const saved = new SavedLaptop({
      userId,
      laptop,
      preferences,
      preferencesSource: preferencesSource || "basic",
    });
    await saved.save();

    res.status(201).json({ message: "Laptop saved", saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/saved-laptops
export const getSavedLaptops = async (req, res) => {
  try {
    const userId = req.user._id;
    const laptops = await SavedLaptop.find({ userId });
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/saved-laptops/:id
export const deleteSavedLaptop = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const deleted = await SavedLaptop.findOneAndDelete({ _id: id, userId });
    if (!deleted) return res.status(404).json({ error: "Laptop not found or not yours" });

    res.json({ message: "Laptop removed", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
