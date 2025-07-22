import { DataSource } from "typeorm";

import dotenv from "dotenv";
dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

console.log(DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE)

export const AppDataSource = new DataSource({
    type : "postgres",
    host : DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ["src/Entity/*.js"]
})