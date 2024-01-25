import {connect} from './db/connect.js';
import {  getUser, isValidUser, register} from "./controllers/userController.js"

await connect();

const user = await getUser();

//const userDB = userController(pgPool);
