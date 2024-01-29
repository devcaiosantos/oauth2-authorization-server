export default (injectedUserDB, injectedTokenDB) => {
    global.userDB = injectedUserDB;
    global.tokenDB = injectedTokenDB;
    return {
        getClient,
        grantTypeAllowed,
        getUser,
        saveAccessToken,
        getAccessToken
    }
}

function getClient(clientID, clientSecret, cbFunc) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null,
    };

    cbFunc(false, client);
}

function grantTypeAllowed(clientID, grantType, cbFunc) {
    cbFunc(false, true);
}

async function getUser(username, password, cbFunc) {
    const response = await global.userDB.getUser({username, password});
    if(!response)cbFunc(true, null);
    cbFunc(false, response);
}

async function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {
    const response = await global.tokenDB.saveAccessToken(accessToken, user.id);
    
    if(!response)cbFunc(true, null);
    cbFunc(false, response);
}

async function getAccessToken(bearerToken, cbFunc) {
    const response = await global.tokenDB.getUserIDFromBearerToken(bearerToken);
    if(!response)cbFunc(true, null);
    cbFunc(false, {
        user: {
            id: response,
        },
        expires: null
    });
}