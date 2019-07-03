import user from "../models/User.js";
import endpoints from "../models/Endpoints.js";
import { post_request } from "../models/Requests.js";

/**
 * Faz uma requisição para o login de um usuário, retornando a resposta.
 * @param {HTMLElement} $login_email elemento que tem o email do usuário.
 * @param {HTMLElement} $login_password elemento que tem a senha do usuário.
 */
async function sign_in($login_email, $login_password) {
    delete user.firstName;
    delete user.lastName;
    user.email = $login_email.value;
    user.password = $login_password.value;


    let response = await post_request(endpoints.login(), user);

    return response;

}

/**
 * Faz uma requisição para o cadastro de um usuário, retornando a resposta.
 * @param {HTMLElement} $email elemento com o email a ser cadastrado.
 * @param {HTMLElement} $fname elemento com o primeiro nome a ser cadastrado.
 * @param {HTMLElement} $lname elemento com o último nome a ser cadastrado.
 * @param {HTMLElement} $password elemento com a senha a ser cadastrada
 */
async function sign_up($email, $fname, $lname, $password) {
    user.email = $email.value;
    user.firstName = $fname.value;
    user.lastName = $lname.value;
    user.password = $password.value;

    let response = await post_request(endpoints.register(), user);

    return response;
}

export { sign_in, sign_up };
