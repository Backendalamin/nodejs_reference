import express from "express"

const app = express()

//we need a middleware if we sending body of a certain type
// e.g json
//Returns middleware that only parses json and only looks at 
//requests where the Content-Type header matches the type option.

//go ahead and install body-parser
//POST., PUT, PATCH
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send('Hello word')
})


const userData = [
    { id: 1, username: "alamin254", displayName: "Alamin" },
    { id: 2, username: "danielWizzy", displayName: "Daniel" },
    { id: 3, username: "PamSpider", displayName: "Parmenas" },
    { id: 4, username: "PerlChocolate", displayName: "Perl" },
    { id: 5, username: "Felicity", displayName: "Felistus" },
  ]

  app.get("/api/users/:id", (req, res) => {
  
    const parsedId = parseInt(req.params.id)
   
    if(isNaN(parsedId)) return res.status(400).send({message: "Bad request. Invalid id"})

    const findUser = userData.find(user => user.id === parsedId )
    if(!findUser) return res.sendStatus(404) 
    res.send(findUser)
  })



  app.get("/api/users", (req, res) => {
    const {query : {filter, value}} = req
    if(filter && value) return res.send(userData.filter((user) => user[filter].includes(value)))
    res.send(userData)
  })

app.post("/api/users", (req, res) => {
  const {body} = req
  const newUser = {id: userData[userData.length - 1].id + 1, ...body }

  userData.push(newUser)
  return res.status(201).send(newUser)
})


//PUT REQUEST
app.put("/api/users/:id", (req, res) => {
  //from req object destructure the bosy and the id param
  const  {body, params: {id}} = req

  const parsedId = parseInt(id)
  if(isNaN(parsedId)) return res.sendStatus(400)

  //findUserIndex
  const findUserIndex = userData.findIndex((user) => {
    return user.id === parsedId
  })


  if(findUserIndex === -1) return res.sendStatus(404)

  //if the index is not -1 and availabel, we wil update that record with the whole body
  // being parsed except the id, so we can keep it same id = pasredID
  userData[findUserIndex] = {id: parsedId, ...body}
  return res.sendStatus(200)

})



//PATCH REQUEST

app.patch("/api/users/:id", (req, res) => {
  const  {body, params: {id}} = req

  const parsedId = parseInt(id)
  if(isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = userData.findIndex((user) => {
    return user.id === parsedId
  })


  if(findUserIndex === -1) return res.sendStatus(404)

  //we updaing that userData at that index with userData[findUserIndex] being passed
  // unblike the whole body, we will destructure that data at that index
  // then take all field and put them into a new object
  // so if we passed   { id: 3, username: "PamSpider", displayName: "Parmenas" },
  // and added username = "PamCoder", it will override trhe username daTA
  userData[findUserIndex] = {...userData[findUserIndex], ...body}
  return res.sendStatus(200)

})



// delete request

app.delete("/api/users/:id", (req, res) => {
  const  {body, params: {id}} = req

  const parsedId = parseInt(id)
  if(isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = userData.findIndex((user) => {
    return user.id === parsedId
  })


  if(findUserIndex === -1) return res.sendStatus(404)

  //delete that record
  //[] splice(index, 1) //delete one element at that index
  userData.splice(findUserIndex, 1)
  return res.sendStatus(200)

})




app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})