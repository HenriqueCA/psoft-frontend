function open_login() {
    document.getElementById("login-popup").style.display = "block";
    document.getElementById("login").setAttribute("onclick", "close_login()");
}

function close_login() {
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("login").setAttribute("onclick", "open_login()");
}

function change_signup_button($signup_button,password,confirm_password){
    if (password == confirm_password){
        $signup_button.disabled = false;
    }
    else{
        $signup_button.disabled = true;
    }
}
