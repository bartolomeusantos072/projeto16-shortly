import database from '../config/database.js';
import bcrypt from 'bcrypt';

async function getUserByEmail(email){
    return database.query(`SELECT * FROM users WHERE email = $1`,[email]);
}

async function createUser(name,email,password){
    const SALT=10;
    const passwordHash= bcrypt.hashSync(password,SALT);
    return database.query(`ÌNSERT INTO users (name,email,password) VALUES($1,$2,$3)`,[name,email,passwordHash]);
}

const signUpRepository={
    getUserByEmail,
    createUser
}

export default signUpRepository;