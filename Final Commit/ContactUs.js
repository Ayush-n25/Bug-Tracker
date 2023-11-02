const express = require("express");
const app = express();
const port = 5000
const host = 'localhost';
const path = require('path');
// app.use(express.static(path.join(__dirname, './HTML/ContactUS.html')))

app.get('/contact', (req, res) => {
     res.sendFile(path.join(__dirname, "./HTML/ContactUS.html"));
     console.log(path.join(__dirname, "./HTML/ContactUS.html"));
})

app.listen(port, ()=>{
    console.log('Started') 
})
