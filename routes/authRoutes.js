import { Router } from "express";
import {validatorSchema} from "../middleware/validateSchema.js";
import signUpSchema from "../schema/signUpSchema.js";
import signInSchema from "../schema/signInSchema.js";
import authController from "../controllers/authController.js";

const authRouter=Router();
authRouter.post("/signup",validatorSchema(signUpSchema),authController.signUp);
authRouter.post("/signin",validatorSchema(signInSchema),authController.signIn);

export default authRouter;