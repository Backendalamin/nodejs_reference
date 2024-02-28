import express, { response } from "express";
//import express-validator
import { query, matchedData, validationResult, body, checkSchema } from "express-validator";
import {createUserValidationSchema} from './utils/validationSchemas.mjs'
import router from './routes/index.mjs'
import {userData} from "./utils/constants.mjs"
// import userData from "../utils/constants.mjs" .exported using default

const app = express();


const myMiddleWare = (req, res, next) => {
  console.log(`${req.url}`);
  next();
};

// const resolveUserByIndex = (req, res, next) => {
//   const {
//     body,
//     params: { id },
//   } = req;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return res.sendStatus(400);
//   const findUserIndex = userData.findIndex((user) => {
//     return user.id === parsedId;
//   });
//   if (findUserIndex === -1) return res.sendStatus(404);
//   req.findUserIndex = findUserIndex;
//   next();
// };

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", myMiddleWare, (req, res) => {
  res.send("Hello word");
});

//register the  routes
app.use(router)

//remove this dwfinition here instead and use the route
// app.get(
//   "/api/users",
//   [
//     query("filter")
//       .isString()
//       .withMessage("must be a string") //by deafult the params are strings
//       .notEmpty()
//       .withMessage("must not be empty")
//       .isLength({ min: 2, max: 10 })
//       .withMessage("must be at between 2 and 10 characters")
//       .escape(),
//     query("value").isString().notEmpty().escape(),
//   ],
//   (req, res) => {
//     const {query: {filter, value} } = req;

//     if (filter && value) {
//       return res.send(
//         userData.filter((user) => user[filter].includes(value))
//       );
//     }
//     return res.send(userData)
//   }
// );

// app.get("/api/users/:id", resolveUserByIndex, (req, res) => {
//   const { findUserIndex } = req;
//   const findUser = userData[findUserIndex];
//   if (!findUser) return res.sendStatus(404);
//   res.send(findUser);
// });

//validating the request USING schema
// app.post("/api/users", 
//   checkSchema(createUserValidationSchema)
//   ,
//   (req, res) => {
//     const errors = validationResult(req);

//     // Check for validation errors
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const data  = matchedData(req) 
 
//     const newUser = {
//       id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1, ...data
//     };


//     userData.push(newUser);
//     return res.status(201).send(newUser);
//   }
// );

//post an empty object 




// app.put("/api/users/:id", resolveUserByIndex, (req, res) => {
//   const { body, findUserIndex } = req;
//   userData[findUserIndex] = { id: userData[findUserIndex].id, ...body };
//   return res.sendStatus(200);
// });

// app.patch("/api/users/:id", resolveUserByIndex, (req, res) => {
//   const { body, findUserIndex } = req;
//   userData[findUserIndex] = { ...userData[findUserIndex], ...body };
//   return res.sendStatus(200);
// });

// app.delete("/api/users/:id", resolveUserByIndex, (req, res) => {
//   const { body, findUserIndex } = req;
//   userData.splice(findUserIndex, 1);
//   return res.sendStatus(200);
// });

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
