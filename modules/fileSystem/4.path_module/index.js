const fs = require('fs')

//the path module will help us get the path of the directory
//instead of hard coding it , hence preventing future problems
const path = require('path')

//exit on uncaught error, using the process api
// uncaughtException -- Adds the listener function to the end 
// of the listeners array for the event named eventName. 
// No checks are made to see if the listener has already
//  been added. Multiple calls passing the same combination
//   of eventNameand listener will result in the listener 
//   being added, and called, multiple times.
process.on('uncaughtException', err => {
    console.error(`there was an uncaught error ${err}`)
    //method instructs Node.js to terminate the process 
    //synchronously with an exit status of code
    process.exit(1)
})

//reading file from same root directory folder
fs.readFile(path.join(__dirname, 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err
    console.log(data) 
})

//reading file from different  directory folder on same root folder, should pass 
// dirname __dirname, 'directoryname' , 'filename'
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err
    console.log(data) 
})
