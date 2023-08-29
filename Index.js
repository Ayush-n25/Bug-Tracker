const express = require("express");
const app = express();
require("./db_connection");
const port = 5000;
const path = require("path");
const Product = require("./db_schema");
const email = require('./nodemailer')
// app.use(express.static());
// import { ContactUs } from './ContactUs';

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./HTML/Index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "./HTML/ContactUS.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./HTML/AbotuUs.html"));
});

app.post("/Signup", async (req, res) => {
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
    await Product.create(newProduct);
    res.send("Added");
  } catch (error) {
    console.log("error", error);
  }
});


app.listen(port, () => {
  console.log("started");
});
