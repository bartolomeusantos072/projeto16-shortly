import { Router } from "express";

import { getUser } from "../controllers/userController.js";
import { tokenValidate } from "../middleware/tokenValidate.js";

const usersRouter = Router();

usersRouter.get("/users/:id", tokenValidate, getUser);

export default usersRouter;