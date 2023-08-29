const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    unique: true,
  },
  LastName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  PhoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  Username: {
    type: String,
    unique: true,
    required: true,
    min: 8,
    max: 20,
  },
  Person:{
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    unique: true,
    required: true,
    min: 8,
    max: 20,
  },
});

const Product = mongoose.model('SignUp', ProductSchema)
module.exports = Product