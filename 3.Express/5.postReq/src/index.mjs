import express from "express";

import { readFile } from "node:fs/promises";
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

app.get("/", (req, res) => {
  res.send(eventsData);
});

const userData = [
  { id: 1, username: "alamin254", displayName: "Alamin" },
  { id: 2, username: "danielWizzy", displayName: "Daniel" },
  { id: 3, username: "PamSpider", displayName: "Parmenas" },
  { id: 4, username: "PerlChocolate", displayName: "Perl" },
  { id: 5, username: "Felicity", displayName: "Felistus" },
  { id: 6, username: "Holy", displayName: "Felistus" },
  { id: 7, username: "Griffins", displayName: "Felistus" },
  { id: 8, username: "TheJitu", displayName: "Felistus" },
];

//query params
app.get("/api/users", (req, res) => {
  // run http://localhost:3000/api/users?filter=alamin
  // console.log(req.query) //{ filter: "'alamin" }`
  //
  //lets go ahead and filter by username and a value
  //http://localhost:3000/api/users?filter=alamin&val=al
  const {
    query: { filter, value },
  } = req;

  

  //if filter and value are defined, - available
  
  if(filter && value)  return res.send(
    userData.filter(user => user[filter].includes(value))
    //run http://localhost:3000/api/users?filter=username&&value=da
    //only daniels data is retured after filter
  )

  //if no filter and no values, (undefined) return the whold data
  // if (!filter && !value) 
  return res.send(userData);
});

//we need a middle ware if we sending body of a certain type
//e.g json
app.use(express.json())

// POST REQUEST 
app.post('/api/users',(req, res) => {
  console.log(req.body)
  //destructure the body object
  const {body} = req
  const newUser = {id: userData[userData.length - 1].id + 1, ...body}
  userData.push(newUser)
  return res.status(201).send(newUser) 
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});

//POST is used to post data via a request body 
//use postman, insomonia
//thunder client extension on vs code