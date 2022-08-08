import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});


// const database = new Pool(databaseConfig);

export default database;