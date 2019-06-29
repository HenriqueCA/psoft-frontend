import endpoints from "./Endpoints.js";
import { post_request } from "./Requests.js";

async function add_new_comment(subject_id, text) {
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        alert("CHANGE AUTHOR");
        await post_request(endpoints.subject() + "/" + subject_id + "/comment", { 'author': 'henrique@gmail.com', 'msg': text });
        document.location.reload();
    }
}

async function reply_comment(subject_id, text, id) {
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        alert("CHANGE AUTHOR");
        await post_request(endpoints.subject() + "/" + subject_id + "/comment" + "/" + id, { 'author': 'henrique2@gmail.com', 'msg': text });
        document.location.reload();
    }
}

export { add_new_comment, reply_comment };