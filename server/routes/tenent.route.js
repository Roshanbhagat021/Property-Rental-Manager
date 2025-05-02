const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tenant = require("../model/tenent.model"); 

const tenantRouter = express.Router();


tenantRouter.post("/register", async (req, res) => {
  const { name, email, password, occupation, aadhaarNo, cibilScore } = req.body;

  try {
    const existing = await Tenant.findOne({ email });
    if (existing) {
      return res.status(409).json({ msg: "Tenant already exists with this email." });
    }

    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Password hashing failed." });
      }

      const tenant = new Tenant({
        name,
        email,
        password: hash,
        occupation,
        aadhaarNo,
        cibilScore
      });

      await tenant.save();
      res.status(201).json({ msg: "Tenant registered successfully!", tenant });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


tenantRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const tenant = await Tenant.findOne({ email });

    if (!tenant) {
      return res.status(400).json({ msg: "Tenant does not exist" });
    }

    bcrypt.compare(password, tenant.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ tenantID: tenant._id, name: tenant.name }, "helloji");
        res.status(200).json({
          msg: "Logged in successfully!",
          token,
          name: tenant.name,
          occupation: tenant.occupation
        });
      } else {
        res.status(400).json({ msg: "Incorrect password!" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { tenantRouter };
