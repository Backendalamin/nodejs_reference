import passport from "passport";
//every passport has its strategy class e.g
// import {Strategy } from "passport-facebook";
import { Strategy } from "passport-local";
import { userData } from "../utils/constants.mjs";
 

//to be done last we need to serialize the data
// takes the user object validated and storing it in session
passport.serializeUser((user, done) => {
    console.log(`Inside Serilaize object`)
    console.log(user)
  //null is for error
  //second argument needs to get a unique thing e.g id
  done(null, user.id);
});
//once you call the desrialize, then you can go and call the next middleware
//which is the (req, res) and just execute it like req.status(200).send({authMsg: `authenticated })
// app.post(
//     "/api/usersPost",
//     passport.authenticate("local"),
//     (req, res) => {
//     }
//   );



//passes what was pased as a unique key from serialize function
//db.findById is used for database queries

//we could just pass the user object here but its not recommended
//since someting unique like id never chasnges, but other values of the user may change
//hence authenticatiion will be hard for a second login 

//alo u dont need to pass in bunch of data to take up memory for no reason
// passport.deserializeUser((id, done) => {
//     userData.findById(id, (err, user) => {
//         done(err, user)
//     })
// })
//like use that session data from serialize
passport.deserializeUser((id, done) => {
    console.log(`Inside Deserialize object`)
    console.log(`Deserializing the user ID: ${id}`)
  try {
    const user = userData.find((user) => user.id === id);
    if (!user) throw new Error("User not found");
    //else return the user
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
//the desrialized user is not called on first request, i.e login or first post
// until the user ius serialized and iside the session,
//on a second request, we utilze the user ffrom that serilize by calling desrialize 
//midlleware from passport

export default passport.use(
  //creds passed via a request will be passed via
  //this called back func

  //passport requires that the filed passed is a
  //username and a password
  //if the fields passed are different e.g email,
  // then we need to pass in the options and tell
  // passport that the username here is the email field
  // being passed like this
  // new Strategy({ usernameField: 'myUsernameField', passwordField: 'myPasswordField' }, (username, password, done) => {

  new Strategy((username, password, done) => {
    //used to validate the user btw the object user from
    //server and the one in the database
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    //finfd your user in database and compare it with the requested user obj
    try {
      const findUser = userData.find((user) => user.username === username);

      //try catch help catch eror in case the user in not found
      //error will be caught in catch block
      if (!findUser) throw new Error("User not found");
      if (findUser.password != password) throw new Error("Invalid credentials");

      //the done here will take error as null since no errors occurred,
      // and a truthy user since it was found
      done(null, findUser);
    } catch (err) {
      //done here accespts the error and user falsey that was not validated
      // done: (error: any, user?: false | Express.User | undefined, options?: IVerifyOptions | undefined) => void
      done(err, null);
    }
  })
);
