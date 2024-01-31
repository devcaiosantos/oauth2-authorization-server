import {connect} from './db/connect.js';

// OAuth imports
import modelOauth from "./auth/modelOauth.js";
import oAuth2Server from "node-oauth2-server";

// Express
import express from "express";

// Auth and routes
import authRoutes from "./routes/auth.js";
import testAPIRoutes from "../tests/testAPIRoutes.js";

// Database Connection
await connect();

const app = express();
app.oauth = oAuth2Server({
    model: modelOauth(),
    grants: ["password"],
    debug: true,
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());
app.use("/auth", authRoutes(express.Router(),app));
app.use("/test", testAPIRoutes(express.Router(),app));
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

