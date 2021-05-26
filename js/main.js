// This is a function to make an api request
makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    // If ready state and status return success codes, resolve promise with response
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    // If unsuccessful, reject with error message
                    reject('Server not avaiable!');
                }
            }
        }
    });
}