// Query Parameters: Query parameters are key-value pairs appended to the end of a URL after a question mark (?). 
// They provide a way to pass data to the server via the URL.

// URL Structure: Query parameters are added to the end of the URL separated by an ampersand (&).
//  Each parameter consists of a key-value pair separated by an equals sign (=).

// Usage in Routing: Query parameters are commonly used in HTTP GET requests to filter, sort, or 
// paginate data. They allow clients to specify additional information that the server can use to customize the response.

// Accessing Query Parameters: In Express.js, query parameters can be accessed from the req.query object. 
// This object contains properties representing the query parameters, where the property names are the
//  keys and the property values are the corresponding values.

// Route Definition: When defining routes in Express.js, you can specify routes that expect certain query parameters. For example:
app.get('/products', (req, res) => {
    const key = req.query.key; // Accessing query parameter 'key'
    const key2 = req.query.key2; // Accessing query parameter 'key2'
    // Perform operations based on the query parameters
    // Send back an appropriate response
});

// Multiple Query Parameters: Express.js automatically parses multiple query parameters and makes them available
//  in the req.query object. For example, for a URL like /products?key=value&key2=value2, 
//  both key and key2 will be accessible via req.query.key and req.query.key2 respectively.

// Validation and Sanitization: It's important to validate and sanitize query 
// parameters before using them in your application to prevent security vulnerabilities such 
// as injection attacks. Express.js provides various middleware and libraries for this purpose,
//  such as express-validator.

// Usage in Client-side Code: Query parameters can be included in URLs as 
// part of links or generated dynamically in client-side code