//route is basically a request url
app.get("/api/user/:id")

// but now we will use express router to handle request url 
//create a routes folder inside src

// req.cookies: Request. Cookies are supposed to be cookies that come from the client (browser) and Response.
//  Cookies are cookies that will send back to the client (browser). Cookies are small
//   files/data that are sent to the client with a server request and stored on the client side.
//    This helps us to keep track of the user’s actions.

// Cookie-parser is a middleware that parses cookies attached to the client request object.
//  When we use cookie-parser middleware then this property is an object that contains cookies sent by the request.
//   If the request contains no cookies, it defaults to { }.

Example:
 
const cookieParser = require('cookie-parser');  
const express = require('express');  
const app = express();  
const PORT = 3000;  
  
app.use(cookieParser());  
  
app.get('/user', function (req, res) {  
    req.cookies.name='Gourav';  
    req.cookies.age=12;  
  
    console.log(req.cookies);  
    res.send();  
});  
  
app.listen(PORT, function(err){  
    if (err) console.log(err);  
    console.log("Server listening on PORT", PORT);  
});
// Output: Now open your browser and make a GET request to http://localhost:3000/user, 
// now you can see the following output on your console:

// Server listening on PORT 3000
// [Object: null prototype] { name: 'Gourav', age: 12 }


// req.signedCookies: The req.signedCookies property contains signed cookies sent by the request,
//  unsigned, and ready for use when using cookie-parser middleware. Signing a cookie does not make
//   it hidden or encrypted but simply prevents tampering with the cookie. It works by creating 
//   a HMAC of the value (current cookie), and base64 encoded it. When the cookie gets read, it
//    recalculates the signature and makes sure that it matches the signature attached to it.If
//     it does not match, then it gives an error. If no signed cookies are sent then the property defaults to { }.

Example:

Javascript
 
const cookieParser = require('cookie-parser');  
const express = require('express');  
const app = express();  
const PORT = 3000;  
  
app.use(cookieParser());  
  
app.get('/user', function (req, res) {  
  
    // Setting multiple cookies  
    req.signedCookies.title='Gourav';  
    req.signedCookies.age=12;  
  
    console.log(req.signedCookies);  
    res.send();  
});  
  
app.listen(PORT, function(err){  
    if (err) console.log(err);  
    console.log("Server listening on PORT", PORT);  
});
// Output: Now open your browser and make a GET request to http://localhost:3000/user,
//  now you can see the following output on your console:

// Server listening on PORT 3000
// [Object: null prototype] { title: 'Gourav', age: 12 }