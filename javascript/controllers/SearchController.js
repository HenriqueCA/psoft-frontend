// Pega o HTMLElement da entrada da pesquisa.
const $search_text = document.querySelector("#search_text");

// Pega o HTMLElement do botão para pesquisar.
const $search_button = document.querySelector("#search_button");

$search_button.onclick = search;

/**
 * Caso aperte ENTER enquanto pesquisa, clica no botão de pesquisar.
 */
$search_text.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $search_button.click();
    }
})

/**
 * Pega o valor do texto de pesquisa.
 */
function search() {
    let search_text = $search_text.value;
    decide_search(search_text)
}

/**
 * Verifica se está sendo buscado uma string ou um id e a partir disso decide o que fazer.
 * @param {string} search_text valor da busca.
 */
function decide_search(search_text) {
    if (isNaN(search_text) || search_text == "") {
        search_substring(search_text);
    }
    else {
        search_code(search_text);
    }
}

/**
 * Leva para a página de pesquisa com o parâmetro sendo a string buscada.
 * @param {string} search_text substring para pesquisar.
 */
function search_substring(search_text) {
    document.location.href = "../../html/search.html?search=" + search_text;
}

/**
 * Leva para o perfil da disciplina com o parâmetro sendo o id passado.
 * @param {string} search_id id de uma disciplina.
 */
function search_code(search_id) {
    document.location.href = "../../html/discipline.html?id=" + search_id;
}