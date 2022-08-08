import { Router } from "express";
import {validatorSchema} from "../middleware/validateSchema.js";
import signUpSchema from "../schema/signUpSchema.js";
import signInSchema from "../schema/signInSchema.js";
import {signIn,signUp} from "../controllers/authController.js";

const authRouter=Router();
authRouter.post("/signup",validatorSchema(signUpSchema),signUp);
authRouter.post("/signin",validatorSchema(signInSchema),signIn);

export default authRouter;