const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises



const {logEvents} = require('./logEvents')
const EventEmmiter = require('events')

class EventEmmiter extends EventEmmiter {}

const myEmmitter = new EventEmmiter()

const PORT =    process.env.PORT || 3500

//server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
})

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})
// myEmmitter.on('log', msg => logEvents(msg))
// myEmmitter.emit('event', 'Log event emitted!' )
