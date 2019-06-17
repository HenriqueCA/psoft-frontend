const user = {
    fname: null,
    lname: null,
    email: null,
    first_password: null
};

const $fname = document.querySelector("#fname");
const $lname = document.querySelector("#lname");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $confirm_password = document.querySelector("#confirm_password");
const $signup_button = document.querySelector("#signup_button")

function validate_password() {
    password = $password.value;
    confirm_password = $confirm_password.value;
    change_signup_button($signup_button, password, confirm_password);
}

async function sign_up() {
    user.fname = $fname.value;
    user.lname = $lname.value;
    user.email = $email.value;
    user.password = $password.value;
    let response = await fetch("/user/", {method:"POST", body:user});
}


