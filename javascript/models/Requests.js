
/**
 * Faz uma requisição POST para a API, passando um corpo e retornando a resposta.
 * @param {string} endpoint endpoint para fazer a requisição.
 * @param {string} body corpo da requisição.
 */
async function post_request(endpoint, body) {
    let string_body = JSON.stringify(body);

    let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: string_body
    });

    return response;

}

/**
 * Faz uma requisição GET para a API, retornando a resposta.
 * @param {string} endpoint endpoint para fazer a requisição.
 * @param {string} params parâmetros opcionais da requisição.
 */
async function get_request(endpoint, params = "") {
    let response = await fetch(endpoint + params, {
        method: 'GET',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    return response;
}

/**
 * Faz uma requisiçãop DELETE para a api, retornando a resposta.
 * @param {string} endpoint endpoint para fazer a requisição.
 * @param {string} params parâmetros opcionais da requisição
 */
async function delete_request(endpoint, params = "") {
    let response = await fetch(endpoint + params, {
        method: 'DELETE',
        headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    return response;
}

export { post_request, get_request, delete_request };