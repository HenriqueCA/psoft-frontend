const endpoints = {
    host: "http://127.0.0.1:8080/api/",

    login() {
        return this.host + "v1/signin";
    },
    register() {
        return this.host + "v1/signup";
    },
    subject() {
        return this.host + "v1/subject";
    },
    ranking(){
        return this.subject() + "/ranking";
    }

};

export default endpoints;
