const express = require("express")

const app = express()
const ejs = require('ejs')  //! import template engin 
const path = require("path")   //!  nodejs module import
const expressLayouts = require('express-ejs-layouts')   //! import layouts





//# set template engin
app.use(expressLayouts)
app.set("views", path.join(__dirname, "/resources/views"))  //* gaetting views path
app.set('view engine', "ejs")



app.get('/',(req, res)=>{        //* for set the page
    res.render('home')   //% views folder file name access
    })
    
    app.get('/cart', (req , res)=>{
        res.render('customer/cart')  //% view for cart items
    })
    
//* Assets 
app.use(express.static('Public'));

const PORT =process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
}) 
