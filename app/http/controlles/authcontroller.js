function authcontroller(){
    return {
        login(req , res){
            res.render('Auth/login')  //% view for login
        },
        register(req , res){
            res.render('Auth/register')  //% view for register
        }
    }
}

module.exports = authcontroller;