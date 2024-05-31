// Are REST APIs Stateless?
// Yes, REST (Representational State Transfer) APIs are designed to be stateless.
//  This means that each HTTP request from a client to the server must contain all
//   the information needed to understand and process the request. 
//   The server does not store any information about the client's
//    state between requests. Each request is treated as an 
//    independent transaction that is unrelated to any previous request.

// Benefits of Statelessness in REST APIs
// Scalability: Easier to scale because any server can handle any request since there is no session-specific information stored on the server.
// Simplicity: Simplifies server design as there is no need to manage client state.
// Reliability: Improved reliability since there is no session state to get corrupted or lost.
// Making a REST API Stateful
// While REST APIs are typically stateless, there are scenarios where stateful behavior is needed, 
// such as user sessions, transaction management, or complex workflows. Here are some methods to introduce statefulness:


// 1. Session Management via Cookies
// Store session identifiers in cookies that are managed by the client. The server maintains session information keyed by session IDs.
// Implementation:
// When a user logs in, generate a session ID and send it back to the client in a cookie.
// The client sends this cookie with each subsequent request.
// The server retrieves the session ID from the cookie and uses it to access the stored session data.
// Express.js example for setting a session cookie
app.post('/login', (req, res) => {
  // Authenticate user...
  const sessionId = generateSessionId();
  res.cookie('sessionId', sessionId, { httpOnly: true });
  res.send('Logged in');
});

app.get('/protected', (req, res) => {
  const sessionId = req.cookies.sessionId;
  const sessionData = getSessionData(sessionId);
  if (sessionData) {
    res.send('Protected content');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// 2. Token-Based Authentication (JWT)
// Use JSON Web Tokens (JWT) for maintaining client state across requests. Tokens are stateless themselves but can carry state information.
// Implementation:
// Upon authentication, issue a JWT containing user-specific information.
// The client includes the JWT in the Authorization header for each request.
// The server decodes the JWT to retrieve user state without storing session information.

// Express.js example for JWT-based authentication
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  // Authenticate user...
  const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secretKey');
    res.send('Protected content');
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});


// 3. Database-Backed State Management
// Use a database to store state information that can be accessed using a unique identifier provided by the client in each request.
// Implementation:
// Store user or transaction state in a database with a unique key.
// The client includes this key in each request.
// The server retrieves and updates the state using this key.

// Example using a key to manage state in a database
app.post('/start-transaction', (req, res) => {
  const transactionId = startTransactionInDatabase();
  res.json({ transactionId });
});

app.post('/continue-transaction', (req, res) => {
  const { transactionId, data } = req.body;
  const transaction = getTransactionFromDatabase(transactionId);
  if (transaction) {
    updateTransactionInDatabase(transactionId, data);
    res.send('Transaction updated');
  } else {
    res.status(404).send('Transaction not found');
  }
});


// Considerations
// Making a REST API stateful introduces complexity and can negate some of the benefits of REST. 
// It’s essential to weigh the trade-offs and ensure that stateful behavior is truly necessary 
// for your application. For many use cases, statelessness with strategies like token-based
//  authentication or client-side state management might be more appropriate.