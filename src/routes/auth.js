import { login, registerUser } from "../auth/authenticator.js";

export default (router, oauth) => {

    router.post("/register", registerUser);
    router.post("/login", oauth.grant(), login);

    return router;
};