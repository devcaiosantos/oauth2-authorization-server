import {connect} from './db/connect.js';
import userDB from "./controllers/userController.js"
import tokenDB from "./controllers/tokenController.js"

// Database Connection
await connect();


// OAuth imports
import oAuthService from "./auth/tokenService.js";
import oAuth2Server from "node-oauth2-server";

// Express
import express from "express";

// Auth and routes
import authenticator from "./auth/authenticator.js";
import authRoutes from "./routes/auth.js";
import testAPIRoutes from "../tests/testAPIRoutes.js";

const app = express();
app.oauth = oAuth2Server({
    model: oAuthService(userDB(), tokenDB()),
    grants: ["password"],
    debug: true,
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());
app.use("/auth", authRoutes(
    express.Router(),
    app,
    authenticator(userDB())
));
app.use("/test", testAPIRoutes);
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

