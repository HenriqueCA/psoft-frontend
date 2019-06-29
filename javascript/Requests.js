
async function post_request(endpoint, body) {
    let string_body = JSON.stringify(body);

    let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: string_body
    });

    return response;

}

async function get_request(endpoint, params = "") {
    let response = await fetch(endpoint + params, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export {post_request,get_request};