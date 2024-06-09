import express from 'express'
import { json } from 'body-parser'
import { errorHandler } from './middleware/errorHandler'
import config from './config'
import routes from './routes/index'

//Instantiate an Express Object
const app = express()
app.use(json)


////add error handling as the last middleware, jsut prior to our app.listen call
//this ensures that all errors are alwatys handled
app.use(errorHandler)

//Add our route object to the   Express Object
//This must be beofre the app.listen call . 
app.use('/' + config.prefix, routes)

//Have our API listen on the configured port 
app.listen(config.port, () => {console.log(`server running on port: ${config.port}`)})