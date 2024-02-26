import express from "express";
const app = express();

app.use(express.json());

//sending tquery withoutr validfator whether person available or not
//http://localhost:3000/hello?person=John
app.get("/hello", (req, res) => {
  res.send(`Hello, ${req.query.person}!`);
});

//adding a validator
//we dont want to say hey if the name is not set right?
// http://localhost:3000/hello  will say hey - without the name since its empty param
//lets use validationResult to validate the request
// const { query, validationResult } = require('express-validator');
import { query,matchedData,  validationResult } from "express-validator"
app.get('/helloValidated', query('person').notEmpty(), (req, res) => {
  //notEmpty - const { query, validationResult } = require('express-validator');
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
    //visit http://localhost:3000/helloValidated?person=John

});

//if param is provided, return us the messege hey John!
//if no param added return an error
/*
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "person",
      "location": "query"
    }
  ]
}
*/


//3: sanitizing inputs
//visit  http://localhost:3000/helloValidated?person=<b>John</b> ,
// While the user can no longer send empty person names,
// it can still inject HTML into your page! This is known as the Cross-Site Scripting vulnerability (XSS).

//using escape sanitizer - transforms special HTML characters with others that can be represented as text.
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

// 4: use matchedData(), which automatically collects all data that
// express-validator has validated and/or sanitized:
//avoiding repetitive to type req.body.fieldName1,   req.body.fieldName2, and so on
// import { query,matchedData,  validationResult } from "express-validator"
app.get('/sanitizedMatchedDataRequest', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data  = matchedData(req)

    return res.send(`Hello, ${data.person}!`);
  }

  res.send({ errors: result.array() });
  //    //visit http://localhost:3000/sanitizedMatchedDataRequest?person=John
  // http://localhost:3000/sanitizedMatchedDataRequest?person=<b>John</b> return html to client hence avoid attackers xss

});


app.listen(3000);
