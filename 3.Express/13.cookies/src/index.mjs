import express, { response } from "express";

import routs from './routes/index.mjs'

//cookie parser is alos a middleware, so we need to pass it as a middleware
import cookieParser from "cookie-parser"
 
const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3500;

//we need to enable the cookies before routes
// to avoid app.use(cookieParser())
// app.use(cookieParser()) //one can pass in optionals inside the cookies
app.use(cookieParser("cookie_value"))  //signed cookies

app.use(routs)

//receiving a cookie
//pretending this as a route we visit first before authenticating cookies then
//be able to access the route /api/products
app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.cookie("cookie_name", 'cookie_value', {maxAge: 30000, signed:true})
  res.send({msg: "cookie has been created"});
});

app.get('/cookie',function(req, res){
  let minute = 60 * 1000;
  res.cookie("cookie_name", 'cookie_value', { maxAge: minute });
  return res.send('cookie has been set!');
  });

//delete cookie
app.get("/deleteCookie", (req, res) => {
  res.clearCookie('cookie_name')
  res.send('cookie deleted ')
})

  
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
