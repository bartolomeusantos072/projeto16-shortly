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

async function getUserById(id){
    return database.query(`SELECT * FROM users WHERE id=$1`,[id]);
}

async function getUserDetails(id){
    
}
const signUpRepository={
    getUserByEmail,
    createUser,
    getUserById,
    getUserDetails
}

export default signUpRepository;