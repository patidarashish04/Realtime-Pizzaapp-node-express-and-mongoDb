import axios from 'axios'
import flash from 'express-flash'
import Noty from 'noty'

let AddtoCart = document.querySelectorAll('.add-to-cart')
let cartCounter =  document.querySelector('#cartCounter')

function updateCart(pizza) {
axios.post('/update-cart', pizza).then(res => {
cartCounter.innerText = res.data.totalQty
new Noty({
    type: 'success',
    timeout: 1000,
    text: "Item add to cart",
    progressBar: false
  }).show();
}).catch(err =>{
    new Noty({
        type: 'error',
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false
      }).show();
})
}

AddtoCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)  //! getting json string by calling data attribute from home.js and  
        updateCart(pizza)
    })
})
