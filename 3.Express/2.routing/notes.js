//basic routing 
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

//2 - routing methods
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

// 3.Route paths
// Route paths, in combination with a request method, define the endpoints at which requests can be made.
//  Route paths can be strings, string patterns, or regular expressions.

// The characters ?, +, *, and () are subsets of their regular expression counterparts.
//  The hyphen (-) and the dot (.) are interpreted literally by string-based paths.

// If you need to use the dollar character ($) in a path string, 
//use https://www.npmjs.com/package/path-to-regexp  for matching the route paths;
// see the path-to-regexp documentation for all the possibilities in defining route paths

// This route path will match requests to /about.
app.get('/about', (req, res) => {
  res.send('about')
})



/*
The regular expression /:id([0-9a-z]{24}) is used in a route parameter
 to enforce specific formatting rules on the id parameter in a URL.
  Here’s a breakdown of its purpose and how it works:

Purpose

Validation: Ensures that the id parameter matches a specific pattern, 
which in this case is a 24-character string composed of numbers and lowercase letters.
Security: Prevents invalid or malicious inputs by restricting the format of the id parameter.

Data Integrity: Guarantees that the id parameter conforms to the expected structure, 
often corresponding to database identifiers such as MongoDB ObjectIDs.
Breakdown of the Regular Expression
:id - This denotes a named parameter called id in the route.
([0-9a-z]{24}) - This is the regular expression pattern that the id parameter must match:
[0-9a-z] - A character class that matches any digit (0-9) or lowercase letter (a-z).
{24} - Specifies that the preceding character class must occur exactly 24 times.
Example
If you have a route defined as:


app.get('/users/:id([0-9a-z]{24})', (req, res) => {
  // Handler code
});
This route will match URLs like /users/1234567890abcdef12345678 but not /users/123 or /users/ABCDEFGH1234567890123456.
If a request is made to /users/1234567890abcdef12345678, the handler will process it, and req.params.id will be 1234567890abcdef12345678.
If the id parameter in the URL does not match the pattern, the route will not match, and the request will proceed to other
 route handlers or result in a 404 response if no other matching routes are found.
Summary
The regular expression /:id([0-9a-z]{24}) ensures that the id parameter in the route is a 24-character 
string consisting of digits and lowercase letters, commonly used for validating MongoDB ObjectIDs in routes. 
This helps maintain data integrity and security by validating input directly within the route definition.




Regular Expression for Excluding White Spaces and Special Characters
To exclude white spaces and certain special characters, you can use a regular
 expression that matches only the allowed characters. For instance, if you want 
 to allow only alphanumeric characters (both uppercase and lowercase) and possibly 
 some special characters (like underscores or hyphens), you can use the following regex pattern:


^[a-zA-Z0-9_-]+$
Express Route with the Regular Expression
Here's how you can apply this regular expression to an Express route parameter:

const express = require('express');
const app = express();

// Route that matches the 'id' parameter with only alphanumeric characters, underscores, or hyphens
app.get('/users/:id([a-zA-Z0-9_-]+)', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

Explanation
:id - The named parameter in the route.
([a-zA-Z0-9_-]+) - The regular expression:
[a-zA-Z0-9_-] - Matches any uppercase or lowercase letter, digit, underscore, or hyphen.
+ - Ensures that the matched sequence has at least one of the allowed characters.
Example Requests
Valid Requests:

/users/johndoe123
/users/Jane_Doe
/users/user-456
Invalid Requests (will not match the route and likely result in a 404 response):

/users/john doe (contains a space)
/users/jane.doe! (contains a dot and an exclamation mark)
/users/user@456 (contains an at-sign)
More Restrictive Example
If you want to be even more restrictive (e.g., excluding underscores and hyphens), you can modify the regex accordingly:


app.get('/users/:id([a-zA-Z0-9]+)', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

This route will only accept alphanumeric characters,
 eliminating spaces, underscores, hyphens, and any other special characters.
*/