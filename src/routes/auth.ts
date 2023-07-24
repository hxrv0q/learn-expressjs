import { Router } from "express";
import User from "../database/schemas/User";
import { hashPassword } from "../utils/helpers";

const authRouter = Router();

authRouter.post("/login", (request, response) => {
  const { username, password } = request.body;
  if (username && password) {
    if (request.session.user) {
      return response.send("You are already logged in.");
    }

    request.session.user = { username };
    return response.send(request.session);
  }

  return response.status(400).send("You must provide a username and password.");
});

authRouter.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const foundUser = await User.findOne({ $or: [{ username }, { email }] });
  if (foundUser) {
    return response.status(400).send({ msg: "User already exists!" });
  }

  const password = hashPassword(request.body.password);
  const newUser = await User.create({ username, password, email });

  return response.send(201);
});

export default authRouter;
