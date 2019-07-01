import endpoints from "./Endpoints.js";
import { get_request } from "./Requests.js";

const $disciplines_list = document.querySelector("#disciplines");

const $button_order_likes = document.querySelector("#order_likes");
const $button_order_comments = document.querySelector("#order_comments");

$button_order_likes.onclick = list_likes;
$button_order_comments.onclick = list_comments;


function list_likes(){
    remove_childs($disciplines_list);
    get_disciplines("like");

}

function list_comments(){
    remove_childs($disciplines_list);
    get_disciplines("comment");
}

function remove_childs(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

async function get_disciplines(substring) {
    let response = await get_request(endpoints.ranking(), "?method=" + substring);
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