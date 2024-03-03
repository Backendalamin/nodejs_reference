import passport from "passport";

import { Strategy } from "passport-local";
import { userData } from "../utils/constants.mjs";
import { UserModel } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serilaize object`);
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserialize object`);
  console.log(`Deserializing the user ID: ${id}`);
  try {
    const findUser = await UserModel.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    // console.log(`username: ${username}`);
    // console.log(`password: ${password}`);

    try {
      //finnd the user
      const findUser = await UserModel.findOne({ username });
      if (!findUser) throw new Error(`Usser not found`);
      if (findUser.password != password) throw new Error(`Bad credentials`);
      done(null, findUser)
    } catch (err) {
      done(err, null);
    } 
  })
);
