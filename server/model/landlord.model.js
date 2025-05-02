const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Landlord = mongoose.model("Landlord", landlordSchema);
module.exports = Landlord;
