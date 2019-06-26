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

        const is_from_user = this.hasAttribute("isfromuser")
        let css = this.css();
        if (is_from_user) {
            css = this.user_css();
        }
        this.shadowRoot.innerHTML = `
            ${css}
            <div>
            <button>delete</button>
            <p class="timestamp">${time_stamp}</p>
            <p class="user">${user}</p>
            <p class="comment">${comment}</p>
            </div>
            `

        this.comment_delete = this.shadowRoot.querySelector("button");

        if (is_from_user) {
            this.showButton();
        }
    }

    showButton() {
        this.comment_delete.hidden = false;
    }

    user_css() {
        let style = `
        `

        return style;


    }

    css() {
        let style = `
        <style>
        div {
            display: grid;
            grid-template-columns: 0.1fr 0.1fr 1fr;
            grid-template-rows: 1fr 1fr;
            justify-items:left;
        }

        .timestamp{
            grid-row-start:1;
            grid-row-end:2;
            grid-column-start:1;
            grid-column-end:2;
        }
        .user{
            grid-row-start:1;
            grid-row-end:2;
            grid-column-start:2;
            grid-column-end:3;
        }
        .comment{
            grid-row-start:2;
            grid-row-end:3;
            grid-column-start:1;
            grid-column-end:4;
        }
        button {
            grid-row-start:1;
            grid-row-end:2;
            grid-column-start:3;
            grid-column-end-4;          
        }

        </style>
        `

        return style;
    }
}

export default Comment;