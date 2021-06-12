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
