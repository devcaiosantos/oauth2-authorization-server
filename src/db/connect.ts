import * as pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

export async function connect(): Promise<pg.Pool> {

    try {
        if (
            !process.env.DB_USER ||
            !process.env.DB_HOST ||
            !process.env.DB_NAME ||
            !process.env.DB_PASSWORD ||
            !process.env.DB_PORT
        ) {
            throw new Error("ENV variables not set for PostgreSQL!");
        }

        const poolConfig: pg.PoolConfig = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT)
        };

        const pool = new pg.Pool(poolConfig)

        // Apenas testando a conexão
        const client: pg.PoolClient = await pool.connect();
        console.log("Criou pool de conexões no PostgreSQL!");

        const res = await client.query('SELECT NOW()');
        console.log(res.rows[0]);
        client.release();

        // Guardando para usar sempre o mesmo
        return pool;
    } catch (err) {

        throw new Error(`Erro ao conectar com o banco de dados: ${(err as Error).message}`);
    }
}
