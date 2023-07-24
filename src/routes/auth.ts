import { Router } from "express";
import User from "../database/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";

const authRouter = Router();

authRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;
  if (!email && !password) {
    return response.status(404);
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) return response.send(401);

  if (comparePassword(password, foundUser?.password)) {
    request.session.user = foundUser;
    return response.send(200);
  }

  return response.send(401);
});

authRouter.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return response.status(400).send({ msg: "User already exists!" });
  }

  const password = hashPassword(request.body.password);
  const newUser = await User.create({ username, password, email });

  return response.send(201);
});

export default authRouter;
