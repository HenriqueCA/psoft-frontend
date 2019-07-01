import Comment from "./Comment.js";
import endpoints from "./Endpoints.js";
import { get_request, post_request, delete_request } from "./Requests.js";
import { add_new_comment, reply_comment, delete_comment } from "./CommentController.js";

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

$new_comment_button.onclick = function () { add_new_comment(id, $new_comment_text.value) };

discipline_page(id);

async function discipline_page(id) {
    let response = await get_request(endpoints.subject(), "/" + id);
    if (response.status == 200) {
        let data = await response.text();
        change_page(data);
    } else {
        window.localStorage.setItem("token", "");
        document.location.href = "../index.html";
    }
}

function change_page(data) {
    let data_json = JSON.parse(data);
    $subject_name.innerHTML = data_json.name;
    $like_button.innerHTML = "Like";

    change_like(data_json.likes, data_json.email);
    list_comments(data_json.commentList, data_json.email);
}

function change_like(likes, email) {
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

function create_comment(comment) {
    let ps_comment = document.createElement("ps-comment");
    if (comment.msg == "") {
        ps_comment.setAttribute("comment", "Comentário apagado!");
    } else {
        ps_comment.setAttribute("comment", comment.msg);
    }
    ps_comment.setAttribute("user", comment.author);
    ps_comment.setAttribute("timestamp", comment.timestamp);
    ps_comment.setAttribute("id", comment.id);

    return ps_comment;
}

function list_comments(comments, email) {
    comments.forEach(comment => {
        let ps_comment = create_comment(comment);
        $comment_section.appendChild(ps_comment);

        let delete_button = ps_comment.get_button;
        if (comment.author == email) {
            delete_button.hidden = false;
            delete_button.onclick = function () {
                delete_comment(id, comment.id);
                ps_comment.set_comment("Comentário apagado!");
            }
        }

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

        send_reply.onclick = function () { reply_comment(id, reply_input.value, comment.id) };

        reply_button.onclick = function () {
            reply_input.hidden = false;
            send_reply.hidden = false;
            this.hidden = true;
        }

        $comment_section.appendChild(reply_button);
        $comment_section.appendChild(reply_input);
        $comment_section.appendChild(send_reply);

        comment.replies.forEach(reply => {
            let r = create_comment(reply);
            r.setAttribute("class", "comment_reply");
            $comment_section.appendChild(r);
        });


    });
}
function validate_comment(text, button) {
    if (text.length >= 1) {
        button.disabled = false;
    }
}

function like() {
    let response = post_request(endpoints.subject() + "/" + id + "/like", {});
    dislike_button();
}

function dislike() {
    let response = delete_request(endpoints.subject(), "/" + id + "/like");
}

function dislike_button() {
    $like_button.innerHTML = "Remover o Like";
    $like_button.onclick = dislike;
}
