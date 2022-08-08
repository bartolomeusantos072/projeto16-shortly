import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import signUpRepository from '../repositories/signUpRepository.js';
import {createSession} from '../repositories/sessionRepository.js';

export async function signUp(req, res) {
    console.log(req.body);
    const {name, email, password} = req.body;
    try {
        const existingEmail = await signUpRepository.getUserByEmail(email);
        if (existingEmail.rowCount > 0) {
            return res.sendStatus(409);
        }
        await signUpRepository.createUser(name, email, password);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function signIn(req,res){
    const {email,password}=req.body;
    console.log(req.body);
    try{
        const { rows } = await signUpRepository.getUserByEmail(email);
        if (!rows[0]) {
            
            return res.sendStatus(401);
        }
        
        if (bcrypt.compareSync(password, rows[0].password)) {
            const token = uuid();
            await createSession(token, rows[0].iduser);
            return res.send(token);
          }
        
          res.sendStatus(401); 

    }catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}
