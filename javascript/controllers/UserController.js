import user from "../models/User.js";
import endpoints from "../models/Endpoints.js";
import { post_request } from "../models/Requests.js";


async function sign_in(login_email, login_password) {
    delete user.firstName;
    delete user.lastName;
    user.email = login_email.value;
    user.password = login_password.value;
    let response = await post_request(endpoints.login(), user);
    return response;
}

async function sign_up(signup_email,signup_fname,signup_lname, signup_password) {
    user.email = signup_email.value;
    user.firstName = signup_fname.value;
    user.lastName = signup_lname.value;
    user.password = signup_password.value;
    let response = await post_request(endpoints.register(), user);
    return response;
}

export {sign_in, sign_up};