import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../database/schemas/User";
import { comparePassword } from "../utils/helpers";

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try {

    if (!email && !password) {
      throw new Error('Missing Credentials');
    }
    
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new Error('User not found');
    }
  
    if (comparePassword(password, foundUser?.password)) {
      return done(null, foundUser);
    }
  
    return done(null, null!);
  } catch (err) {
    return done(err, null!);
  }
}));