

export default (injectedUserDB) => {
    global.userDB = injectedUserDB;
    return {
        registerUser,
        login,
    };
};

function registerUser(req, res) {
    const isValidUser = global.userDB.isValidUser(req.body.username);
    if(!isValidUser){
        sendResponse(res, "Usuário inválido", true);
        return;
    }
    global.userDB.isValidUser(req.body.username, async (error, isValidUser) => {
        if (error || !isValidUser) {
            const message = error
                ? "Something went wrong!"
                : "This user already exists!";

            sendResponse(res, message, error);

            return;
        }

        const response = await global.userDB.register(req.body.username, req.body.password);
        if(response){
            sendResponse(
                res,
                response.error === undefined ? "Success!!" : "Something went wrong!",
                response.error
            );
        }

    });
}

function login(query, res) {}

function sendResponse(res, message, error) {
    res.status(error !== undefined ? 400 : 200).json({
        message: message,
        error: error,
    });
}