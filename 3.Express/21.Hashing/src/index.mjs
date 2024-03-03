import express from "express";

import routs from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
//import mangoose
import mongoose from "mongoose";

// import { userData } from "./utils/constants.mjs";

import "./strategies/localStrategy.mjs";

const app = express(); 

//connect mangoose
mongoose
  .connect("mongodb://localhost:27017/express_tutorial")
  .then(() => console.log(`connected to the database`))
  .catch((err) => console.log(err))

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

app.use(passport.initialize());
app.use(passport.session());

app.use(routs);
//moved to routes folder - authRoute
// app.post(
//   "/api/auth",
//   passport.authenticate("local", {
//     failureMessage: true,
//   }),
//   (req, res) => {
//     const {
//       body: { username },
//     } = req;
//     res.status(200).send({ msg: `Authenticated, welcome😍👌 ${username}` });
//   }
// );

// app.get("/api/auth/status", (req, res) => {
//   console.log(req.session);
//   const user = req.user;
//   return user ? res.send(user) : res.sendStatus(401);
// });

// app.post("/auth/logout", (req, res) => {
//   if (!req.user) return res.sendStatus(401);

//   req.logout((err) => {
//     if (err) return res.sendStatus(400);
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`serverMsg: {server running on port ${PORT}}`);
});
