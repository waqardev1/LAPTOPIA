import mongoose from "mongoose";
const cpuCoolerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rpm: [Number],
  noise_level: Number,
  color: String,
  size: Number
});
export default mongoose.model("CpuCooler", cpuCoolerSchema);
