import crypto from 'crypto';

export default () => {
    return {
        register,
        getUser,
        isValidUser,
    };
}

const register = async (username, password) => {
    try {
        const shaPass = crypto.createHash('sha256').update(password).digest('hex');
        
        const query = `INSERT INTO users (username, user_password) VALUES ('${username}', '${shaPass}')`;

        const response = await global.poolDB.query(query);
        return response;
    } catch (error) {
        console.error(error);
        return null
    }
};

const getUser = async (username, password) => {
    try {
        const shaPass = crypto.createHash('sha256').update(password).digest('hex');

        const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;

        const response = await global.poolDB.query(getUserQuery);
        const userData = response.results && response.results.rowCount === 1
            ? response.results.rows[0]
            : null;

        return userData;
    } catch (error) {
        console.error(error);
        return null
    }
};

const isValidUser = async (username) => {
    try {
        const query = `SELECT * FROM users WHERE username = '${username}'`;

        const response = await global.poolDB.query(query);
        const isValidUser = response.results
            ? !(response.results.rowCount > 0)
            : null;

        return isValidUser;
    } catch (error) {
        console.error(error);
        return null
    }
};



