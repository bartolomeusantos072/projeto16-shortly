import { Router } from "express";
import {validateSchema} from "../middleware/validateSchema.js";
import {signUpSchema} from "../schema/signUpSchema.js";
import userController from "../controllers/userController.js";
import signInSchema from "../schema/signInSchema.js";

const authRouter=Router();
authRouter.post("/signup",validateSchema(signUpSchema),userController.signUp);
authRouter.post("/signin",validateSchema(signInSchema),userController.signIn);

export default authRouter;