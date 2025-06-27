import mongoose from "mongoose";
const memorySchema = new mongoose.Schema({
  name: String,
  price: Number,
  speed: [Number],
  modules: [Number],
  price_per_gb: Number,
  color: String,
  first_word_latency: Number,
  cas_latency: Number
});
export default mongoose.model("Memory", memorySchema);
