class Comment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.comment_delete = null;
    }

    connectedCallback() {
        const comment = this.getAttribute("comment");
        const user = this.getAttribute("user");
        const time_stamp = this.getAttribute("timestamp");

        const is_from_user = this.hasAttribute("isfromuser");

        let css = this.css();

        if (is_from_user) {
            css = this.user_css();
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

        if (comment == "Comentário apagado!"){
            this.comment_delete.remove();
        }

    }

    get get_button(){
        return this.comment_delete;
    }
    set set_comment(msg){
        this.shadowRoot.querySelector(".comment").value = "Comentário apagado!";
    }

    set remove_button(msg){
        console.log("REMOVENDO");
        this.shadowRoot.innerHTML = "";
        console.log(this.comment_delete);
    }


    user_css() {
        let style = this.css();

        style += `
        div {
            border: 2px solid red;
        }
        `

        return style;


    }

    css() {
        let style = `
        div {
            margin: 1%;
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