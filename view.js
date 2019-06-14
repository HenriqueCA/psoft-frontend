function openLogin() {
    document.getElementById("login-popup").style.display = "block";
    document.getElementById("login").setAttribute("onclick", "closeLogin()");
}

function closeLogin() {
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("login").setAttribute("onclick", "openLogin()");
}