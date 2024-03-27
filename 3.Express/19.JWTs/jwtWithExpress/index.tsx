const express = require("express")
const app = express()
//import token
const jwt = require("jsonwebtoken");
// To sign a token, you will need to have 3 pieces of information:

// The token secret
// The piece of data to hash in the token
// The token expire time

//using crypo to generate a token string
require("crypto").randomBytes(64).toString("hex");
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

//install the token in .emv npm install dotenv
const dotenv = require("dotenv");

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

//function for signeding tokens
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

// 
app.post('/api/createNewUser', (req, res) => {
    // ...
  
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  
    // ...
  });


//authenticating tokens
// custom middleware - when a request is made to a specific route, you can have the (req, res) 
// variables sent to an intermediary function 
// before the one specified in the app.get((req, res) => {}).  
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

// An example request using this middleware function would resemble something like this:
// GET https://example.com:4000/api/userOrders
// Authorization: Bearer JWT_ACCESS_TOKEN
app.get('/api/userOrders', authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
})
// This code will authenticate the token provided by the client. If it is valid, it can proceed 
// to the request. If it is not valid, it can be handled as an error

// 3:Handling client-side tokens
// When the client receives the token, they often want to store 
// it for gathering user information in future requests.
// The most popular manner for storing auth tokens is in an HttpOnly cookie.
// Here’s an implementation for storing a cookie using client-side JavaScript code:
// get token from fetch request
const token = await res.json();

// set token in cookie
document.cookie = `token=${token}`