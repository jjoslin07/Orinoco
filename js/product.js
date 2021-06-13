// This function is used to make an Api request from the backend-server
makeRequest = () => {
    return new Promise((resolve, reject) => {
        const qureyString = window.location.search;
        const urlParam = new URLSearchParams(qureyString);
        // This id constant is used to build the unique url for the each product page
        const id = urlParam.get('id');
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    // If ready state and status return success codes, resolve promise with response
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    // Else, reject with the error message
                    reject('We\'re sorry the server is unavailable');
                }
            }
        }
    });
}

// Function to create the individual product page for each unique id

createPage = (response) => {
    // Create constants for product page image
    const productImage = document.getElementById('productImage');
    const imgCard = document.createElement('div');
    const image = response.imageUrl;
    // Add bootstrap classes for product image
    productImage.classList.add('col-xl-6','rounded', 'img-fluid');
    imgCard.classList.add('rounded')
    // Add product image url
    imgCard.innerHTML += '<img src="' + image + '" alt="" class="img-fluid">';
    // Append completed element to the page
    productImage.appendChild(imgCard);
    // Create constants for product name, description, and price
    const productCard = document.getElementById('productCard');
    const productDescription = document.createElement('div');
    const title = response.name;
    const description = response.description;
    const price = response.price;
    // Add bootstrap classes for product name, description and price
    productDescription.classList.add('mt-4', 'mt-md-0');
    // Add html for product name, description and price
    productDescription.innerHTML += '<h2 class="display-5 m-0 shop-item-title">' + title + '</h2>';
    productDescription.innerHTML += '<p>' + description + '</p>';
    productDescription.innerHTML += '<h3 class="lead shop-item-price">' + '$' + price / 100 + '</p>';
    // Create constants for dropdown menu
    const dropdownMenu = document.createElement('form');
    const dropdownLabel = document.createElement('label');
    const dropdownOptions = document.createElement('select');
    // Add Bootstrap classes for dropdown menu
    dropdownMenu.classList.add('my-4');
    dropdownOptions.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-auto');
    dropdownLabel.innerHTML = 'Choose your color&#58; &nbsp;';
    // Create For loop for dropdown menu "Choose your color"
    for (let i in response.colors) {
        const option = document.createElement('option');
        option.innerHTML = response.colors[i];
        option.setAttribute('value', response.colors[i]);
        dropdownOptions.appendChild(option);
    }
    // Append dropdown menu to page
    dropdownMenu.appendChild(dropdownLabel);
    dropdownMenu.appendChild(dropdownOptions);
    // Create constants for Add to Cart button
    const addToCart = document.createElement('button');
    const addedToCartAlert = document.createElement('div');
    // Add bootstrap classes for add to card button
    addToCart.setAttribute('type', 'submit');
    addToCart.classList.add('btn', 'btn-primary', 'add-to-cart', 'rounded');
    addToCart.textContent = 'ADD TO CART';
    // Function that adds item to local storage
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
            selectColors: dropdownOptions.value,
            quantity: 1
        };
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));

        addNumCart();
    });
    // Add alert for items that are added to the cart
    addToCart.onclick = function () {
        addedToCartAlert.classList.add('alert', 'alert-success', 'mt-4');
        addedToCartAlert.setAttribute('role', 'alert');
        addedToCartAlert.textContent = response.name + ' ' + 'with' + ' ' + dropdownOptions.value + ' ' + 'Color' + ' ' + 'added to cart';
    }
    // Append completed elements to the product page
    productCard.appendChild(productDescription);
    productCard.appendChild(dropdownMenu);
    productCard.appendChild(addToCart);
    productCard.appendChild(addedToCartAlert);
};

init = async () => {
    try {
        //call makeRequest for api request and "await" response
        const requestPromise = makeRequest();
        const response = await requestPromise;
        //pass response to createPage fuction to display results
        createPage(response);
    } catch (error) {
        //error message displayed if request fails
        document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
    }
}

init();