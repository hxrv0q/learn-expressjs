import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import groceryRouter from "./routes/groceries";
import marketRouter from "./routes/markets";
import authRouter from "./routes/auth";

import { connectDb } from "./database";

const app = express();

const PORT = 3000;

connectDb();

app.use(express.json());
app.use(express.urlencoded());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(cookieParser());

app.use((request, _response, next) => {
  console.log(`${request.method}:${request.url}`);
  next();
});

app.use("/api/v1/auth", authRouter);

app.use((request, response, next) => {
  if (request.session.user) return next();

  return response.status(401).send("You must be logged in to do that.");
});

app.use("/api/v1/groceries", groceryRouter);
app.use("/api/v1/markets", marketRouter);

app.listen(PORT, () => console.log(`Running Express Server on port ${PORT}`));
