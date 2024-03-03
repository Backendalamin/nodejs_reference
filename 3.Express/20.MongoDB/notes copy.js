//install passport and passport-local
// npm i passport passport-local

/*passport.session()
Middleware that will restore login state from a session.

Web applications typically use sessions to maintain login
 state between requests. For example, a user will authenticate 
 by entering credentials into a form which is submitted to the 
 server. If the credentials are valid, a login session is
  established by setting a cookie containing a session
   identifier in the user's web browser. The web browser 
   will send this cookie in subsequent requests to the 
   server, allowing a session to be maintained.

If sessions are being utilized, and a login session
 has been established, this middleware will populate 
 req.user with the current user.

Note that sessions are not strictly required for
 Passport to operate. However, as a general 
 rule, most web applications will make use of 
 sessions. An exception to this rule would be
  an API server, which expects each HTTP request 
  to provide credentials in an Authorization header.

Examples:

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
Options:

pauseStream Pause the request stream before
 deserializing the user object from the 
 session. Defaults to false. Should be set to
  true in cases where middleware consuming the
   request body is configured after passport and
    the deserializeUser method is asynchronous. */


//strategies are responsible for authenticating requests
https://www.passportjs.org/concepts/authentication/strategies/

//passport tutorial 
https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5


//explainig serialize and deserialize passport
https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// How would you explain the workflow of Passport's serialize and deserialize methods to a layman.

// Where does user.id go after passport.serializeUser has been called?

// We are calling passport.deserializeUser right after it where does it fit in the workflow?

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/*
Where does user.id go after passport.serializeUser has been called?
The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

We are calling passport.deserializeUser right after it where does it fit in the workflow?
The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

The fetched object is attached to the request object as req.user

Visual Flow

passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});

*/