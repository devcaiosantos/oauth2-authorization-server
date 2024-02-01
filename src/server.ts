import {connect} from './db/connect';

// Database Connection
let poolDB 
async function startDB(){
    poolDB = await connect();
}
startDB();




