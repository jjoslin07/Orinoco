let orderId;

let localStorageContent = localStorage.getItem('cart');
let cartItemsArray = JSON.parse(localStorageContent);

/**
 * Update cart number in navigation menu
 */
function addNumCart() {
    if (localStorageContent) {
        let cartItemsTotal = document.querySelector('.cartItemsTotal');
        cartItemsTotal.innerHTML = cartItemsArray.length;
    }
}

addNumCart();

(function () {

    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('not valid');
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('true');
                    let products = [];
                    let cartArray = JSON.parse(localStorage.getItem('cart'));
                    for (let i = 0; i < cartArray.length; i++) {
                        products.push(cartArray[i].id);
                    }
                    let firstName = document.getElementById('firstName');
                    let lastName = document.getElementById('lastName');
                    let email = document.getElementById('email');
                    let address = document.getElementById('address');
                    let country = document.getElementById('country');
                    let city = document.getElementById('city');
                    let zip = document.getElementById('zip');
                    let contact = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        address: address.value,
                        country: country.value,
                        city: city.value,
                        zip: zip.value,
                    };
                    let data = {
                        contact: contact,
                        products: products,
                    };
                    makeRequest(data);
                    sessionStorage.setItem('firstName', contact.firstName);
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

/**
 * Function to display shopping cart
 */
function displayCart() {
    let localStorageContent = localStorage.getItem('cart');
    let cartItemsArray = JSON.parse(localStorageContent);
    if (cartItemsArray) {
        for (let i = 0; i < cartItemsArray.length; i++) {

            let cart = document.getElementById('shoppingCart');
            let cartItem = document.createElement('li');

            cartItem.classList.add('cart-row', 'list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
            cartItem.style.height = '75px';

            let item = document.createElement('div');
            item.classList.add('w-50');
            item.innerHTML = '<p class="my-0">' + cartItemsArray[i].name + '</p> <small class="text-muted">' + cartItemsArray[i].selectColors + '</small>';

            let cost = document.createElement('div');
            cost.classList.add('w-25');
            cost.style.marginTop = '12px';
            cost.innerHTML = '<p class="cart-price text-bold">' + '$' + cartItemsArray[i].price / 100 + '</p>';

            let removeButton = document.createElement('button');
            removeButton.setAttribute('type', 'button');
            removeButton.classList.add('btn','my-2', 'py-1', 'px-2', 'remove');
            removeButton.setAttribute('aria-label', 'remove');
            removeButton.innerHTML = '<i class="bi bi-dash-square"></i>';
            removeButton.onclick = function removeItem() {
                let cartItemsArray = JSON.parse(localStorage.getItem('cart'));
                cartItemsArray.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cartItemsArray));
                location.reload();
            };

            cart.appendChild(cartItem);
            cartItem.appendChild(item);
            cartItem.appendChild(cost);
            cartItem.appendChild(removeButton);
        }
    }
}

displayCart();

/**
 * Function to calculate total cost of the items in the cart and return the total.
 */
function updateCartTotal() {
    let total = document.getElementById('totalCost');
    let totalCost = 0;
    for (let i = 0; i < cartItemsArray.length; i++) {
        totalCost += cartItemsArray[i].price / 100;
    }
    total.innerHTML = '$' + totalCost;

    sessionStorage.setItem('price', totalCost);
}

updateCartTotal();

/**
 * Send inforamtion from user to api go to confirmation page
 * 
 * @param {*} data 
 */
function makeRequest(data) {
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        orderId = data.orderId;
        sessionStorage.setItem("orderId", orderId);
        console.log(orderId);
        location.replace('confirmation.html');

    }).catch(function (err){
        console.log(err);
    });
}