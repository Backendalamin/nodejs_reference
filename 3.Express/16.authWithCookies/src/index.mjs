import express, { response } from "express";

import routs from "./routes/index.mjs";

//cookie parser is alos a middleware, so we need to pass it as a middleware
import cookieParser from "cookie-parser";
import session from "express-session";

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
  res.cookie("cookie_name", "cookie_value", { maxAge: minute, signed: true });
  return res.send("cookie has been set!");
});


app.get("/api/prods", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);

  // Now, the session data is stored in the session object

  // Cache session in a cookie
  res.cookie("session_id", req.session.id, { signed: true });

  // Check if the cookie exists and matches
  if (
    req.signedCookies.session_id && req.signedCookies.cookie_name === "cookie_value"
    // req.signedCookies.session_id === req.session.id
  ) {
    return res.status(201).send({ msg: "Access ok" });
  }
  return res.status(401).send({ msg: "Access Denied" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
