import { Router } from "express";


import { tokenValidate } from "../middleware/tokenValidate.js";
import { schemaValidate } from "../middleware/validateSchema.js";
import { deleteURL, getURL, openURL, postURL } from "../controllers/urlsController.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidate, schemaValidate, postURL);
urlRouter.get("/urls/:id", getURL);
urlRouter.get("/urls/open/:shortUrl", openURL);
urlRouter.delete("/urls/:id", tokenValidate, deleteURL);

export default urlRouter;