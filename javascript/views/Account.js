import {sign_in,sign_up} from "../controllers/UserController.js";

const $login_form = document.querySelector("#login");

const $login_email = document.querySelector("#login_email");
const $login_password = document.querySelector("#login_password");

const $login_button = document.querySelector("#login_button");
const $login_popup = document.querySelector("#login_popup");

const $signup_form = document.querySelector("#signup");
const $signup_popup = document.querySelector("#signup_popup");

const $fname = document.querySelector("#fname");
const $lname = document.querySelector("#lname");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $confirm_password = document.querySelector("#confirm_password");
const $signup_button = document.querySelector("#signup_button");

const $close = document.querySelectorAll(".close_popup");

const $ranking = document.querySelector("#ranking");

$login_form.onclick = open_login;
$signup_form.onclick = open_signup;

$close[0].onclick = close_forms;
$close[1].onclick = close_forms;

$fname.onkeyup = validate_signup;
$lname.onkeyup = validate_signup;
$email.onkeyup = validate_signup;
$password.onkeyup = validate_signup;
$confirm_password.onkeyup = validate_signup;

$login_button.onclick = async function (){
    let response = await sign_in($login_email, $login_password);
    signin_response(response);
};

$signup_button.onclick = async function() {
    let response = await sign_up($email, $fname, $lname, $password); 
    signup_response(response);   
};

var user_token = window.localStorage.getItem("token");

validate_token(user_token);

function validate_token(token) {
    if (token != "") {
        $ranking.hidden = false;
        $login_form.innerHTML = "Sair";
        $login_form.onclick = logout;
    }
}

window.addEventListener('click', function (e) {
    if (!($login_popup.contains(e.target) || $signup_popup.contains(e.target) || $login_form.contains(e.target))) {
        close_forms();
    }
});

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

function open_login() {
    $signup_popup.hidden = true;
    $login_popup.hidden = false;
}

function open_signup() {
    $login_popup.hidden = true;
    $signup_popup.hidden = false;
}

function close_forms() {
    $login_popup.hidden = true;
    $signup_popup.hidden = true;
}

function logout() {
    window.localStorage.setItem("token", "");
    document.location.href = "../../html/index.html";
    $ranking.hidden = true;
}

async function signin_response(response) {
    if (response.status == 200) {
        alert("Bem Vindo!");
        close_forms();
        let token = response.headers.get('Authorization');
        window.localStorage.setItem("token", token);
        document.location.href= "../../html/index.html";

    }
    else {
        alert("Seu login está errado ou você não tem conta.");
    }
}

async function signup_response(response) {
    let response_text = await response.text();
    let data = JSON.parse(response_text);
    alert(data.msg);
    if (response.status == 200) {
        close_forms();
    }
}