import mongoose from "mongoose";

const cpuSchema = new mongoose.Schema({
  family: String,
  series: String,
  cpuCores: Number,
  threads: Number,
  baseClock: String, // e.g., "3 GHz"
  boostClock: String, // e.g., "Up to 5.1 GHz"
  l3Cache: String,    // e.g., "64 MB"
  tdp: String,        // "Default TDP", e.g., "55W"
  socket: String,     // "CPU Socket"
  graphicsModel: String,
  graphicsCoreCount: Number,
  manufacturer: String,
});

export default mongoose.model("Cpu", cpuSchema);
