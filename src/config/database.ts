import mysql from "mysql2"
import dotenv from 'dotenv';

dotenv.config();


const pool =  mysql.createPool({
    connectionLimit : 10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    waitForConnections: true,
    queueLimit: 0
})

export default pool