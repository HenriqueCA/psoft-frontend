import { get_request } from "../models/Requests.js";

async function get_disciplines(endpoint, crescent, substring, node, param) {
    let response = await get_request(endpoint, "?" + param + "=" + substring);
    if (response.status == 200){
        let body = await response.text();
        list_disciplines(crescent, body, node);
    }
}

function list_disciplines(order, disciplines, node) {
    var obj_disciplines = JSON.parse(disciplines);

    if (order) {
        obj_disciplines.reverse();
    }
    obj_disciplines.forEach(element => {
        let a = document.createElement("a");
        a.setAttribute("href", "../../html/discipline.html?id=" + element.id)
        a.innerHTML = element.name;
        let li = document.createElement("li");
        li.onclick = function(){ a.click() };
        li.appendChild(a);
        node.appendChild(li);
    });
}

export default get_disciplines;