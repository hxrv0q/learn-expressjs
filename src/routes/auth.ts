import { Router } from "express";
import User from "../database/schemas/User";

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

authRouter.post("/logout", (request, response) => {
});

authRouter.post("/register", (request, response) => {
});

authRouter.get("/me", (request, response) => {
});

authRouter.post("/register", async (request, response) => {
  const { username, password, email } = request.body;
  const foundUser = await User.findOne({ $or: [{ username }, { email }] });
  if (foundUser) {
    return response.status(400).send({ msg: 'User already exists!' });
  }

  const newUser = await User.create({ username, password, email });
  newUser.save();

  return response.send(201);
});

export default authRouter;
