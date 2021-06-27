'use strict';

let thankYouName = document.querySelector('.thankYouName');

thankYouName.innerHTML = ' ' + sessionStorage.getItem('firstName') + '!';

// Dom Element References 
let totalCost = document.getElementById('totalCost');
let orderId = document.getElementById('orderId');

// Shows total cost of order and order ID
totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('price');
orderId.innerHTML = sessionStorage.getItem('orderId');

// remove the item from localStorage and sessionStorage
document.getElementById('returnToHomePage').addEventListener('click', eraseSessionStorage);
function eraseSessionStorage() {
    sessionStorage.removeItem('orderId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('price');
    localStorage.removeItem('cart');
    location.replace('index.html');
};