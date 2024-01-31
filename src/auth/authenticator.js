
import {isValidUser, register } from "../controllers/userController.js";
 
export async function registerUser(req, res) {

    if(!await isValidUser(req.body.username)){
        res.status(400).json({
            message: "Invalid user"
        });
        return;
    }

    const response = await register({username: req.body.username, password: req.body.password});
    
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

export function login(query, res) {}
