const endpoints = {
    host: "http://10.11.4.11:5555/api/",

    login() {
        return this.host + "login";
    },
    register() {
        return this.host + "v1/user";
    },
    subject() {
        return this.host + "v1/subject";
    }

};

export default endpoints;
