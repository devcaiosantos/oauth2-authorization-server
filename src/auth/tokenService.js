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

function getUser(username, password, cbFunc) {
    global.userDB.getUser(username, password, cbFunc);
}

function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {
    global.tokenDB.saveAccessToken(accessToken, user.id, cbFunc);
}

function getAccessToken(bearerToken, cbFunc) {
    global.tokenDB.getUserIDFromBearerToken(bearerToken, (userID) => {
        const accessToken = {
            user: {
                id: userID,
            },
            expires: null,
        };

        cbFunc(userID === null, userID === null ? null : accessToken);
    });
}