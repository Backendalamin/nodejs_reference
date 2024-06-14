//route is basically a request url
app.get("/api/user/:id");

// but now we will use express router to handle request url
//create a routes folder inside src

// Cookie options you should expect to use
// secure. In production, you must always use HTTPS, and always enable the secure flag which stops the cookie from working over HTTP.
// httpOnly. You must always use this option for session cookies. httpOnly tells the browser the cookie should not be read or writable
// by JavaScript on the web page, which is the only protection from a class of common XSS attack.
// Note that not enabling this is effectively similar to using localStorage or sessionStorage, with all the security problems that has.
// SameSite. When you are using a single domain for your pages and server, you should set SameSite to lax or strict. If you are using multiple
// origins, you must set it to none. In either case, you must still provide separate CSRF mitigation. Theoretically,
// lax or strict should provide good CSRF mitigation, but it's better to also have explicit protection.

https://gist.github.com/samsch/3c2c98c415e1d5b15e37a272aa0b77f1
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      httpOnly: "auto",
      // sameSite:'None'
    },
  })
);


// Methods for cookie-parser
// cookieParser(secret, options)
// – This middleware takes two parameters. First one will be the secret Id and other will the options. The secret Id can be a string or an array of strings. If the secret parameter is not provided then it will take the cookie as
// unsigned cookie
// . Therefore, it is optional to provide the secret ID. The second parameter will be an object specifying what actions to be taken with the cookies. For example,
// decode
// is a function to decode the value of the cookie.
// cookieParser.JSONCookie(str)
// – This method will parse the value of the cookie as a JSON cookie. It will return the parsed JSON value if the cookie provided is a JSON cookie. If not a JSON cookie, it will return the passed value itself.
// cookieParser.JSONCookies(cookies)
// – Provided an object with its Id attached. This method will iterate over the Object Id’s provided and will call the “JSONCookie” on each value. It will replace the original value with the parsed value. This will return the same object that was passed in.
// cookieParser.signedCookie(string, secret)
// – This method parses the cookie as a signed cookie. If the cookie is a signed cookie and signature can be validated, then it will return the parsed unsigned value. If the cookie is unsigned, then the original value is returned. If the cookie is signed but the signature cannot be validated, then
// false
// is returned. Now, our second argument
// secret
// can be a string or an array of strings. If it is a string, then it will be used as a secret. If it is an array, then iteration over each element of the array will be done and the cookie will be unsigned using each secret.
// cookieParser.signedCookies(cookies, secret)
// – This method will perform the iteration over each ID and check if any ID is a signed cookie. If it is signed and the signature can be validated, then the ID will be deleted from the object will it will be added to the new returning object.
// Depending on the type of the cookie sent from the client, these methods will automatically be called.