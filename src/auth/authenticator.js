

export default (injectedUserDB) => {
    global.userDB = injectedUserDB;
    return {
        registerUser,
        login,
    };
};

async function registerUser(req, res) {
    const isValidUser = await global.userDB.isValidUser(req.body.username);
    
    if(!isValidUser){
        res.status(400).json({
            message: "Invalid user"
        });
        return;
    }

    const response = await global.userDB.register({username: req.body.username, password: req.body.password});
    
    if(!response){
        res.status(500).json({
            message: "Error registering user"
        });
        return;
    }

    res.status(200).json({
        message: "User registered"
    });
    return;
    
}

function login(query, res) {}
