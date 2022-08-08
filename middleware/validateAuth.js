import sessionRepository from "../repositories/sessionRepository.js";
import signUpRepository from "../repositories/signUpRepository.js";

export async function validateToken(req,res,next){
    const {authorization} = req.headers;
    const token= authorization?.replace("Bearer ","");
    if(!token){
        return res.send(401).status("You must be logged in to do this.")
    }

    try{
        const {rows:sessions}=await sessionRepository.getSessionByToken(token);
        if(!sessions[0]){
            return res.send(401).send("Session not found")
        }

        const {rows:users}=await signUpRepository.getUserById(sessions[0].userId);
        if(!users[0]){
            return res.send(401).send("User not found");
        }

        res.locals.user=users[0];
        next();

    }catch(e){
        console.log(error);
        return res.sendStatus(500);   
    }

}