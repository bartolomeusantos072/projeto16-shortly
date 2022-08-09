import database from "../config/database.js"

async function getAuth(email) {
  return database.query(`SELECT * FROM users WHERE email = $1`, [email])
}

async function postSignIn(userId, token) {
  return database.query(
    `INSERT INTO 
      tokens ("userId",token, status) 
    VALUES 
      ($1, $2, $3)`,
    [userId, token, true]
  );
};

async function postSignUp(name, email, passwordHash) {
  return database.query(
    `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
    [name, email, passwordHash]);
};

export const authRepository = {
  getAuth,
  postSignIn,
  postSignUp
};