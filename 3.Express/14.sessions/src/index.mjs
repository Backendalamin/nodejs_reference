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
app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.cookie("hello", "world", { maxAge: 30000, signed: true });
  res.status(201).send({ msg: "Hello" });
});



app.get("/cookie", function (req, res) {
  let minute = 600 * 1000;
  res.cookie("cookie_name", "cookie_value", { maxAge: minute, signed: true });
  return res.send("cookie has been set!");
});

//if the cookies is nott avalaible,
// deny access

//if available allow access
// app.get("/api/prods" , (req, res) => {
//   console.log(req.session)
//   console.log(req.session.id)
//   console.log(req.signedCookies.cookie_name)
//   if(req.signedCookies.cookie_name && req.signedCookies.cookie_name === "cookie_value") {
//       return res.status(201).send({msg: "Access ok"})
//   }
//  return  res.status(401).send({msg: "Access Denied"})
// })

//this scenario works well but each time
// the signedCookie id changes om every request. This is not
//good scenario for places where we need to resolve same pages for same
//user sessions since the id changes e.g login , will lead to log out each time
//here are the session ids
// ZmzPeQXjThf-J8CCwrKczj2OLO_Z5DP0
// Nm0mGw7kyJxRNhlFonl2S6P8A0k9snF1
// 14kMLhtkCciU0_NMWOjE7E3CT2N_DskG

//we need to modify the espress session with cookie setter
//client will save the cookie and on subrequent reqs to the server
//(if the cookie not invalid and not experied, the server
// wiil not generate a new cookie )

//lets modify the session to ref the cookie
app.get("/api/prods", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);

  //get where the session is stored. here the session store 
  //is simply in memory, memory of the computer
  req.sessionStore.get(req.session.id, (error, sessionData) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(sessionData);
  });

  //now the session is store of in memeory storage.
  //this case isnt good since when we log out, 
  // memory is cleared e.g in authentication issues
  /*{
    cookie: {
      originalMaxAge: 60000,
      expires: '2024-02-28T23:51:36.435Z',
      httpOnly: true,
      path: '/'
    },
    visited: true
  }*/

  // we need to reference the session in a cache or a database
  //cache session in a cookie
  req.session.visited = true;
  console.log(req.signedCookies.cookie_name);
  if (
    req.signedCookies.cookie_name &&
    req.signedCookies.cookie_name === "cookie_value"
  ) {
    return res.status(201).send({ msg: "Access ok" });
  }
  return res.status(401).send({ msg: "Access Denied" });
});

//now the id remains same
// Vz8F0PP_elKuEz9tAj3cG2ZIyPBVvsrJ
// Vz8F0PP_elKuEz9tAj3cG2ZIyPBVvsrJ
/*Session {
  cookie: {
    path: '/',
    _expires: 2024-02-28T21:44:13.043Z,
    originalMaxAge: 60000,
    httpOnly: true
  },
  visited: true
}
Y62vVQmP_LnSplLx0NPjwv-fdr_fHx7G
cookie_value */

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});