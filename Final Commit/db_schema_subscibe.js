const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscribe = new mongoose.Schema({
     new_Email: {
          type: String,
          unique: true,
          required: true
     }
});

const Subscribe = mongoose.model("subscribe", subscribe);
module.exports = Subscribe;