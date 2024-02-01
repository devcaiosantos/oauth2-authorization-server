import {getUserFromDB} from '../controllers/userController.js';
import {saveAccessTokenOnDB, getUserIDFromBearerToken, } from '../controllers/tokenController.js';
import {
    User, Client, Falsey, Token, PasswordModel
  } from "@node-oauth/oauth2-server";

export default ():PasswordModel => {
    return {
        getClient,
        saveToken,
        getAccessToken,
        getUser,
    }
}

async function getClient(clientID:string, clientSecret:string): Promise<Client | Falsey> {
    const client:Client = {
        id: clientID,
        grants: ["password"],
    };

    return client
}


async function getUser(username, password, cbFunc): Promise<Falsey | User> {
    const response = await getUserFromDB({username, password});
    return response;
}

async function saveToken(accessToken: Token, client: Client, user: User): Promise<Falsey | Token> {
    const token = await saveAccessTokenOnDB(accessToken, user.id);
    return token;
}

async function getAccessToken(bearerToken): Promise<Falsey | Token> {
    const userID = await getUserIDFromBearerToken(bearerToken);
    if(userID){
        const token:Token = {
            client: {id: "", grants: ["password"]},
            accessToken: bearerToken,
            user: {id: userID}
        } 
        return token;
    }
    return null;
   
}