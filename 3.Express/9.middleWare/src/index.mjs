import express from "express"

const app = express()

//we need a middleware if we sending body of a certain type
// e.g json
//Returns middleware that only parses json and only looks at 
//requests where the Content-Type header matches the type option.

const myMiddleWare = (req, res, next) => {
  console.log(`${req.url}`)
  next()
}

//i want to use this middleware righht before 
// I call request handler for byID
const resolveUserByIndex = (req, res, next ) => {
    const  {body, params: {id}} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex = userData.findIndex((user) => {
      return user.id === parsedId
    })
    if(findUserIndex === -1) return res.sendStatus(404)
    req.findUserIndex = findUserIndex
  next()
}

//lets go and use it to put, patch and delete
//we use it right before we send the put request 


//to register the middle ware gobally , 
// write app.use(yourMiddleWare)
//all methods will use the middle ware
// app.use(myMiddleWare)


// if you dont want this, you can pass it directly to the method you want
// app.get("/", myMiddleWare,  (req, res) => {
//   res.send('Hello word')
// })

//one can also pass it directly inside an endpoint like

/*app.get("/api/users", (req, res, next) => {
  //code to be executed before an endpoint is called
  //lets say, authentiate a JWT token from cookie before deleteing a user
  next()
},  (req, res) => {
  const {query : {filter, value}} = req
  if(filter && value) return res.send(userData.filter((user) => user[filter].includes(value)))
  res.send(userData)
})*/

//what happens if someone does not call the next method, 
// the api hangs


app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", myMiddleWare,  (req, res) => {
    res.send('Hello word')
})


const userData = [
    { id: 1, username: "alamin254", displayName: "Alamin" },
    { id: 2, username: "danielWizzy", displayName: "Daniel" },
    { id: 3, username: "PamSpider", displayName: "Parmenas" },
    { id: 4, username: "PerlChocolate", displayName: "Perl" },
    { id: 5, username: "Felicity", displayName: "Felistus" },
  ]

  //lets use resolveUserByIndex middleware here 
  app.get("/api/users/:id",resolveUserByIndex, (req, res) => {
  
    // const parsedId = parseInt(req.params.id)
   
    // if(isNaN(parsedId)) return res.status(400).send({message: "Bad request. Invalid id"})

    const {findUserIndex} = req
    // const findUser = userData.find(user => user.id === parsedId )
    const findUser = userData[findUserIndex]
    if(!findUser) return res.sendStatus(404) 
    res.send(findUser) 
  })


// add the middleware directly to an endpoint 
//one can add as much middlewares as they like

  app.get("/api/users", (req, res, next) => {
    //code to be executed before endpoint
    console.log(`${req.url}`)
    next( )
  }, (req, res) => {
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


app.put("/api/users/:id", resolveUserByIndex, (req, res) => {
  //since we binded req.findUserIndex to request of resolveUserByIndex
  //we can simply destructure findUserIndex in the incoming request
  const  {body, findUserIndex} = req

  // const parsedId = parseInt(id)
  // if(isNaN(parsedId)) return res.sendStatus(400)

  // const findUserIndex = userData.findIndex((user) => {
  //   return user.id === parsedId
  // })

  // if(findUserIndex === -1) return res.sendStatus(404)
  //all this logic was moved to our middleware function. so we don't need it

  userData[findUserIndex] = {id:userData[findUserIndex].id, ...body}
  return res.sendStatus(200) 
})


//use the middleware resolveUserByIndex we created also 
app.patch("/api/users/:id",resolveUserByIndex,  (req, res) => {
  // const  {body, params: {id}} = req
  const {body, findUserIndex}  = req

  // const parsedId = parseInt(id)
  // if(isNaN(parsedId)) return res.sendStatus(400)
  // const findUserIndex = userData.findIndex((user) => {
  //   return user.id === parsedId
  // })


  // if(findUserIndex === -1) return res.sendStatus(404)
  userData[findUserIndex] = {...userData[findUserIndex], ...body}
  return res.sendStatus(200)

})

//lets also add a middleware resolveUserByIndex here
app.delete("/api/users/:id",resolveUserByIndex, (req, res) => {
  // const  {body, params: {id}} = req
  const {body, findUserIndex} = req
  // const parsedId = parseInt(id)
  // if(isNaN(parsedId)) return res.sendStatus(400)
  // const findUserIndex = userData.findIndex((user) => {
  //   return user.id === parsedId
  // })
  // if(findUserIndex === -1) return res.sendStatus(404)
  userData.splice(findUserIndex, 1)
  return res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})