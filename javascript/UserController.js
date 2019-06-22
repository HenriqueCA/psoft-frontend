import user from "./User.js";

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

$login_form.onclick = open_login;
$signup_form.onclick = open_signup;

$login_button.onclick = sign_in;
$signup_button.onclick = sign_up;

$close[0].onclick = close_forms;
$close[1].onclick = close_forms;

$fname.onkeyup = validate_signup;
$lname.onkeyup = validate_signup;
$email.onkeyup = validate_signup;
$password.onkeyup = validate_signup;
$confirm_password.onkeyup = validate_signup;

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


// ?
function signin_response(response) {
    if (response.status == "OK") {

    } else {

    }
}

async function sign_in() {
    user.email = $login_email.value;
    user.password = $login_password.value;

    let response = await fetch("/user/signin/", { method: "POST", body: user });
    signin_response(response);
}

function signup_response(response){
    if(response.status == "OK") {

    } else{

    }
}

async function sign_up() {
    user.fname = $fname.value;
    user.lname = $lname.value;
    user.email = $email.value;
    user.password = $password.value;
    let response = await fetch("/user/", { method: "POST", body: user });
    signup_response(response);
}
