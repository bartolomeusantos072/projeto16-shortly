import {getSessionByToken} from "../repositories/sessionRepository.js";
import signUpRepository from "../repositories/signUpRepository.js";

export async function validateToken(req, res, next) {

    const {authorization} = req.headers;
    const token = authorization ?. replace("Bearer ", "");
    console.log(token);
    if (! token) {
        console.log("token errado");
        return res.sendStatus(401);
    }

    try {
        const {rows} = await getSessionByToken(token);
        console.log("Linhas",rows);
      /*
        if (!sessions[0]) {
            console.log("erro de sessao");
            return res.sendStatus(401);
        }
        
        const {rows: users} = await signUpRepository.getUserById(sessions[0].id);
        const [user] = users;
        if (!user) {
            console.log("erro de usuario");
            return res.sendStatus(401);
        }

        res.locals.user = users[0];
        */
       next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}
