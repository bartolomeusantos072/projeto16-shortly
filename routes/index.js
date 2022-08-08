import { Router } from "express";
import authRouter from "./authRoutes.js";
import urlsRouter from "./urlsRoutes.js";
import userRouter from "./userRoutes.js";

const router=Router();
router.use(authRouter);
router.use(userRouter);
router.use(urlsRouter);


export default router;