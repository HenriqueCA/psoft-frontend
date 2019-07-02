const endpoints = {
    host: "http://35.199.99.162:8080/api/",

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
