
async function post_request(endpoint, body) {
    let string_body = JSON.stringify(body);

    let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/json'
        },
        body: string_body
    });
    console.log(response);


    return response;

}

async function get_request(endpoint, params = "") {
    let response = await fetch(endpoint + params, {
        method: 'GET',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/json'
        }
    });

    return response;
}

async function delete_request(endpoint, params = "") {
    let response = await fetch(endpoint + params, {
        method: 'DELETE',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export { post_request, get_request, delete_request };