import passport from "passport";

import { Strategy } from "passport-local";
import { userData } from "../utils/constants.mjs";
import { UserModel } from "../mongoose/schemas/user.mjs";
import { comparePasswords } from "../utils/helpers.mjs";

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

/* export default passport.use(
  new Strategy(async (username, password, done) => {
    // console.log(`username: ${username}`);
    // console.log(`password: ${password}`);

    try {
      //finnd the user
      const findUser = await UserModel.findOne({ username });
      if (!findUser) throw new Error(`Usser not found`);
      // if (findUser.password != password) throw new Error(`Bad credentials`);
      //instead of that lets use the comparePasswords() helper function
      //if comparePasswords() return false passwords dont match
      if (!comparePasswords(password, findUser.password))
        throw new Error(`Bad credentials`);
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
); */

// Bug report 

// It seems like the issue you're encountering is related to session management
// and how Passport handles user authentication and deserialization.

// When a user successfully logs in for the first time, Passport serializes the user object
// and stores it in the session. This means that subsequent requests within the same session
// will have access to the serialized user object.

// However, when you attempt to log in with incorrect credentials after a successful login,
// Passport might still find the serialized user object in the session and deserialize it,
// even though the credentials are incorrect. This behavior could lead to unexpected results, 
// uch as the user being authenticated even with incorrect credentials.

// To address this issue, you can modify your Passport strategy to clear 
// the session if the authentication fails. Here's how you can do it:

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username });
      if (!findUser) throw new Error(`User not found`);
      
      if (!comparePasswords(password, findUser.password)) {
        // Clear the session if authentication fails
        done(null, false, { message: "Incorrect username or password" });
        return;
      }
      
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
//send correct credentials for Juma authenticates successfully
/*{
  "username": "Jumagoti54",
  "password": "232323"
} */
//send wrong username login credential after initial authentication leads to an error
/*{
  "username": "JumagotiGFKS",
  "password": "232323"
} */

// Error: User not found
//     at Strategy._verify (file:///C:/dev/node_ref/3.Express/21.Hashing/src/strategies/localStrategy.mjs:69:28)
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

//sending the correct username but with wrong password finds the user but doesnt authorize the access
/*{
  "username": "Jumagoti54",
  "password": "WEsdf455"
} */

//This works well as needed 😍😍😍👌👌👌👌