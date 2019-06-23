const $disciplines_section = document.querySelector("#disciplines");

var url_params = new URLSearchParams(window.location.search);

var substring = url_params.get("substring");

list_disciplines(substring);

async function list_disciplines(substring){
    let response = await fetch("/disciplines/", { method: "POST", body: substring });
    // for every discipline returned, create element <a> with href and append to $disciplines_section.
}