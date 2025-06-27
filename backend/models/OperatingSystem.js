import mongoose from "mongoose";
const operatingSystemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  mode: Number,
  max_memory: Number
});
export default mongoose.model("OperatingSystem", operatingSystemSchema);
