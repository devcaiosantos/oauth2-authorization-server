import { login, registerUser } from "../auth/authenticator.js";

export default (router, app) => {

    router.post("/register", registerUser);
    router.post("/login", app.oauth.grant(), login);

    return router;
};