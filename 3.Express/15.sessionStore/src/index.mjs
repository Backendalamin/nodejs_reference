import express, { response } from "express";

import routs from "./routes/index.mjs";

//cookie parser is alos a middleware, so we need to pass it as a middleware
import cookieParser from "cookie-parser";
import session from "express-session";

import { userData } from "./utils/constants.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3500;

//we need to enable the cookies before routes
// to avoid app.use(cookieParser())
// app.use(cookieParser()) //one can pass in optionals inside the cookies

//signedin cookies require a secret
app.use(cookieParser("mysecret"));
app.use(
  session({
    secret: "my-secret", // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(routs);

//receiving a cookie
//pretending this as a route we visit first before authenticating cookies then
//be able to access the route /api/products
app.get("/cookie", function (req, res) {
  let minute = 600 * 1000;
  req.session.visited = true;
  res.cookie("cookie_name", "cookie_value", { maxAge: minute, signed: true });
  return res.send("cookie has been set!");
});

app.post("/api/prods", (req, res) => {
  //destructure the bosy object in a single line
  const {
    body: { username, password },
  } = req;

  const findUser = userData.find((user) => user.username === username);

  if (!findUser || findUser.password != password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });

  //attaching dynamic props in js
  req.session.user = findUser;
  return res.status(201).send(findUser);
});

//make the server use that cookie to authenticate
app.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "NOT AUTHENTICATED" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
