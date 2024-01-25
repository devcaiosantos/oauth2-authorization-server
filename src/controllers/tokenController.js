const saveAccessToken = async (accessToken, userID) => {
    try {
        const saveAccessTokenQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${accessToken}', ${userID})`;
        const response = await global.pgPool.query(saveAccessTokenQuery);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getUserIDFromBearerToken = async (bearerToken) => {
    try {
        const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}'`;

        const response = await global.pgPool.query(getUserIDQuery);
        const userID = response.results && response.results.rowCount === 1
            ? response.results.rows[0].user_id
            : null;

        return userID;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { saveAccessToken, getUserIDFromBearerToken };