require('dotenv').config()
const express = require("express")
const app = express()
const ejs = require('ejs')  //! import template engin 
const path = require("path")   //!  nodejs module import
const expressLayouts = require('express-ejs-layouts')   //! import layouts
const mongoose = require('mongoose')   //! connect to mongodb compass
const session = require('express-session')  //! import session library 
const flash = require('express-flash')  //! initialize flash
const MongoDbStore = require('connect-mongo')(session) //! import mongo db store and pass session
//MongoDbStore(session); //@  second way to call functiion

//# set template engin
app.use(expressLayouts)
app.set("views", path.join(__dirname, "/resources/views"))  //* gaetting views path
app.set('view engine', "ejs")



//! connect to controller
require('./routes/web')(app)

//# Database connection
const url = 'mongodb://localhost/pizza';
// Create the database connection 
mongoose.connect(url); 
const connection = mongoose.connection;

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

//# session store 
let mongoStore = new MongoDbStore({   //% if we have call class or constrution function we use new keyword
  mongooseConnection: connection,
  collection: 'sessions'    //* it will create 1 table  in database
})  

// session  config..(to use middleware we have do like this--> app.use())
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

app.use(flash())
//* Assets 
app.use(express.static('Public'));
const PORT =process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})