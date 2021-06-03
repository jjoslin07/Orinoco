// This function is used to make an Api request from the backend-server

makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    // If apiRequest.readyState and apiRequest.status return 
                    // success codes resolve Promise with response.
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('We\'re sorry the server is unavailable');
                    // Else reject and display error message
                }
            }
        }
    })
}

// This function will be used to create the product cards dynamically on the home page

createCard = (response) => {
    const section = document.querySelector('#productSection');
    for (let i in response) {
        // Create product card elements
        const article = document.createElement('article');
        const productCard = document.createElement('div');
        const cardBody = document.createElement('div');
        // Add classes to card elements
        article.classList.add('container-fluid','col-sm-3', 'my-2');
        productCard.classList.add('card', 'mx-auto', 'mt-5');
        cardBody.classList.add('card-body', 'text-center', 'mx-auto');
        // Build out the product card using the Teddies API
        productCard.innerHTML += '<img src="' + response[i].imageUrl + '"alt="" class="rounded-top mx-auto img-top img-fluid" style="min-height:200px;width:auto;overflow:hidden;" />';
        cardBody.innerHTML += '<h5 class="card-name">' + response[i].name + '</h5> <p class="card-description text-justify">' + response[i].description + '</p> <p class="card-price">' + '$' + response[i].price / 100 + '</p>' + '<a href="product.html?!id=' + response[i]._id + ' "class="btn details">view details</a>';
        // Append completed elemnts to the card
        article.appendChild(productCard);
        productCard.appendChild(cardBody);
        section.appendChild(article);
    }
}

init = async () => {
    // Call makeRequest for Api request and "await" response
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
    // Pass responese to createCard function to display results
        createCard(response);
    }   catch (error) {
    // Display error message if request fails
        document.getElementById('productSection').innerHTML = '<h2 class = "mx-auto text-center">' + error + '</h2>';        
    }
}

init ();