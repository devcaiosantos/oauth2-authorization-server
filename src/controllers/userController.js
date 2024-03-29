import crypto from 'crypto';



export const register = async ({username, password}) => {
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

export const getUserFromDB = async ({username, password}) => {
    try {
        const shaPass = crypto.createHash('sha256').update(password).digest('hex');

        const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;

        const response = await global.poolDB.query(getUserQuery);
        
        const userData = response? response.rows[0]: null;

        return userData;
    } catch (error) {
        console.error(error);
        return null
    }
};

export const isValidUser = async (username) => {
    try {
        const query = `SELECT * FROM users WHERE username = '${username}'`;

        const response = await global.poolDB.query(query);
        
        const isValidUser = response? !(response.rowCount > 0) : null;

        return isValidUser;
    } catch (error) {
        console.error(error);
        return null
    }
};



