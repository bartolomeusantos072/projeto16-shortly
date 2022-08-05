import signUpRepository from '../repositories/signUpRepository.js';

async function signUp(req, res) {
    const {name, email, password} = req.body;
    try {
        const existingEmail = await signUpRepository.getUserByEmail(email);
        if (existingEmail.rowCount > 0) {
            return res.sendStatus(409);
        }
        await signUpRepository.createUser(name, email, password);
        res.sendStatus(201);
    } catch (e) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function signIn(req,res){
    const {email,password}=req.body;
    try{
        const { rows } = await signUpRepository.getUserByEmail(email);
        if (!rows[0]) {
            return res.sendStatus(401);
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await sessionRepository.createSession(token, user.id);
            return res.send(token);
          }
        
          res.sendStatus(401); 

    }catch (e) {
        console.log(error);
        return res.sendStatus(500);
    }

}

async function getUserById(req, res) {

}

async function getRanking(req, res) {

}

const userController = {
    signUp,
    signIn,
    getUserById,
    getRanking
}

export default userController;
