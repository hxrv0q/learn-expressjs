import { connect } from "mongoose";

export function connectDb() {
  connect("mongodb://root:password@localhost:27017/express-mongo")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
}
