import express from "express";

import routs from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
//import passport
import passport from "passport";

import { userData } from "./utils/constants.mjs";

//import the functionality of passport.use middleware from startegies local
import "./strategies/localStrategy.mjs";

const app = express();

app.use(express.json());

app.use(cookieParser("mysecret"));
app.use(
  session({
    secret: "alamin254", // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

//enable passport before routes and after the sessions
app.use(passport.initialize());
//pass the passport to sessions
app.use(passport.session());

//you need to provide a name for your strategy when calling passport.use()
// passport.use("local", strategy); // Provide a name for the strategy (e.g., "local")

app.use(routs);

//to amke it simple, lets create an end point here
//but best practices put everyting in its own route
//pass in the passport middleware passport.authenticate("nameOfStrategy")
//passport.authenticate("discord") for discord strategy
//we using local
app.post(
  "/api/auth",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    const {
      body: { username },
    } = req;
    res.status(200).send({ msg: `Authenticated, welcome😍👌 ${username}` });
  }
);

app.get("/api/auth/status", (req, res) => {
  console.log(req.session)
  const user = req.user
  return user ? res.send(user) : res.sendStatus(401);
});
//hitting get http://localhost:3000/api/auth/status return s unauthorized 401
//until login first
//as soon as passport modifies the sessions, it adds passport to
/*Session {
  cookie: {
    path: '/',
    _expires: 2024-03-03T02:46:23.676Z,
    originalMaxAge: 3600000,
    httpOnly: true
  },
  passport: { user: 2 }
} */


//how to invalidate cookie even when its set on the client
// practical example of logout function
app.post("/auth/logout", (req, res) => {
  if(!req.user) return res.sendStatus(401)

  req.logout((err) => {
    if(err) return res.sendStatus(400)
  })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`serverMsg: {server running on port ${PORT}}`);
});
