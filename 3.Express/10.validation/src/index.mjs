import express from "express";
//import express-validator
import { query, matchedData, validationResult, body } from "express-validator";

const app = express();

const myMiddleWare = (req, res, next) => {
  console.log(`${req.url}`);
  next();
};

const resolveUserByIndex = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = userData.findIndex((user) => {
    return user.id === parsedId;
  });
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", myMiddleWare, (req, res) => {
  res.send("Hello word");
});

const userData = [
  { id: 1, username: "alamin254", displayName: "Alamin" },
  { id: 2, username: "danielWizzy", displayName: "Daniel" },
  { id: 3, username: "PamSpider", displayName: "Parmenas" },
  { id: 4, username: "PerlChocolate", displayName: "Perl" },
  { id: 5, username: "Felicity", displayName: "Felistus" },
];

// app.get(
//   "/api/users",
//   //one can add as many middleware as possible
//   //middleware one
//   query('person').notEmpty().escape(),
//   //middleware 2
//   (req, res, next) => {
//     console.log(`${req.url}`);
//     next();
//   },
//   (req, res) => {
//     // const {query: { filter, value },} = req;
//     // if (filter && value)
//     //   return res.send(userData.filter((user) => user[filter].includes(value)));
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       //data will contain our params , filter and value
//       const data  = matchedData(req)
//       return res.send(userData.filter((user) => user[data.filter].includes(data.value)));
//     } else {
//           //else if params unavailable return error
//     res.send({ errors: result.array() });
//     }

//     //finally just return the userdata when queried without filters/avalues params
//     // res.send(userData)

//     //visit http://localhost:3000/api/users?filter=username&&value=da
//   }
// );

// app.get(
//   "/api/users",
//   query("filter").notEmpty().escape(),
//   query("value").notEmpty().escape(),
//   (req, res, next) => {
//     console.log(`${req.url}`);
//     next();
//   },
//   (req, res) => {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       const data = matchedData(req);
//       // Send filtered user data
//       return res.send(
//         userData.filter((user) => user[data.filter].includes(data.value))
//       );
//     } else {
//       // If params are not set, proceed to send all users
//       return res.send(userData);
//       // visit http://localhost:3000/sanitizedMatchedDataRequest?person=John
//     }
//   }
// );

app.get(
  "/api/users",
  [
    query("filter")
      .isString()
      .withMessage("must be a string") //by deafult the params are strings
      .notEmpty()
      .withMessage("must not be empty")
      .isLength({ min: 2, max: 10 })
      .withMessage("must be at between 2 and 10 characters")
      .escape(),
    query("value").isString().notEmpty().escape(),
  ],
  (req, res) => {
    const results = validationResult(req);

    // Check for validation errors
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated query parameters
    const { filter, value } = matchedData(req);

    if (results.isEmpty()) {
      const data = matchedData(req);
      // Send filtered user data
      return res.send(
        userData.filter((user) => user[data.filter].includes(data.value))
      );

      // Filter the user data based on filter and value
      // const filteredUsers = userData.filter((user) =>
      //   user[filter].includes(value)
      // );

      // // Return the filtered user data
      // return res.send(filteredUsers);
    }
  }
);

app.get("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { findUserIndex } = req;
  const findUser = userData[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  res.send(findUser);
});

//validating the request body
// const { body, validationResult } = require('express-validator');

app.post("/api/users", 
  [
    body("username")
      .notEmpty().withMessage("Username cannot be empty")
      .isLength({ min: 5, max: 12 }).withMessage("Username must be between 5 to 12 characters")
      .isString().withMessage("Username must be a string")
      .trim(), // Trimming whitespace from username

    // Add more validation rules for other fields if needed
    body("displayName").notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation succeeds, proceed to create a new user
    const data  = matchedData(req) //we will use matchedData to avoid xss attack
    // const newUser = {
    //   id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1, // Incrementing user ID
    //   ...req.body // Using the entire request body to create the new user
    // };
    const newUser = {
      id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1, // Incrementing user ID
      ...data // Using the entire request body to create the new user
    };


    userData.push(newUser);
    return res.status(201).send(newUser);
  }
);




app.put("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData[findUserIndex] = { id: userData[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData[findUserIndex] = { ...userData[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
