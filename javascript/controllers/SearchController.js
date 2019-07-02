const $search_text = document.querySelector("#search_text");
const $search_button = document.querySelector("#search_button");

$search_button.onclick = search;

async function search_substring(search_text) {
    document.location.href = "../../html/search.html?search=" + search_text;
}

async function search_code(search_id) {
    document.location.href = "../../html/discipline.html?id=" + search_id;
}

function decide_search(search_text) {
    if (isNaN(search_text) || search_text == "") {
        search_substring(search_text);
    }
    else {
        search_code(search_text);
    }
}

function search() {
    let search_text = $search_text.value;
    decide_search(search_text)
}