const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10;
const password = "Admin123";
app.get("/hash", (req, res) => {
  let hashpass = bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      console.log("hash", hash);
    })
    .catch((error) => {
      console.log("error", error.message);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
