import Comment from "../components/Comment.js";
import endpoints from "../models/Endpoints.js";
import { get_request, post_request, delete_request } from "../models/Requests.js";
import { add_new_comment, reply_comment, delete_comment } from "../controllers/CommentController.js";

customElements.define("ps-comment", Comment);

var url_params = new URLSearchParams(window.location.search);

var id = url_params.get("id");

const $subject_name = document.querySelector("#subject_name");
const $like_button = document.querySelector("#like_button");
const $users_likes = document.querySelector("#users_likes");
const $total_likes = document.querySelector("#total_likes");

const $new_comment_text = document.querySelector("#new_comment");
const $new_comment_button = document.querySelector("#submit_comment");

const $comment_section = document.querySelector("#comments");

$like_button.onclick = like;

$new_comment_text.onkeyup = function () { validate_comment($new_comment_text.value, $new_comment_button) };

$new_comment_button.onclick = function () { adding_comment(false, $new_comment_text) };

$new_comment_text.addEventListener("keyup", function(e){
    if(e.keyCode ===13){
        e.preventDefault();
        $new_comment_button.click();
    }
})

discipline_page(id);

var user_email;

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

async function discipline_page(id) {
    let response = await get_request(endpoints.subject(), "/" + id);
    if (response.status == 200) {
        let data = await response.text();
        user_email = response.headers.get("Author");
        change_page(data);
    } else {
        if (response.status == 403 || response.status == 401) {
            window.localStorage.setItem("token", "");
            alert("Faça login novamente!");
        } else {
            alert("Acho que essa disciplina não existe.");
        }
        document.location.href = "../../html/index.html";
    }
}

function change_page(data) {
    let data_json = JSON.parse(data);
    $subject_name.innerHTML = data_json.name;
    $like_button.innerHTML = "Like";

    change_like(data_json.likes, user_email);
    list_comments(data_json.commentList, user_email);
}

function change_like(likes, email) {
    remove_childs($users_likes);

    likes.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element;
        $users_likes.appendChild(li);
        if (element == email) {
            dislike_button();
        }
    });

    $total_likes.innerHTML = likes.length;

}

function remove_childs(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

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
        send_reply.innerHTML = "Responder comentário";
        send_reply.setAttribute("hidden", true);
        send_reply.setAttribute("type", "submit");
        send_reply.setAttribute("disabled", true);

        reply_input.onkeyup = function () { validate_comment(reply_input.value, send_reply) };
        reply_input.addEventListener("keyup", function(e){
            if(e.keyCode ===13){
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
            r.setAttribute("class", "comment_reply");
            $comment_section.appendChild(r);
            delete_button_comment(r, reply);
        });


    });
}

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
function validate_comment(text, button) {
    if (text.length >= 1) {
        button.disabled = false;
    }
}

async function like() {
    let response = await post_request(endpoints.subject() + "/" + id + "/like", {});
    if (response.status == 200) {
        let data = await response.text();
        let data_json = JSON.parse(data);
        change_like(data_json.likes, user_email);
        dislike_button();
    }
}

async function dislike() {
    let response = await delete_request(endpoints.subject(), "/" + id + "/like");
    if (response.status == 200) {
        let data = await response.text();
        let data_json = JSON.parse(data);
        change_like(data_json.likes, user_email);
        like_button();
    }
}

function dislike_button() {
    $like_button.innerHTML = "Remover o Like";
    $like_button.setAttribute("class","dislike");
    $like_button.onclick = dislike;
}

function like_button() {
    $like_button.innerHTML = "Like"
    $like_button.setAttribute("class","like");
    $like_button.onclick = like;
}
