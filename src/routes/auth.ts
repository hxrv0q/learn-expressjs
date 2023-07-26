import { Router } from "express";
import User from "../database/schemas/User";
import { comparePassword, hashPassword } from "../utils/helpers";
import passport from "passport";

const authRouter = Router();


authRouter.post(
  "/login",
  passport.authenticate("local"),
  async (_request, response) => {
    return response.send(200);
  },
);

authRouter.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return response.status(400).send({ msg: "User already exists!" });
  }

  const password = hashPassword(request.body.password);
  await User.create({ username, password, email });

  return response.send(201);
});

export default authRouter;
