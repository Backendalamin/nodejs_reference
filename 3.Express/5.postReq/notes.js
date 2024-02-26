//middlewares - a function to be invoked before an api is invoked
app.use(express.json)

//we need a middle ware if we sending body of a certain type
//e.g json
app.use(express.json())

// POST REQUEST 
app.post('/api/users',(req, res) => {
  console.log(req.body)
  return res.send(200) 
})
