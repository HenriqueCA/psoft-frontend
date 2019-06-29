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
        const id = this.getAttribute("id");

        const is_from_user = this.hasAttribute("isfromuser")

        let css = this.css();

        if (is_from_user) {
            css = this.user_css();
        }

        this.shadowRoot.innerHTML = `
            <style>
            ${css}
            </style>
            <div>
            <button hidden>delete</button>
            <p class="timestamp">${time_stamp}</p>
            <p class="user">${user}</p>
            <p class="comment">${comment}</p>
            </div>
            `

        this.comment_delete = this.shadowRoot.querySelector("button");
        this.comment_delete.onclick = function(){
            //request delete;
            console.log("delete");
        }

        if (is_from_user) {
            this.showButton();
        }
    }

    showButton() {
        this.comment_delete.hidden = false;
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
            display: grid;
            border: 1px solid black;
            border-radius: 10px;
            padding: 5px;
            grid-template-columns: 1fr 3fr 6fr;
            grid-template-rows: 1fr 1fr;
            justify-items:left;
        }

        .timestamp{
            grid-row: 1/2;
            grid-column:1/2;
        }
        .user{
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
        }
        `
        return style;
    }
}

export default Comment;