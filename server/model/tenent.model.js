const mongoose = require("mongoose")

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  occupation: {
    type: String,
    required: true
  },

  aadhaarNo: {
    type: String,
    required: true,
    unique: true,
    length: 12
  },

  cibilScore: {
    type: Number,
    required: true,
    min: 300,
    max: 900
  }
},{
    versionKey:false
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant 