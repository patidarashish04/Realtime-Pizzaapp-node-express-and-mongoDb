require('dotenv').config()
//console.log(process.env) 
const express = require("express")
//var cookieParser = require('cookie-parser');
const app = express()
const ejs = require('ejs')  //! import template engin 
const path = require("path")   //!  nodejs module import
const expressLayouts = require('express-ejs-layouts')   //! import layouts
const mongoose = require('mongoose')   //! connect to mongodb compass
const session = require('express-session')  //! import session library 
var logger = require('morgan')
const cors = require('cors');
//const cookieSession = require('cookie-session')
const flash = require('express-flash')  //! initialize flash
const MongoDbStore = require('connect-mongo')(session) //! import mongo db store and pass session
//MongoDbStore(session); //@  second way to call functiion
const PORT =process.env.PORT || 3000

//# Database connection
const url = 'mongodb://localhost/pizza';
// Create the database connection 
mongoose.connect(url); 
const connection = mongoose.connection;

//# CONNECTION EVENTS
//^ When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + url);
}); 
  
//^ If the connection throws an error
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose default connection error: ' + err);
}); 

//^ When the connection is disconnected
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});

//^ If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

/*********************** Session Store********************************/

let mongoStore = new MongoDbStore({    //% if we have call class or constrution function we use new keyword
  mongooseConnection: connection,
  collection: 'sessions'               //* it will create a table in database to store the session in database.
})

/********************** Configration for Sessions *******************************/

app.use(session({

  secret:process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized:false,
  cookie:{ maxAge: 1000  * 60  * 60 * 24 }


}))


app.use(flash())
//app.use(cookieParser());

//* Assets 
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true })); 
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

//Global middleware
app.use((req, res ,next) =>{
  res.locals.session = req.session
  next()
})

//# set template engin
app.use(expressLayouts)
app.set("views", path.join(__dirname, "/resources/views"))  //* getting views path
app.set('view engine', "ejs")

//! connect to controller
require('./routes/web')(app)


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

