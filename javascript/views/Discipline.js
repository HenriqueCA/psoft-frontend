import Comment from "../components/Comment.js";
import endpoints from "../models/Endpoints.js";
import { get_request, post_request, delete_request } from "../models/Requests.js";
import { add_new_comment, reply_comment, delete_comment } from "../controllers/CommentController.js";

// Define o custom component.
customElements.define("ps-comment", Comment);

// Pega os elementos da DOM.
const $subject_name = document.querySelector("#subject_name");
const $like_button = document.querySelector("#like_button");
const $total_likes = document.querySelector("#total_likes");
const $new_comment_text = document.querySelector("#new_comment");
const $new_comment_button = document.querySelector("#submit_comment");
const $comment_section = document.querySelector("#comments");

$like_button.onclick = like;

// Adiciona um novo comentário caso o botão de novo comentário seja clicado.
$new_comment_button.onclick = function () { adding_comment(false, $new_comment_text) };

// Se apertar ENTER, clica no botão.
$new_comment_text.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $new_comment_button.click();
    }
})

var user_email;

// Pega os parâmetros da página
var url_params = new URLSearchParams(window.location.search);
var id = url_params.get("id");

discipline_page(id);

/**
 * Adiciona um comentário na página da disciplina, verificando se é um comentário resposta ou não.
 * @param {boolean} reply booleano representando se é um comentário resposta.
 * @param {HTMLElement} input elemento com a mensagem.
 * @param {string} comment_id id do comentário que vai responder, caso seja uma resposta.
 */
async function adding_comment(reply, input, comment_id = 0) {
    let response;

    if (reply) {
        response = await reply_comment(id, input.value, comment_id);
    } else {
        response = await add_new_comment(id, input.value);
    }

    if (response.status == 200) {
        let data = await response.text();
        let data_json = JSON.parse(data);
        list_comments(data_json.commentList, user_email);
    }

    input.value = "";
}

/**
 * Começa a popular a página com o perfil da disciplina.
 * @param {string} id id da disciplina
 */
async function discipline_page(id) {
    let response = await get_request(endpoints.subject(), "/" + id);
    if (response.status == 200) {
        let data = await response.text();
        user_email = response.headers.get("Author");
        change_page(data);
    } else {
        alert("É preciso estar logado para entrar aqui!");
        window.localStorage.setItem("token", "");
        document.location.href = "../../html/index.html";
    }
}

/**
 * Popula a pagina com dados vindos de um request.
 * @param {JSON} data json com os dados da página.
 */
function change_page(data) {
    let data_json = JSON.parse(data);
    $subject_name.innerHTML = data_json.name;
    verify_like(data_json.userLike);
    change_like(data_json.likes);
    list_comments(data_json.commentList, user_email);
}

/**
 * Altera o total de likes da disciplina.
 * @param {string} likes quantidade de likes
 */
function change_like(likes) {
    $total_likes.innerHTML = likes;
}

/**
 * Verifica se o usuário já deu like na disciplina e muda o botão de like para remover like.
 * @param {boolean} userLike se o usuário já deu like
 */
function verify_like(userLike) {
    if (userLike) {
        dislike_button();
    }
}

/**
 * remove todos os filhos de um elemento.
 * @param {HTMLElement} node elemento HTML.
 */
function remove_childs(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

/**
 * Cria um comentário com web components.
 * @param {JSON} comment JSON de um comentário
 * @param {string} email email do usuário que está acessando a página
 */
function create_comment(comment, email) {
    let ps_comment = document.createElement("ps-comment");
    if (comment.msg == "") {
        ps_comment.setAttribute("comment", "Comentário apagado!");
    } else {
        ps_comment.setAttribute("comment", comment.msg);
    }
    if (comment.author == email) {
        ps_comment.setAttribute("isfromuser", true);
    }
    ps_comment.setAttribute("user", comment.author);
    ps_comment.setAttribute("timestamp", comment.date);
    ps_comment.setAttribute("id", comment.id);

    return ps_comment;
}

/**
 * Lista os comentários na seção de comentários.
 * @param {JSON} comments JSON com comentários.
 * @param {string} email email do usuário que acessou a página.
 */
function list_comments(comments, email) {

    remove_childs($comment_section);

    comments.forEach(comment => {
        let ps_comment = create_comment(comment, email);
        $comment_section.appendChild(ps_comment);

        delete_button_comment(ps_comment, comment);

        let reply_button = document.createElement("button");
        reply_button.innerHTML = "Responder comentário";


        let reply_input = document.createElement("input");
        reply_input.setAttribute("type", "text");
        reply_input.setAttribute("hidden", true);
        reply_input.setAttribute("maxlength", "255");

        let send_reply = document.createElement("button");
        send_reply.innerHTML = `<i class="fa fa-paper-plane" aria-hidden="true"></i>`;
        send_reply.setAttribute("hidden", true);
        send_reply.setAttribute("type", "button");

        reply_input.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                send_reply.click();
            }
        });

        send_reply.onclick = function () { adding_comment(true, reply_input, comment.id) };

        reply_button.onclick = function () {
            reply_input.hidden = false;
            send_reply.hidden = false;
            this.hidden = true;
        }

        $comment_section.appendChild(reply_button);
        $comment_section.appendChild(reply_input);
        $comment_section.appendChild(send_reply);

        comment.replies.forEach(reply => {
            let r = create_comment(reply, user_email);
            r.setAttribute("commentreply", true);
            $comment_section.appendChild(r);
            delete_button_comment(r, reply);
        });


    });
}

/**
 * Verifica a necessidade de adicionar o botão de deletar comentário.
 * @param {HTMLElement} ps_comment elemento de comentário.
 * @param {JSON} comment json do comentário.
 */
async function delete_button_comment(ps_comment, comment) {
    if (ps_comment.hasAttribute("isfromuser")) {
        let delete_button = ps_comment.get_button;
        delete_button.hidden = false;
        delete_button.onclick = async function () {
            let response = await delete_comment(id, comment.id);
            if (response.status == 200) {
                let data = await response.text();
                let data_json = JSON.parse(data);
                list_comments(data_json.commentList, user_email);
            }
        }
    }
}

/**
 * Faz um request para a API dando like na disciplina.
 */
async function like() {
    let response = await post_request(endpoints.subject() + "/" + id + "/like", {});
    if (response.status == 200) {
        let data = await response.text();
        let data_json = JSON.parse(data);
        change_like(data_json.likes);
        dislike_button();
    }
}

/**
 * Faz um request para a API removendo o like na disciplina.
 */
async function remove_like() {
    let response = await delete_request(endpoints.subject(), "/" + id + "/like");
    if (response.status == 200) {
        let data = await response.text();
        let data_json = JSON.parse(data);
        change_like(data_json.likes);
        like_button();
    }
}

/**
 * Muda o botão de like para virar um botão de remover o like.
 */
function dislike_button() {
    $like_button.innerHTML = "Remover o Like";
    $like_button.setAttribute("class", "dislike");
    $like_button.onclick = remove_like;
}

/**
 * Muda o botão de remover o like para virar um botão de dar like.
 */
function like_button() {
    $like_button.innerHTML = "Like"
    $like_button.setAttribute("class", "like");
    $like_button.onclick = like;
}
