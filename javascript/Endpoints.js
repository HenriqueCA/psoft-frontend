const endpoints = {
    host: "http://127.0.0.1:8080/api/",

    login() {
        return this.host + "login";
    },
    register() {
        return this.host + "v1/user";
    },
    subject() {
        return this.host + "v1/subject";
    },
    ranking(){
        return this.subject + "/ranking";
    }

};

export default endpoints;
