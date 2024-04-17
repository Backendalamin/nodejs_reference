import express from "express";

import { readFile } from "node:fs/promises"; 
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eventsData = await readFile(
  path.join(__dirname, "eventsData.json"),
  "utf-8"
);

const app = express();

app.get("/", (req, res) => {
  res.send(eventsData);
});

//lets pretend the dat is coming from a database -table:users
//we need data of a particular user using their id
//define route parameters
const userData = [
    {id: 1, username: 'alamin254' , displayName: 'Alamin'},
    {id: 2, username: 'danielWizzy' , displayName: 'Daniel'},
    {id: 3, username: 'PamSpider' , displayName: 'Parmenas'},
    {id: 4, username: 'PerlChocolate' , displayName: 'Perl'},
    {id: 5, username: 'Felicity' , displayName: 'Felistus'},
]
app.get('/api/users', (req,res) => {
    res.send(userData)  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});


 