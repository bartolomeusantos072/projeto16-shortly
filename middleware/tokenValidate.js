import jwt from "jsonwebtoken";

import database from "../config/database.js";

export async function tokenValidate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const secretKey = process.env.JWT_SECRET;

  if (!token) return res.sendStatus(401);

  try {
    const data = jwt.verify(token, secretKey);

    if (!data) return res.sendStatus(401);

    const tokensResult = await database.query(`SELECT * FROM tokens WHERE token = $1`, [token]);

    if (tokensResult.rowCount === 0) return res.sendStatus(401);

    res.locals.tokensResult = tokensResult.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}