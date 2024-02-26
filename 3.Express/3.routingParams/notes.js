// The req.params object in Express.js contains properties 
// mapped to the named route "parameters" in the route path.
//  These parameters are parts of the URL path that capture
//   values specified at those positions in the URL.

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  // Use userId for further processing
  res.send(`User ID: ${userId}`);
});

//   In this route definition, :userId is a route parameter. When a request is made to a URL like /users/123, 
//   Express extracts 123 from the URL and stores it in req.params.userId. So, req.params in this case would be { userId: '123' }.

//   The req.params object allows you to access these parameters and use them in your route handling logic.
//    It's particularly useful when you have dynamic URLs where parts of the URL serve as placeholders
//     for values that you want to extract and use in your application logic.

//   For example, in a blogging application, you might have routes like /posts/:postId to view a specific
//    post, where postId is extracted from the URL and then used to fetch the corresponding post from the database. 

// in addition to accessing route parameters directly by their name (req.params.userId), 
// the req.params object itself also provides other properties and methods:

// Property Names: The property names in req.params correspond to the named route parameters in the route definition.

// Property Values: The values of these properties are the actual values captured from the URL at runtime.

// hasOwnProperty() Method: You can use the hasOwnProperty() method to check if a specific route parameter 
// exists in the req.params object. For example:
if (req.params.hasOwnProperty('userId')) {
  // Do something
}


// keys() Method: You can use the keys() method to get an array of all the property names (route parameter names) 
// in the req.params object. For example:
const paramNames = Object.keys(req.params);


// values() Method: You can use the values() method to get an array of all the property 
// values (route parameter values) in the req.params object. For example:
const paramValues = Object.values(req.params);

