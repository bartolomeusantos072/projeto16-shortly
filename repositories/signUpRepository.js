import database from '../config/database.js';
import bcrypt from 'bcrypt';

async function createUser(name,email,password){
  const SALT=10;
  const passwordHash= bcrypt.hashSync(password,SALT);
  return database.query(`INSERT INTO users (name,email,password) VALUES($1,$2,$3)`,[name,email,passwordHash]);
}


async function getUserByEmail(email){
    return database.query(`SELECT * FROM users WHERE email = $1`,[email]);
}



async function getUserById(id){
    return database.query(`SELECT * FROM users WHERE id=$1`,[id]);
}

async function getUserAndLinksById(id) {
    return database.query(`
    SELECT u.id, u."shortUrl", u.url, u."visitCount"
    FROM urls u
    JOIN users usr ON u."userId" = usr.id
    WHERE usr.id = $1`, [id]);
  }
  
  async function getUrlsRankingByUser() {
    return database.query(`
      SELECT usr.id, usr.name, COUNT(u.id) as "linksCount", SUM(u."visitCount") as "visitCount"
      FROM urls u
      JOIN users usr ON u."userId" = usr.id
      GROUP BY usr.id
      ORDER BY "visitCount" DESC
      LIMIT 10
    `);
  }

const signUpRepository={
    createUser,
    getUserByEmail,
    getUserById,
    getUserAndLinksById,
    getUrlsRankingByUser
}

export default signUpRepository;