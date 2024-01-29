export default () => {
    return {
        getUserIDFromBearerToken,
        saveAccessToken,
    };
}

const saveAccessToken = async (accessToken, userID) => {
    try {
        const saveAccessTokenQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${accessToken}', ${userID})`;
        const response = await global.poolDB.query(saveAccessTokenQuery);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getUserIDFromBearerToken = async (bearerToken) => {
    try {
        const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}'`;

        const response = await global.poolDB.query(getUserIDQuery);
        const userID = response? response.rows[0].user_id : null;

        return userID;
    } catch (error) {
        console.error(error);
        return null;
    }
};