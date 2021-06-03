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
