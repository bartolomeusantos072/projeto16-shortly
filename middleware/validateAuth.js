import sessionRepository from "../repositories/sessionsRepository.js";
import signUpRepository from "../repositories/signUpRepository.js";

export async function validateToken(req, res, next) {
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401); // unauthorized
  }

  try {
    const { rows:sessions } = await sessionRepository.getSessionByToken(token);

    if (!sessions[0]) {
        
        return res.sendStatus(401);
    }

    const { rows: users } = await signUpRepository.getUserById(sessions[0].userId);
   
    if (!users[0]) {
      return res.sendStatus(401);
    }
  
    res.locals.user = users[0];
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }  
}