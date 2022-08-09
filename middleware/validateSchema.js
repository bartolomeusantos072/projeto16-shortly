
import  signInSchema from '../schema/signInSchema.js';
import signUpSchema  from "../schema/signUpSchema.js";
import  urlSchema  from "../schema/urlSchemas.js"

export function schemaValidate(req, res, next) {
  const reqBody = req.body
  let schemaType = null;

  if (req.path === "/signin") schemaType = signInSchema
  else if (req.path === "/signup") schemaType = signUpSchema
  else if (req.path === "/urls/shorten") schemaType = urlSchema;

  const { error } = schemaType.validate(reqBody, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message))
  next();
};