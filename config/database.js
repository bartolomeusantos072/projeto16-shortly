import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const databaseConfig = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});


const database = new Pool(databaseConfig);

export default database;