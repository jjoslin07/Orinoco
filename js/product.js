/**
 * This function is used to make an Api request from the backend-server
 * and display an error message for the user if the server can't be reached
 * or is unavailable.
 */
const qureyString = window.location.search;
const urlParam = new URLSearchParams(qureyString);
const id = urlParam.get('id');
fetch('http://localhost:3000/api/teddies/' + id)
    .then(function (httpBodyResponse) {
        return httpBodyResponse.json();
    })
    .then(function (response) {
        createPage(response);
    })
    .catch(function (error) {
        console.log(error);
        document.getElementById('productImageRow').innerHTML = '<h2 class = "mx-auto mt-5 text-center"> We\'re sorry the server is unavailable</h2>';
    });

/**
 * Function to create the individual product page for each unique id
 */

function createPage(response) {
    const productImage = document.getElementById('productImage');
    const imgCard = document.createElement('div');
    const image = response.imageUrl;
    productImage.classList.add('container-fluid', 'p-0', 'col-xl-6');
    productImage.innerHTML += '<img src="' + image + '" alt="Teddy Bear" class="img-fluid" style="height:100%; width:100%; object-fit:cover;">';
    productImage.appendChild(imgCard);
    const productCard = document.getElementById('productCard');
    const productDescription = document.createElement('div');
    const title = response.name;
    const description = response.description;
    const price = response.price;
    productDescription.classList.add('mx-auto');
    productCard.classList.add('col-xl-6', 'p-0');
    productDescription.innerHTML += '<h1 class="mx-auto shop-item-title w-auto">' + title + '</h1>';
    productDescription.innerHTML += '<p class="lead mx-auto w-auto">' + description + '</p>';
    productDescription.innerHTML += '<p class="lead mx-auto font-weight-bolder">' + '$' + price / 100 + '</p>';
    const dropdownMenuColors = document.createElement('form');
    const dropdownLabelColors = document.createElement('label');
    const dropdownOptionsColors = document.createElement('select');
    dropdownMenuColors.classList.add('my-4');
    dropdownOptionsColors.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-auto');
    dropdownLabelColors.classList.add('font-weight-bold');
    dropdownLabelColors.innerHTML = 'Choose your color&#58; &nbsp;';
    const dropDownMenuQuantity = document.createElement('form');
    const dropDownLabelQuantity = document.createElement('label');
    const dropDownOptionsQuantity = document.createElement('select');
    dropDownMenuQuantity.classList.add('my-4');
    dropDownOptionsQuantity.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-auto');
    dropDownLabelQuantity.classList.add('font-weight-bold');
    dropDownLabelQuantity.innerHTML = 'Quantity&#58; &nbsp;';

    /**
     * Create For loop for dropdown menu "Choose your color"
     */
    for (let i in response.colors) {
        const option = document.createElement('option');
        option.innerHTML = response.colors[i];
        option.setAttribute('value', response.colors[i]);
        dropdownOptionsColors.appendChild(option);
    }
    /**
     * Create Loop for dropdown menu "Quantity"
     */
    const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i in quantity) {
        const optionQuantity = document.createElement('option');
        optionQuantity.innerHTML = quantity[i];
        optionQuantity.setAttribute('value', quantity[i]);
        dropDownOptionsQuantity.appendChild(optionQuantity);
    }

    dropDownMenuQuantity.appendChild(dropDownLabelQuantity);
    dropDownMenuQuantity.appendChild(dropDownOptionsQuantity);
    dropdownMenuColors.appendChild(dropdownLabelColors);
    dropdownMenuColors.appendChild(dropdownOptionsColors);
    const addToCart = document.createElement('button');
    const addedToCartAlert = document.createElement('div');
    addToCart.setAttribute('type', 'submit');
    addToCart.classList.add('btn', 'btn-primary', 'add-to-cart', 'rounded', 'w-75', 'align-self-center', 'my-5');
    addToCart.textContent = 'Add to Cart';

    /**
     * Function that adds item to local storage
     */
    addToCart.addEventListener('click', () => {
        let cartItems = [];
        const localStorageContent = localStorage.getItem('cart');
        if (localStorageContent === null) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(localStorageContent);
        }
        let product = {
            imageUrl: response.imageUrl,
            name: response.name,
            id: response._id,
            price: response.price,
            selectColors: dropdownOptionsColors.value,
            quantity: dropDownOptionsQuantity.value
        };
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));

        addNumCart();
    });

    /**
     * Add alert for items that are added to the cart
     */
    addToCart.onclick = () => {
        addedToCartAlert.classList.add('alert', 'alert-success', 'p-1', 'm-0', 'text-center', 'w-75', 'align-self-center');
        addedToCartAlert.setAttribute('role', 'alert');
        addedToCartAlert.textContent = dropDownOptionsQuantity.value + ' ' + response.name + ' ' + 'with' + ' ' + dropdownOptionsColors.value + ' ' + 'Color' + ' ' + 'added to cart!';
    };
    productCard.appendChild(productDescription);
    productCard.appendChild(dropdownMenuColors);
    productCard.appendChild(dropDownMenuQuantity);
    productCard.appendChild(addToCart);
    productCard.appendChild(addedToCartAlert);
}

/**
 * Function to update items number in shopping cart.
 */
function addNumCart() {
    const localStorageContent = localStorage.getItem('cart');
    if (localStorageContent) {
        let cartItemsArray = JSON.parse(localStorageContent);
        let cartItemsTotal = document.querySelector('.cartItemsTotal');
        cartItemsTotal.innerHTML = cartItemsArray.length;
    }
}
addNumCart();