/**
 * This function is used to make an Api request from the backend-server
 */

makeRequest = () => {
    return fetch("http://localhost:3000/api/teddies")
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(response => {
            createCard(response)
        })
        .catch(function (error) {
            alert(
                "We\'re sorry the server is unavailable"
            )
        })
}

callForApi = async () => {
    const requestPromise = makeRequest();
    const response = requestPromise;
}

callForApi();

/**
 *  This function will be used to create the product cards dynamically on the home page
 */

createCard = (response) => {
    const section = document.querySelector('#productSection');
    for (let i in response) {
        const card = document.createElement('article');
        const cardImage = document.createElement('div');
        const cardBody = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6','my-2', 'd-flex');
        cardImage.classList.add('card', 'mx-auto', 'p-auto', 'productCard');
        cardBody.classList.add('card-body', 'text-center', 'mx-auto');
        cardImage.innerHTML += '<img class="mx-auto img-top img-fluid rounded-top" style="object-fit:cover; height:100%; width:100%" id="cardImages" src="' + response[i].imageUrl + '"/>';
        cardBody.innerHTML += '<div class="cvp"> <h5 class="card-title font-weight-bold">' + response[i].name + '</h5> <p class="card-description text-justify">' + response[i].description +
        '</p> <p class="card-price d-flex justify-content-center">' + '$' + response[i].price / 100 + '</p>' + '<a href="product.html?id=' + response[i]._id +
        ' "class="btn details rounded stretched-link"> View' + ' ' + response[i].name + '  </a> </div>';
        card.appendChild(cardImage);
        cardImage.appendChild(cardBody);
        section.appendChild(card);
    }
}

/**
 * Function to update items number in shopping cart.
 */
 addNumCart = () => {
    const localStorageContent = localStorage.getItem('cart');
    if (localStorageContent) {
        let cartItemsArray = JSON.parse(localStorageContent);
        let cartItemsTotal = document.querySelector('.cartItemsTotal');
        cartItemsTotal.innerHTML = cartItemsArray.length;
    }
}
addNumCart();
