const homecontroller  = require('../app/http/controlles/homecontroller') //! getting data which exported from homecontroller
const authcontroller  = require('../app/http/controlles/authcontroller') //! getting data which exported from authcontroller
const cartcontroller  = require('../app/http/controlles/customer/cartcontroller') //! getting data which exported from cartcontroller
const orderController  = require('../app/http/controlles/customer/orderController') //! getting orders which exported from cartcontroller
const AdminOrderController  = require('../app/http/controlles/admin/orderController') //! getting orders which exported from cartcontroller

/**************************middleware*******************************/
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')


function initRouts(app){
        homecontroller().index  //%# calling the function from homecontroller
        
        app.get('/', homecontroller().index) //* 2nd parameter will give both req and res
       
        app.get('/login', guest, authcontroller().login)   //% view for login
        app.post('/login', authcontroller().postLogin) 
        app.get('/register', guest, authcontroller().register)  //% view for register
        app.post('/register', authcontroller().postRegister)
        app.post('/logout', authcontroller().logout)

        app.get('/cart', cartcontroller().cart) //% view for cart items
        app.post('/update-cart', cartcontroller().update )

/**************************Customer Routs*******************************/

        app.post('/orders', auth, orderController().store )
        app.get('/customer/orders', auth, orderController().index)
       
/**************************Admin Routs*******************************/
        app.get('/admin/orders', admin, AdminOrderController().index)

}
module.exports = initRouts;