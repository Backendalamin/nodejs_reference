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
app.use(cookieParser("mysecret"))
app.use(session({
    secret: "my-secret", // a secret string used to sign the session ID cookie 
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie : {
        maxAge: 60000,
    }
}))


app.use(routs);

//receiving a cookie
//pretending this as a route we visit first before authenticating cookies then
//be able to access the route /api/products
app.get("/", (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  res.cookie("hello", "world", { maxAge: 30000, signed: true });
  res.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});


app.get('/cookie',function(req, res){
  let minute = 6 * 1000;
  res.cookie("cookie_name", 'cookie_value', { maxAge: minute, signed: true });
  return res.send('cookie has been set!');
});

//if the cookies is nott avalaible, 
// deny access 

//if available allow access 
app.get("/api/users" , (req, res) => {
  console.log(req.signedCookies.cookie_name)
  if(req.signedCookies.cookie_name && req.signedCookies.cookie_name === "cookie_value") {
      return res.status(201).send({msg: "Access ok"})
  }
 return  res.status(401).send({msg: "Access Denied"})
})


app.listen(3000)
  