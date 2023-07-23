import { connect } from "mongoose";

export function connectDb() {
  connect("monodb://localhost:27017/learn-expressjs")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
}
