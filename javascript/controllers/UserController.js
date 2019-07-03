import user from "../models/User.js";
import endpoints from "../models/Endpoints.js";
import { post_request } from "../models/Requests.js";

async function sign_in($login_email,$login_password) {
    delete user.firstName;
    delete user.lastName;
    user.email = $login_email.value;
    user.password = $login_password.value;


    let response = await post_request(endpoints.login(), user);

    return response;

}

async function sign_up($email,$fname,$lname,$password) {
    user.email = $email.value;
    user.firstName = $fname.value;
    user.lastName = $lname.value;
    user.password = $password.value;

    let response = await post_request(endpoints.register(), user);

    return response;
}

export {sign_in, sign_up};
