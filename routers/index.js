import { Router } from "express";
import authRouter from "./authRouter.js";
import urlsRouter from "./urlRouter.js";
import userRouter from "./usersRouter.js";
import rankingRouter from "./rankingRouter.js";

const router=Router();
router.use(authRouter);
router.use(userRouter);
router.use(urlsRouter);
router.use(rankingRouter);

export default router;