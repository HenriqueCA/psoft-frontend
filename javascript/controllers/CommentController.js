import endpoints from "../models/Endpoints.js";
import { post_request, delete_request } from "../models/Requests.js";

/**
 * Adiciona um comentário em uma página de disciplina.
 * @param {string} subject_id id da disciplina em que o comentário irá ser adicionado.
 * @param {string} text comentário.
 */
async function add_new_comment(subject_id, text) {
    let response = "";
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        response = await post_request(endpoints.subject() + "/" + subject_id + "/comment", { 'msg': text });
    }

    return response;
}

/**
 * Responde um comentário de uma página de disciplina.
 * @param {string} subject_id id da disciplina.
 * @param {string} text comentário
 * @param {string} id id do comentário que irá responder.
 */
async function reply_comment(subject_id, text, id) {
    let response = "";
    if (text.trim() == "") {
        alert("Comentário vazio");
    } else {
        response = await post_request(endpoints.subject() + "/" + subject_id + "/comment" + "/" + id, { 'msg': text });
    }
    return response;

}

/**
 * Deleta um comentário de um perfil da disciplina.
 * @param {string} subject_id id da disciplina.
 * @param {string} id id do comentário
 */
async function delete_comment(subject_id, id) {
    let response = await delete_request(endpoints.subject() + "/" + subject_id + "/comment" + "/" + id);
    return response;
}

export { add_new_comment, reply_comment, delete_comment };