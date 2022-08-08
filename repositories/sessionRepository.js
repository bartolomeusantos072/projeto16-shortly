import database from '../config/database.js';

export async function getSessionByToken(token) {
 
  return database.query(`SELECT *  FROM sessions WHERE token=$1`, [token]);
}

export async function createSession(token, userId) {
  return database.query(`
   INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);
}
