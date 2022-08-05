import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const database = new Pool({
  connectionString: process.env.DATABASE_URL
});

if(process.env.MODE === "PROD") { //COLOCAR PROD NO HEROKU
  database.ssl = {
    rejectUnauthorized: false
  }
}

export default database;