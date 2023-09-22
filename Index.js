const express = require("express");
const bcrypt = require('bcrypt')
const querystring = require('querystring')
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("./db_schema");
require("./db_connection");
// const salt = require('./passwordhash')
const Signup = require('./Signup')
let employee = Product.find({})
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
const port = 5000;


app.get("/", function (req, res) {
  res.render('index')
});

app.get('/contact', (req, res)=>{
  res.render("ContactUS");
//   console.log('hi')
//   async function mainMail(Name, Email, Phone, Subject, Message) {
//     console.log('hi1')
//     const transporter = await nodemail.createTransport({
//       service: "gmail",
//       auth: {
//         type: 'OAuth2',
//         user: 'aaliyah.auer@ethereal.email',
//         pass: '3qrxZ1vsU9kyUNEdqA'
//       },
//     });
//     const mailOption = {
//       from: "aaliyah.auer@ethereal.email",
//       to: "susie.shields41@ethereal.email",
//       subject: Subject,
//       html: `You got a message from '
//       Email : ${Email}
//       Name: ${Name}
//       Message: ${Message}`,
//     };
//     try {
//       console.log('hi5')
//       await transporter.sendMail(mailOption);
//       console.log('success')
//       return Promise.resolve("Message Sent Successfully!");
//     } catch (error) {
//       console.log('error')
//       return Promise.reject(error);
//     }
//   }
//   console.log(req.query)
//   const { Name, Email, Phone, Subject, Message } = req.query;
//   try {
//     await mainMail(Name, Subject, Phone, Subject, Message);
//     res.send("Message Successfully Sent!");
//   } catch (error) {
//     res.send("Message Could not be Sent");
//   }
})

app.get("/about", (req, res) => {
  res.render("AboutUs");
});

app.post("/admin", async (req, res) => {
  // const passwordhash = bcrypt
  //   .genSalt(10)
  //   .then(() => {
  //     return bcrypt.hash(req.body.Password, passwordhash);
  //   })
  //   .catch((error) => console.log("error is there", error));
  // const PasswordHash = passwordhash.then((hash)=>{
  //   return hash.toString();
  // }).catch((error)=>console.log("error generated", error))
 
  try {
    const newProduct = new Product({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Username: req.body.Username,
      Person: req.body.Person,
      Password: req.body.Password
    });
    await newProduct.save();
    res.render("admin_Project_Details");
  } catch (error) {
    console.log("error", error);
  }
  // res.render('Signup')
});

app.post("/admin_project", async (req, res) => {
  try {
    // check if the user exists
    const user = await Product.findOne({ Username: req.body.Username });
    if (user) {
      //check if password matches
      const result = req.body.Password === user.Password;
      if (result) {
        res.render("admin_Project_Details");
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ "some error": error });
  }
});

app.get('/notification', (req, res)=>{
  res.render('notification')
})

app.get("/forgotpassword", (req, res)=>{
  res.render("forgotpassword");
});

app.listen(port, () => {
  console.log("started");
});
