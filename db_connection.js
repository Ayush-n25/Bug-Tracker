const express = require("express");
const mongoose = require("mongoose");
const Product = require("./db_schema");
// import "./schema";
// import Product from "./schema";
require("dotenv").config();
const app = express();
app.use(express.json());
const URL = process.env.Connection_String;
let db = mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect");
  })
  .catch((error) => {
    console.log(error);
  });


// Inserting Data into the database

// Data
