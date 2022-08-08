import {Router} from 'express';
import userController from '../controllers/userController.js';
import { validateToken } from '../middleware/validateAuth.js';

const userRouter=Router();
userRouter.get("/users/:id",validateToken,userController.getUserById);
userRouter.get("/ranking",userController.getRanking);

export default userRouter;