import { Router } from "express";
import {validateSchema} from "../middleware/validateSchema.js";
import {signUpSchema} from "../schema/signUpSchema.js";
import authController from "../controllers/authController.js";
import {signInSchema} from "../schema/signInSchema.js";

const authRouter=Router();
authRouter.post("/signup",validateSchema(signUpSchema),authController.signUp);
authRouter.post("/signin",validateSchema(signInSchema),authController.signIn);

export default authRouter;