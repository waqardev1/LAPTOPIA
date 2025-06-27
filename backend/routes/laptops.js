import express from 'express';
import Laptop from '../models/Laptop.js';

const router = express.Router();

// GET all saved laptops
router.get('/', async (req, res) => {
  try {
    const laptops = await Laptop.find().sort({ createdAt: -1 });
    res.status(200).json(laptops);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch laptops' });
  }
});

// POST a new laptop with preferences and user info
router.post('/', async (req, res) => {
  try {
    const {
      name,
      specs,
      price,
      image,
      storeLink,
      reason,
      preferencesSource,
      preferences,
      userId
    } = req.body;

    if (!preferences || !preferencesSource || !userId) {
      return res.status(401).json({ success: false, message: 'Login required or missing info' });
    }

    const newLaptop = new Laptop({
      name,
      specs,
      price,
      image,
      storeLink,
      reason,
      preferencesSource,
      preferences,
      userId
    });

    await newLaptop.save();
    res.status(201).json({ success: true, message: 'Laptop saved successfully', laptop: newLaptop });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// DELETE laptop by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Laptop.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Laptop not found' });
    }
    res.status(200).json({ success: true, message: 'Laptop deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete laptop', error });
  }
});

export default router;
