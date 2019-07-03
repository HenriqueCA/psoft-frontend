import { get_request } from "../models/Requests.js";

/**
 * Pega as disciplinas existentes, de acordo com os parâmetros.
 * @param {string} endpoint endpoint que irá dar request.
 * @param {boolean} crescent indica se é pra listar as disciplinas em ordem crescente ou decrescente
 * @param {string} substring valor do parâmetro que irá realizar o request.
 * @param {HTMLElement} node nó do DOM em que irá adicionar o resultado do request.
 * @param {string} param parâmetro para o request.
 */
async function get_disciplines(endpoint, crescent, substring, node, param) {
    let response = await get_request(endpoint, "?" + param + "=" + substring);
    if (response.status == 200) {
        let body = await response.text();
        list_disciplines(crescent, body, node);
    }
}

/**
 * 
 * @param {boolean} crescent indica se vai listar em ordem crescente ou decrescente.
 * @param {string} disciplines JSON com as disciplinas que irão ser listadas.
 * @param {HTMLElement} node nó em que as disciplinas serão colocadas.
 */
function list_disciplines(crescent, disciplines, node) {
    var obj_disciplines = JSON.parse(disciplines);

    if (crescent) {
        obj_disciplines.reverse();
    }
    obj_disciplines.forEach(element => {
        let a = document.createElement("a");
        a.setAttribute("href", "../../html/discipline.html?id=" + element.id)
        a.innerHTML = element.name;
        let li = document.createElement("li");
        li.onclick = function () { a.click() };
        li.appendChild(a);
        node.appendChild(li);
    });
}

export default get_disciplines;