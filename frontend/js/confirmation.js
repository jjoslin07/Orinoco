let thankYouName = document.querySelector('.thankYouName');
thankYouName.innerHTML = ' ' + sessionStorage.getItem('firstName') + '!';
let totalCost = document.getElementById('totalCost');
let orderId = document.getElementById('orderId');
totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('price');
orderId.innerHTML = sessionStorage.getItem('orderId');
document.getElementById('returnToHomePage').addEventListener('click', eraseSessionStorage);
function eraseSessionStorage() {
    sessionStorage.removeItem('orderId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('price');
    localStorage.removeItem('cart');
    location.replace('index.html');
}