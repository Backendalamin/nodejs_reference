https://express-validator.github.io/docs/

//validation on the server side is more important than even the client side
//an atacker could seend request to the server using any client like postman or the browser itself
// avooiding sending data from your websirte that has a form you added validation
//e.g a login form. 

// If they dont use your client and go ahead and send request to your server
// well you will be attacked even though your client is validated. 
// server data can come from anywhere , hence you need to secure your server api
// express-validator is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.

// It allows you to combine them in many ways so that you can validate and sanitize your express requests, and offers tools to determine 
// if the request is valid or not, which data was matched according to your validators, and so on.

import { query, validationResult } from "express-validator"
app.get('/helloValidated', query('person').notEmpty(), (req, res) => {
  //notEmpty - const { query, validationResult } = require('express-validator');
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
    //visit http://localhost:3000/helloValidated?person=John

});

//prints this error if empty

{
    "errors" :[
      {
        "location": "query",
        "msg": "Invalid value",
        "path": "person",
        "type": "field"
      }
    ]
  }

  /*
there's been exactly one error in this request;
the error is in a field (type: "field");
this field is called person;
it's located in the query string (location: "query");
the error message that was given was Invalid value. */ 

//3:sanitizing inputs 
// While the user can no longer send empty person names,
// it can still inject HTML into your page! This is known as the Cross-Site Scripting vulnerability (XSS).
//http://localhost:3000/helloValidated?person=<b>John</b> .....results to Hello, <b>John</b>!
// While this example is fine, an attacker could change the person query string to a <script> 
// tag which loads its own JavaScript that could be harmful.

// In this scenario, one way to mitigate the issue with express-validator is to use a sanitizer, 
// most specifically escape, which transforms special HTML characters with others that can be represented as text.
app.get('/sanitizedRequest', query('person').notEmpty().escape(), (req, res) => {
    //notEmpty - const { query, validationResult } = require('express-validator');
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(`Hello, ${req.query.person}!`);
    }
  
    res.send({ errors: result.array() });
      //visit http://localhost:3000/sanitizedRequest?person=John
      //return Hello, &lt;b&gt;John&lt;&#x2F;b&gt;! or Hello, <b>John</b>! instead of hello , John!
      //we no longer prone to xss attacks 
  
  });

  //4: accessing data
//   This application is pretty simple, but as you start growing it, 
//   it might become quite repetitive to type req.body.fieldName1,   req.body.fieldName2, and so on.

// To help with this, you can use matchedData(), which automatically collects all data that
// express-validator has validated and/or sanitized:
app.get('/sanitizedMatchedDataRequest', query('person').notEmpty().escape(), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data  = matchedData(req)
  
      return res.send(`Hello, ${data.person} ${data.value}!`);
    }
  
    res.send({ errors: result.array() });
    //    //visit http://localhost:3000/sanitizedMatchedDataRequest?person=John
  
  });
  //you can validate cookies, headers, route params etc using the same fomula