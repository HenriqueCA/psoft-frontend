import { sign_in, sign_up } from "../controllers/UserController.js";

// Pega os elementos do DOM.
const $login_form = document.querySelector("#login");
const $signup_form = document.querySelector("#signup");
const $login_popup = document.querySelector("#login_popup");
const $signup_popup = document.querySelector("#signup_popup");
const $login_button = document.querySelector("#login_button");
const $signup_button = document.querySelector("#signup_button");

const $login_email = document.querySelector("#login_email");
const $login_password = document.querySelector("#login_password");

const $fname = document.querySelector("#fname");
const $lname = document.querySelector("#lname");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $confirm_password = document.querySelector("#confirm_password");

const $close = document.querySelectorAll(".close_popup");

const $ranking = document.querySelector("#ranking");

// Coloca funções para alguns elementos.
$login_form.onclick = open_login;
$signup_form.onclick = open_signup;

$login_button.onclick = login;
$signup_button.onclick = register;

$close[0].onclick = close_forms;
$close[1].onclick = close_forms;

$fname.onkeyup = validate_signup;
$lname.onkeyup = validate_signup;
$email.onkeyup = validate_signup;
$password.onkeyup = validate_signup;
$confirm_password.onkeyup = validate_signup;

/**
 * Clica no botão caso enter seja apertado.
 */
$login_password.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $login_button.click();
    }
})

$confirm_password.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $signup_button.click();
    }
})

// Pega o token do localStorage.
var user_token = window.localStorage.getItem("token");

validate_token(user_token);

/**
 * Verifica se o token está vazio, modificando alguns elementos caso não esteja.
 * @param {string} token o token.
 */
function validate_token(token) {
    if (token != "") {
        $ranking.hidden = false;
        $login_form.innerHTML = "Sair";
        $login_form.onclick = logout;
    }
}

/**
 * Se clicar fora do formulario de login ou cadastro, fecha-o.
 */
window.addEventListener('click', function (e) {
    if (!($login_popup.contains(e.target) || $signup_popup.contains(e.target) || $login_form.contains(e.target))) {
        close_forms();
    }
});

/**
 * Verifica se os campos estão válidos.
 */
function validate_signup() {
    let fname = $fname.value;
    let lname = $lname.value;
    let email = $email.value;
    let password = $password.value;
    let confirm_password = $confirm_password.value;
    if (fname != "" && lname != "" && email != "" && password != "" && password == confirm_password) {
        $signup_button.disabled = false;
    }
    else {
        $signup_button.disabled = true;
    }
}

/**
 * Abre o formulário de login.
 */
function open_login() {
    $signup_popup.hidden = true;
    $login_popup.hidden = false;
}

/**
 * Abre o formulário de cadastro.
 */
function open_signup() {
    $login_popup.hidden = true;
    $signup_popup.hidden = false;
}

/**
 * Fecha os formulários.
 */
function close_forms() {
    $login_popup.hidden = true;
    $signup_popup.hidden = true;
}

/**
 * Desloga, resetando o token no localStorage para vazio e levando para a página inicial.
 */
function logout() {
    window.localStorage.setItem("token", "");
    document.location.href = "../../html/index.html";
    $ranking.hidden = true;
}

/**
 * Faz o login de um usuário.
 */
async function login() {
    let response = await sign_in($login_email, $login_password);
    signin_response(response);
}

/**
 * Faz o cadastro de um usuário.
 */
async function register() {
    let response = await sign_up($email, $fname, $lname, $password);
    signup_response(response);
}

/**
 * De acordo com a resposta de um login, dá um alerta e seta o token.
 * @param {Promise} response a resposta da requisição.
 */
async function signin_response(response) {
    if (response.status == 200) {
        alert("Bem Vindo!");
        close_forms();
        let token = response.headers.get('Authorization');
        window.localStorage.setItem("token", token);
        document.location.href = "../../html/index.html";

    }
    else {
        alert("Seu login está errado ou você não tem conta.");
    }
}

/**
 * De acordo a resposta do cadastro, dá um alerta.
 * @param {Promise} response a resposta da requisição.
 */
async function signup_response(response) {
    let response_text = await response.text();
    if (response.status == 200) {
        let data = JSON.parse(response_text);
        alert(data.msg);
        close_forms();
    } else {
        alert("Não foi possível completar o cadastro.");
    }
}