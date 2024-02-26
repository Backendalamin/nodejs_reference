const fs = require('fs')

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

//go ahead and read an non-esiting file
fs.readFile('./starterHello.txt', 'utf8', (err, data) => {
    if(err) throw err
    console.log(data) 
})
//there was an uncaught error Error: ENOENT: no such file or 
// directory, open ' C:\dev\node_ref\modules\fileSystem\starterHello.txt' 