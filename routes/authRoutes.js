import { Router } from "express";
import {validateSchema} from "../middleware/validateSchema.js";
import {signUpSchema} from "../schema/signUpSchema.js";
import userController from "../controllers/userController.js";

const authRouter=Router();
authRouter.post("/signup",validateSchema(signUpSchema),userController.signUp);
authRouter.post("/signin",validateSchema(),userController.signIn);

export default authRouter;