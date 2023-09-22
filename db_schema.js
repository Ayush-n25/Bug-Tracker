const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
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
  Person: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    unique: true,
    required: true,
    min: 8,
    max: 20,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/],
  },
});

const Product = mongoose.model('SignUp', ProductSchema)
// function correctPass(user) {
//   const schema = Joi.object().keys({
//     password: Joi.string()
//       .min(8)
//       .required()
//       .max(20)
//       .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), //special/number/capital
//   });
//   return Joi.validate(user, schema);
// }
module.exports = Product