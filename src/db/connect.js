import postgresql from 'pg';
const { Pool } = postgresql;

import dotenv from 'dotenv';
dotenv.config();

export async function connect() {
    if (global.poolDB){
        return global.poolDB.connect();
    }

    const pool = new Pool(
        {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD ,
            port: process.env.DB_PORT
        }
    );
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.poolDB = pool;
    return pool.connect();
}
