import express, { response } from "express";

import routs from "./routes/index.mjs";

//cookie parser is alos a middleware, so we need to pass it as a middleware
import cookieParser from "cookie-parser";
import session from "express-session";

import { userData } from "./utils/constants.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

//we need to enable the cookies before routes
// to avoid app.use(cookieParser())
// app.use(cookieParser()) //one can pass in optionals inside the cookies

//signedin cookies require a secret
app.use(cookieParser("mysecret"));
app.use(
  session({
    secret: "my-secret", // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(routs);

// app.get("/cookie", function (req, res) {
//   let minute = 600 * 1000;
//   req.session.visited = true;
//   res.cookie("cookie_name", "cookie_value", { maxAge: minute, signed: true });
//   return res.send("cookie has been set!");
// });

//receiving a cookie
//pretending this as a route we visit first before authenticating cookies then
//be able to access the route /api/products
app.post("/api/prods", (req, res) => {
  //destructure the bosy object in a single line
  const {
    body: { username, password },
  } = req;

  const findUser = userData.find((user) => user.username === username);

  //modify session object to stop generating new session every  time
  //set the cookie and send it back to the client
  //when client send another request, the server looks up into the cookie
  // for session data and resolve same path reqs like auth e.g login for same user

  if (!findUser || findUser.password != password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });

  //attaching dynamic props in js
  req.session.user = findUser;
  return res.status(201).send(findUser);
});

//make the server use that cookie to authenticate
//since we biunded it in req.session
// server will receive the cookie and parse it and take session id and
//map session object to session object
//and authenticate
app.get("/api/auth/status", (req, res, next) => {
  // console.log(req.session);

  //get where the session is stored. here the session store
  //is simply in memory, memory of the computer
  req.sessionStore.get(req.sessionID, (error, sessionData) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(req.sessionID);
    console.log(sessionData);
  });

  //get username from req.session
  const {
    user: { username },
  } = req.session; //avoid req.session.user.username
  return req.session.user
    ? res
        .status(200)
        .send({ msg: ` ${username} Authenticated successfully 👌👌👌` })
    : res.status(401).send({ msg: "NOT AUTHENTICATED" });
});

//you can test on diferent clients like postman and thunderclient with differnt users
//every user will be authenticated since they will be assigned dfifferent sessionIDs

//i also found a bug,
//lets say we send the correct payload on first /api/auth or /api/prods to set a session
/*{
  "username": "PerlChocolate",
  "password" : "hello123"
} */

//then i send the /api/auth/status for
/*{
  "username": "PerlChocolate",
  "password" : "hello123"
} */
// it will say authenticated successfully,
//but now when i change the data of the username and password a second time while the cookie is still set
/*{
  "username": "PerlChocolate123412s",
  "password" : "hello123dfwee"
} */

//the request still authenticates , how can we solve it

// To solve the issue where the session still appears authenticated even after changing the username and password,
// you need to ensure that you're validating the credentials against the session data on every request. Currently,
// you're only checking if there's a user object in the session, but you're not verifying if the credentials in the
// session match the current user's credentials.

// Here's a breakdown of the issue and how to address it:

// Problem:

// The authentication relies on the session data stored in the cookie.
// Once a valid session is created, subsequent requests with different username/password combinations are still authenticated as long as the cookie is present.
// Solution:

// Revalidate Credentials on Every Request:

// In the /api/auth/status route, retrieve the user data from the database again using the provided username and password.
// Compare this retrieved data with the findUser object stored in the session.
// If they don't match, consider the credentials invalid and respond with a 401 Unauthorized error.
// Implement Session Invalidation:

// When a user logs out or their credentials change, invalidate the existing session to ensure they have to re-authenticate.
// Achieve this by setting an expiration time for the cookie or explicitly destroying the session using req.session.destroy().

app.get(
  "/api/auth/status/validatingCredentialsAgainstSessiondataOnEveryRequest",
  async (req, res, next) => {
    const {
      body: { username, password },
    } = req;

    const findUser = userData.find((user) => user.username === username);

    if (!findUser || findUser.password !== password) {
      return res.status(401).send({ msg: "BAD CREDENTIALS" });
    }

    req.session.user = findUser; // Update session data with the current user

    try {
      const { username } = findUser;
      await matchUserCredentials(req.body); // Matching against second incoming payload
      return res
        .status(201)
        .send({ AuthMsg: ` ${username} authenticated successfully 😍😍` });
    } catch (error) {
      console.error("Error matching user credentials:", error);
      // Handle error here
      return res.status(401).send({ msg: "BAD CREDENTIALS" });
    }
  }
);

async function matchUserCredentials(payload) {
  const { username, password } = payload;
  const currentUser = userData.find((user) => user.username === username);

  if (!currentUser || currentUser.password !== password) {
    throw new Error("Invalid credentials");
  }
}

//now it works well
//we wait for the user to be loaded before comparisons
//thiss can be simplified liek this
app.get(
  "/api/auth/status/validateCredentialsAgainstSessiondataOnEveryRequest",
  (req, res, next) => {
    const {
      body: { username, password },
    } = req;

    //    // Revalidate credentials from database on every request
    const currentUser = userData.find((user) => user.username === username);
    try {
      if (currentUser && currentUser.password === password) {
        // Credentials match, proceed
        return res
          .status(200)
          .send({ msg: `${username} Authenticated successfully  🤯🤯🤯🤯 ` });
      } else {
        // Credentials don't match, invalidate session and respond with error
        req.session.destroy(); // Invalidate session
        return res.status(401).send({ msg: "Invalid credentials" });
      }
    } catch (error) {
      // Handle database errors
      console.error(error);
      res.status(500).send({ msg: "Internal server error" });
    }
  }
);

//another important thing, always make sure you do validation on your reuest like the body being sent

//last example adding cart data for authenticated users
app.post("/api/cart", (req, res) => {
  //if no user, return not authenticated to post cart
  const { body: item } = req;
  //setting a cart in the session to push items
  const { cart } = req.session;
  //if cart in session
  if (cart) {
    //if item not in cart, add it to cart
    cart.push(item);
  } else {
    //if item in cart, just return the item to that cart
    req.session.cart = [item];
  }
  res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  //if no user, return not authenticated to post cart
  if (!req.session.user)
    return res
      .status(401)
      .send({ msg: `can not get  cart items, please login/register` });
  //else get the cart from the session else just an empty cart if no items previously added
  res.status(201).send(req.session.cart ?? []) ;
});

app.listen(PORT, () => {
  console.log(`serverMsg: {server running on port ${PORT}}`);
});
 