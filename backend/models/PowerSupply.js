import mongoose from "mongoose";
const powerSupplySchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  efficiency: String,
  wattage: Number,
  modular: String,
  color: String
});
export default mongoose.model("PowerSupply", powerSupplySchema);
