import user from "./User.js";

const $login_email = document.querySelector("#login_email");
const $login_password = document.querySelector("#login_password");

// Colocar essas duas funções em outro script.
window.open_login = function open_login() {
    document.getElementById("login-popup").style.display = "block";
    document.getElementById("login").setAttribute("onclick", "close_login()");
}

window.close_login = function close_login() {
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("login").setAttribute("onclick", "open_login()");
}
//

// ?
function signin_response(response) {
    if (response.status == "OK") {

    } else {

    }
}

window.sign_in = async function sign_in() {
    user.email = $login_email.value;
    user.password = $login_password.value;

    let response = fetch("./user/signin/", { method: "POST", body: user });
    signin_response(response);
}