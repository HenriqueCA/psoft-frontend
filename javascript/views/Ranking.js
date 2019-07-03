import endpoints from "../models/Endpoints.js";
import get_disciplines from "../controllers/ListDisciplines.js";

// Pega os elementos da DOM.
const $disciplines_list = document.querySelector("#disciplines");
const $button_order_likes = document.querySelector("#order_likes");
const $button_order_comments = document.querySelector("#order_comments");
const $button_crescent_order = document.querySelector("#crescent_order");
const $button_decrescent_order = document.querySelector("#decrescent_order");
const $ranking_by = document.querySelectorAll(".ranking_by");
const $crescent = document.querySelector("#crescent");
const $maior_menor = document.querySelector("#maior_menor");
const $ranking_drop_down = document.querySelector("#ranking_drop_down");
const $order_drop_down = document.querySelector("#order_drop_down");

// Seta as ordenações padrões.
var order_by = "likes";
var crescent = false;

order(order_by, crescent);

// Métodos para ordenar de acordo com o botão clicado.
$button_crescent_order.onclick = function () { order(order_by, true) };
$button_decrescent_order.onclick = function () { order(order_by, false) };
$button_order_likes.onclick = function () { order("likes", crescent) };
$button_order_comments.onclick = function () { order("comment", crescent) };

$order_drop_down.onclick = function () { drop_content(false, $order_drop_down, $button_crescent_order, $button_decrescent_order) };

$ranking_drop_down.onclick = function () { drop_content(false, $ranking_drop_down, $button_order_comments, $button_order_likes) }

/**
 * Atua como um drop-down, quando um botão é clicado, aparecem mais elementos.
 * @param {booleano} drop verifica se é pra mostrar ou não o conteúdo
 * @param {HTMLElement} drop_down botão para mostrar um conteúdo escondido.
 * @param {HTMLElement} item1 conteúdo escondido.
 * @param {HTMLElement} item2 conteúdo escondido.
 */
function drop_content(drop, drop_down, item1, item2) {
    item1.hidden = drop;
    item2.hidden = drop;
    if (drop) {
        drop_down.onclick = function () { drop_content(false, drop_down, item1, item2) }
    }
    else {
        drop_down.onclick = function () { drop_content(true, drop_down, item1, item2) }
    }
}

/**
 * Altera o texto de apresentação de acordo com a ordenação escolhida.
 * @param {string} x tipo de ordenação. 
 * @param {boolean} y segundo tipo de ordenação.
 */
function alter_text(x, y) {
    if (x == "likes") {
        $ranking_by.forEach(element => { element.innerHTML = "likes" });
    } else {
        $ranking_by.forEach(element => { element.innerHTML = "comentários" });
    }
    if (y == false) {
        $crescent.innerHTML = "decrescente";
        $maior_menor.innerHTML = "maior";
    }
    else {
        $crescent.innerHTML = "crescente";
        $maior_menor.innerHTML = "menor";
    }
}

/**
 * Ordena as disciplinas pelo tipo de ordenação escolhido.
 * @param {string} x tipo de ordenação.
 * @param {boolean} y segundo tipo de ordenação.
 */
function order(x, y) {
    alter_text(x, y);
    remove_childs($disciplines_list);
    order_by = x;
    crescent = y;
    get_disciplines(endpoints.ranking(), crescent, order_by, $disciplines_list, "method");
}

/**
 * Remove todos os filhos de um elemento.
 * @param {HTMLElement} node elemento do DOM.
 */
function remove_childs(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}