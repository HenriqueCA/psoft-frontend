import endpoints from "./Endpoints.js";
import { post_request } from "./Requests.js";

async function add_new_comment(subject_id, text) {
    let response = "";
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        response = await post_request(endpoints.subject() + "/" + subject_id + "/comment", {'msg': text });
    }

    return response;
}

async function reply_comment(subject_id, text, id) {
    let response = "";
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        response = await post_request(endpoints.subject() + "/" + subject_id + "/comment" + "/" + id + "/reply", {'msg': text });
    }
    return response;

}

async function delete_comment(subject_id,id){
    let response = await delete_request(endpoints.subject() + "/" + subject_id + "/comment" + "/" + id);
    return response;
}

export { add_new_comment, reply_comment, delete_comment };