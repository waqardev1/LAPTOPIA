import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import all route files
import authRoutes from './routes/auth.js';
import recommendationRoutes from './routes/recommendations.js';
import laptopRoutes from './routes/laptops.js';
import savedLaptopsRoutes from './routes/savedLaptops.js';
import cpuRoutes from './routes/cpus.js';
import cpuCoolerRoutes from './routes/cpuCoolers.js';
import motherboardRoutes from './routes/motherboards.js';
import memoryRoutes from './routes/memory.js';
import storageRoutes from './routes/storage.js';
import caseRoutes from './routes/cases.js';
import powerSupplyRoutes from './routes/powerSupplies.js';
import operatingSystemRoutes from './routes/operatingSystems.js';
import monitorRoutes from './routes/monitors.js';
import videoCardRoutes from './routes/videoCards.js';
import geminiRouter from './routes/gemini.js';
import imageRecommendationRoutes from './routes/imageRecommendation.js';


const app = express();
const PORT1 =5000
const MONGO_URI= `mongodb://127.0.0.1:27017/laptopia`
// CORS middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ['GET', "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/image-recommendation', imageRecommendationRoutes);

// Register routes
app.use('/api/gemini', geminiRouter);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/laptops', laptopRoutes);
app.use('/api/saved-laptops', savedLaptopsRoutes);
app.use('/api/cpus', cpuRoutes);
app.use('/api/cpu-coolers', cpuCoolerRoutes);
app.use('/api/motherboards', motherboardRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/power-supplies', powerSupplyRoutes);
app.use('/api/operating-systems', operatingSystemRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/video-cards', videoCardRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Server start
const PORT = PORT1 || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
