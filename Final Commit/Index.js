const express = require("express");
const bcrypt = require('bcrypt');
let cookieParser = require("cookie-parser");
const session = require("express-session");
const querystring = require('querystring')
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("./db_schema");
const db_schema_subscibe = require("./db_schema_subscibe");
const Add_project = require('./db_add_project')
require("./db_connection");
const saltRounds = 10;
let employee = Product.find({})
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const port = 5000;

app.use(cookieParser());

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: true
}));

let password_data;

app.get("/", function (req, res) {
  
  res.render('Index');
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
  let passhash = req.body.Password + "thisismysecrctekeyfhrgfgrfrty84fwir767";
  try {
    const newProduct = new Product({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Username: req.body.Username,
      Person: req.body.Person,
      Password: passhash
    });
    if(req.body.Person === 'Reviewer' || req.body.Person === 'Solver'){
      await newProduct.save();
      res.cookie("new_user", newProduct);
      res.render("adminHome");
    }else{
      res.send(`You are not allowed to move ahead because either you entered password doesn't matching or the Entered role is not matching because the role must be a Reviewer or a Solver. Please go back and again sign up.` )
    }
  } catch (error) {
    console.log("error", error);
  }
  // res.render('Signup')
});
app.post("/admin_project", async (req, res) => {
  try {
    // check if the user exists
    const user = await Product.findOne({ Username: req.body.Username });
    req.session.user = user;
    req.session.save();
    if(req.session.user.view){
      req.session.user.view++;
        console.log("You visited this page for "
            + req.session.user.view + " times")
    }else{
      req.session.user.view = 1;
        console.log("You have visited this page"
           + " for first time ! Welcome....")
    }
    if (user) {
      //check if password matches
      const result = (req.body.Password +'thisismysecrctekeyfhrgfgrfrty84fwir767') === user.Password;
      if (result) {
        res.render("adminHome");
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

app.post("/subscribe", async (req, res) => {
  console.log("subscribe");
  try {
    let newsubscribe = new db_schema_subscibe({
      new_Email: req.body.newsletter,
    });
    await newsubscribe.save();
    res.redirect("/");
  } catch (error) {
    console.log(error, "Error while subscribing");
  }
});

app.get('/notification', (req, res)=>{
  res.render('notification')
})

app.get('/ProjectDetails', async (req, res)=>{
  let projects=await Add_project.find({});
  console.log(projects);
  res.render('admin_Project_Details', {projects})
})

app.post("/SearchProject", async (req, res) => {
  try {
    const projectdata = await Add_project.findOne({
      ProjectName: req.body.ProjectName,
    });
    res.render("admin_Project_Details", { projectdata });
  } catch (error) {
    console.log(error);
  }
});

app.get('/logs', (req, res)=>{
  res.render('Logs')
})

app.get('/notes', (req, res)=>{
  res.render('notes')
})


app.post("/addProject", async (req, res) => {
  try {
    const add_Project = new Add_project({
      ProjectName: req.body.ProjectName,
      LeaderName: req.body.LeaderName,
      LeaderEmail: req.body.LeaderEmail,
      ProjectDescription: req.body.ProjectDescription,
      Date: req.body.Date,
      NoBugs: req.body.NoBugs,
    });
    await add_Project.save();
    res.redirect("/ProjectDetails");
  } catch (error) {
    console.log(error, "error is there.");
  }
});

app.get('/newProject', (req, res)=>{
  res.render('add_project')
})
app.get("/forgotpassword", (req, res)=>{
  res.render("forgotpassword");
});

app.get('/projects', (req, res)=>{
  
  res.render('admin_Project_Name')
})

app.get('/profile', (req,res)=>{
  res.render('profile')
})

app.get('/view', (req, res)=>{
  res.render('view')
})

app.get('/workPhase', (req, res)=>{
  res.render('admin_project_review')
})

app.get('/chat', (req, res)=>{
  res.render('chat')
})

app.get('/edit', (req, res)=>{
  res.render('edit')
})


app.get("/password/edit", (req, res) => {
  res.render("password_edit");
  // const user = await Product.findOne({ Username: req.body.Username });
  // try {
  //   if (user) {
  //     const result =
  //       req.body.Password + "thisismysecrctekeyfhrgfgrfrty84fwir767" ===
  //       user.Password;
  //     if (result) {
  //       if (req.body.password2 === req.body.confirmPassword) {
  //         let new_pass =
  //           req.body.confirmPassword + "thisismysecrctekeyfhrgfgrfrty84fwir767";
  //           console.log(user.Username);
  //         db.test.updateOne({Password: user.Password}, {$set:{Password:new_pass}})
  //       } else {
  //         console.log(`New Password doesn't match`);
  //       }
  //     } else {
  //       console.log(`Password doesn't find in Database.`);
  //     }
  //   }
  // } catch (error) {
  //   console.log(error, `Password doesn't find in Database.`);
  // }
});

app.get("/Email/edit", (req, res) => {
  res.render("Email_edit");
});

app.get("/PhoneNumber/edit", (req, res) => {
  res.render("Edit_phone_number");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("started");
});
