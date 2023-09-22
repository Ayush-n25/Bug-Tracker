
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("./db_schema");
require("./db_connection");
let employee = Product.find({});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const salt = bcrypt.genSalt();
const port = 5000;

app.post("/admin", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const newProduct = new Product({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Username: req.body.Username,
      Person: req.body.Person,
      Password: req.body.Password,
    });
    await newProduct.save();
    res.render("adminHome");
  } catch (error) {
    console.log("error", error);
  }
});
