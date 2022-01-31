function cartcontroller(){
    return {
        cart(req , res){
            res.render('./customer/cart.ejs')
        }
    }
}

module.exports = cartcontroller;