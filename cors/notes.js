https://dev.to/collegewap/how-to-solve-cors-error-in-nodejs-and-react-applications-36k2

//npm i cors
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" })
})

app.listen(port, () => {
  console.log(`Example app listening at Port: ${port}`)
})


// Making CORS domains configurable
// If you have multiple client origins to be connected to you, and you want them to be configurable, 
// you can do so by using environment variables:
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000

const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" })
})

app.listen(port, () => {
  console.log(`Example app listening at Port: ${port}`)
})

// Testing environment variables locally
// To test environment variables locally, you can install the package called dotenv:
npm i dotenv

// Now create a file called .env in the root directory of your project with the domains
CORS_DOMAINS = http://localhost:3000, http://localhost:3001, https://example.com
