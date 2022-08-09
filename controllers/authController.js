import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { authRepository } from "../repositories/authRepository.js";

export async function signIn(req, res) {
  const signIn = req.body;
  const { email, password } = signIn

  try {
    const usersResult = await authRepository.getAuth(email);
    if (!(usersResult.rowCount > 0 && bcrypt.compareSync(password, usersResult.rows[0].password))) {
      return res.sendStatus(401)
    };

    const { id: userId } = usersResult.rows[0];

    const secretKey = process.env.JWT_SECRET;
    const expire = { expiresIn: 60 * 60 * 24 * 30 };
    const token = jwt.sign(signIn, secretKey, expire);

    await authRepository.postSignIn(userId, token);

    res.status(200).send(token);
  } catch (error) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const signUp = req.body;
  const { name, email, password } = signUp;

  try {
    const usersResult = await authRepository.getAuth(email);
    if (usersResult.rowCount > 0) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await authRepository.postSignUp(name, email, passwordHash);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}