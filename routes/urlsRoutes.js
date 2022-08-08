import { Router } from "express";
import {validatorSchema} from "../middleware/validateSchema.js";
import { validateToken } from '../middleware/validateAuth.js';
import urlsController from '../controllers/urlsController.js';
import urlSchema from "../schema/urlSchemas.js";

const urlsRouter=Router();
urlsRouter.post("/urls/shorten",validatorSchema(urlSchema),validateToken,urlsController.shortenURL);
urlsRouter.get("/urls/:id",urlsController.getURLById);
urlsRouter.delete("/urls/:id",validateToken,urlsController.deleteURL);
urlsRouter.get("/urls/open/:shortUrl",urlsController.openShortUrl);


export default urlsRouter;