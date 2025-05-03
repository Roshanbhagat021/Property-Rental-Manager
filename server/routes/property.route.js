const express = require("express");
const  authMiddleware = require( "../middleware/authMiddleware.js");
const Property = require( '../model/property.model.js');

const Propertyrouter = express.Router();

// ✅ CREATE a property (already done)
Propertyrouter.post("/create", authMiddleware, async (req, res) => {
    console.log('req: ', req.userId);
  try {
    const newProperty = new Property({
      ...req.body,
      createdBy: req.userId
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Failed to create property", error });
  }
});

// 📖 READ all properties
Propertyrouter.get("/allproperties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties", error });
  }
});




module.exports = {Propertyrouter}
