import endpoints from "./Endpoints.js";
import {get_request} from "./Requests.js";

const $disciplines_list = document.querySelector("#disciplines_list");

var url_params = new URLSearchParams(window.location.search);

var substring = url_params.get("search");

get_disciplines(substring);

async function get_disciplines(substring) {
    let response = await get_request(endpoints.subject(), "?search=" + substring);
    let body = await response.text();
    list_disciplines(body);
}

function list_disciplines(disciplines) {
    var obj_disciplines = JSON.parse(disciplines);
    obj_disciplines.forEach(element => {
        let a = document.createElement("a");
        a.setAttribute("href","../discipline.html?" + element.id)
        a.innerHTML = element.name;
        let li = document.createElement("li");
        li.appendChild(a);
        $disciplines_list.appendChild(li);
    });
}