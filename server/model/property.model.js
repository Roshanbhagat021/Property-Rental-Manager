const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'condo', 'studio'],
    required: true
  },
  amenities: [String],
  imageUrls: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
  versionKey:false
});

const Property = mongoose.model("Property", propertySchema);

module.exports= Property;
