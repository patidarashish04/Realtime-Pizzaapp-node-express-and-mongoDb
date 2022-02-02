const homecontroller  = require('../app/http/controlles/homecontroller') //! getting data which exported from homecontroller
const authcontroller  = require('../app/http/controlles/authcontroller') //! getting data which exported from authcontroller
const cartcontroller  = require('../app/http/controlles/customer/cartcontroller') //! getting data which exported from cartcontroller

function initRouts(app){
        homecontroller().index  //%# calling the function from homecontroller
        
        app.get('/', homecontroller().index) //* 2nd parameter will give both req and res
       
        app.get('/login', authcontroller().login)   //% view for login
        app.get('/register', authcontroller().register)  //% view for register
     
        app.get('/cart', cartcontroller().cart) //% view for cart items
        app.post('/update-cart', cartcontroller().update )
}

module.exports=initRouts;