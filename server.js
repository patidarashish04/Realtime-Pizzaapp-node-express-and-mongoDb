require('dotenv').config()
const express = require("express")

const app = express()
const ejs = require('ejs')  //! import template engin 
const path = require("path")   //!  nodejs module import
const expressLayouts = require('express-ejs-layouts')   //! import layouts


//# set template engin
app.use(expressLayouts)
app.set("views", path.join(__dirname, "/resources/views"))  //* gaetting views path
app.set('view engine', "ejs")

//! connect to controller
require('./routes/web')(app)
//! connect to mongodb compass
const mongoose = require('mongoose')

//# Database connection
const url = 'mongodb://localhost/pizza';
// Create the database connection 
mongoose.connect(url); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + url);
}); 
  
// If the connection throws an error
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

//* Assets 
app.use(express.static('Public'));

const PORT =process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
}) 
