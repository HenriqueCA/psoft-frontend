/**
 * Classe utilizada para fazer um componente customizável de comentários.
 * Ao colocar o objeto no DOM, o style do comentário é feito caso o objeto seja do usuário e/ou uma resposta à outro comentário.
 */

class Comment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.comment_delete = null;
    }

    /**
     * Chamado quando o componente é colocado no DOM.
     */
    connectedCallback() {
        const comment = this.getAttribute("comment");
        const user = this.getAttribute("user");
        const time_stamp = this.getAttribute("timestamp");

        const is_from_user = this.hasAttribute("isfromuser");

        const reply = this.hasAttribute("commentreply");


        let css = this.css();

        if (is_from_user) {
            css += this.user_css();
        }

        if (reply) {
            css += this.reply_css()
        }

        this.shadowRoot.innerHTML = `
            <style>
            ${css}
            </style>
            <div>
            <button hidden>Deletar</button>
            <p class="timestamp">${time_stamp}</p>
            <p class="user">Email: ${user}</p>
            <p class="comment">${comment}</p>
            </div>
            `

        this.comment_delete = this.shadowRoot.querySelector("button");

        if (comment == "Comentário apagado!") {
            this.comment_delete.remove();
        }

    }

    get get_button() {
        return this.comment_delete;
    }

    set set_comment(msg) {
        this.shadowRoot.querySelector(".comment").value = "Comentário apagado!";
    }

    /**
     * Usado para estilizar o componente se for resposta
     */
    reply_css() {

        let style = `
        div {
            margin-left: 10%;
            background-color: #9dc6a0;
        }
        `

        return style;

    }


    /**
     * Usado para estilizar o componente se for do usuário
     */
    user_css() {

        let style = `
        div {
            border: 2px solid red;
        }
        `

        return style;


    }

    /**
     * Estilo padrão do componente.
     */
    css() {
        let style = `
        div {
            margin: 0.5%;
            background-color: #9dc6c9;
            display: grid;
            border: 1px solid black;
            border-radius: 10px;
            padding: 5px;
            grid-template-columns: 1fr 3fr 6fr;
            grid-template-rows: 1fr 1fr;
            justify-items:left;
        }

        .timestamp{
            color: black;
            font-weight: bold;
            grid-row: 1/2;
            grid-column:1/2;
            margin: 4%;
            border: 4%;
        }
        .user{
            font-weight: bold;
            grid-row: 1/2;
            grid-column: 2/3;
        }
        .comment{
            grid-row: 2/3;
            grid-column: 1/4;
            word-break: break-word;
        }
        button {
            grid-row: 1/2
            grid-column: 3/4;
            justify-self: right;
            background-color: red;
            border: none;
            border-radius: 3px;
            color: white;
        }

        button:hover {
            cursor:pointer;
        }
        `
        return style;
    }
}

export default Comment;