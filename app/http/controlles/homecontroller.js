const menu = require('../../models/menu');
const Menu = require('../../models/menu')
function homecontroller(){
    return {
        index(req , res){
            menu.find().then(function(pizzas){
            return res.render('home', {pizzas: pizzas})
        }) 
    }
  }
}

module.exports = homecontroller;