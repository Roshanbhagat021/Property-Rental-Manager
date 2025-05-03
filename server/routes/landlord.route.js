const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const Landlord = require("../model/landlord.model"); 

const landlordRouter = express.Router();

landlordRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Password hashing failed" });
      }

      const landlord = new Landlord({ name, email, password: hash });
      await landlord.save();
      res.status(201).json({ msg: "Landlord registered successfully!", landlord });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

landlordRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const landlord = await Landlord.findOne({ email });

    if (!landlord) {
      return res.status(400).json({ msg: "Landlord does not exist" });
    }

    bcrypt.compare(password, landlord.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: landlord._id, user: landlord.name },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          msg: "Logged In!",
          token,
          name: landlord.name,
          role: "landlord"
        });
      } else {
        res.status(400).json({ msg: "Wrong password!" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { landlordRouter };
