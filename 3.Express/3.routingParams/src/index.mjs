import express from "express";
// In Node.js with ES modules (type: module), __dirname and
//  __filename aren't available directly as they are
//  in CommonJS modules. Instead, you can use
//  import.meta.url to get the current module's
//  URL and then extract the directory name from it.

import { readFile } from "node:fs/promises"; // Importing fs promises API for async file reading
import { fileURLToPath } from "node:url";
import path from "node:path";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the file asynchronously
const eventsData = await readFile(
  path.join(__dirname, "eventsData.json"),
  "utf-8"
);

const app = express();

//to route we need to add HTTP methods
//GET, POST, DELETE, PUT/PATCH

//request handler has two -params (request,response)
//req - containing anything related to the request body
//like the heade
app.get("/", (req, res) => {
  // console.log(eventsData)

  //send json
  //   res.send({msg: 'Hello'})

  //send status code
  //   res.status(201).send({msg: 'hello'})
  res.send(eventsData);
});

const userData = [
  { id: 1, username: "alamin254", displayName: "Alamin" },
  { id: 2, username: "danielWizzy", displayName: "Daniel" },
  { id: 3, username: "PamSpider", displayName: "Parmenas" },
  { id: 4, username: "PerlChocolate", displayName: "Perl" },
  { id: 5, username: "Felicity", displayName: "Felistus" },
];
app.get("/api/users", (req, res) => {
  res.send(userData);
});

//lets pretend the dat is coming from a database -table:users
//we need data of a particular user using their id
//define route parameters
app.get("/api/users/:id", (req, res) => {
  //we wil use the req..params.paramsName to access the params name
  // console.log(`${req.params}`) //{id: '5'}
  // console.log(`${req.params.id}`) //typeof re.params.id - string
  //yet in our database its an integer/number. lets convert it
  const parsedId = parseInt(req.params.id);
  //if we query something that not a number like  http://localhost:3000/api/users/ghjksdfvjkhdsjhk,
  // it will log NaN - not a number
  //hence we need to handle the error and maybe return a message like 'bad request'
  if (isNaN(parsedId))
    return res.status(400).send({ message: "Bad Request. Invalid id" });
  // console.log(parsedId)

  //find the user that matches the parsedId
  const findUser = userData.find((user) => user.id === parsedId);
  //if the user id does not exist in data return a 404 e.g  http://localhost:3000/api/users/7
  if (!findUser) return res.sendStatus(404); //not found
  //else return that user on that id  http://localhost:3000/api/users/4
  return res.send(findUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});
