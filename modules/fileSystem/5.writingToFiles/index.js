const fs = require('fs')

//the path module will help us get the path of the directory
//instead of hard coding it , hence preventing future problems
const path = require('path')

process.on('uncaughtException', err => {
    console.error(`there was an uncaught error ${err}`)
    //method instructs Node.js to terminate the process 
    //synchronously with an exit status of code
    process.exit(1)
})

//writing file from same root directory folder
//no need for utf8, its by default here
fs.writeFile(path.join(__dirname, 'lorem.txt'), 'I have just been written 😍😍', (err) => {
    if(err) throw err
    console.log(`write complete`) 
})

//writing file from different  directory folder on same root folder, should pass 
// dirname __dirname, 'directoryname' , 'filename', 'content to be written'
fs.writeFile(path.join(__dirname, 'files', 'lorem.txt'), 'I have been changed 😘😘', (err) => {
    if(err) throw err
    console.log(`write complete`)  
})

//to add more content to the file we use appendFile
fs.appendFile(path.join(__dirname, 'files', 'lorem.txt'), ' more data in me to be added', (err) => {
    if(err) throw err
    console.log(`append complete`)  
})

//we can even create a file if it does not exists 
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'I have been changed 😘😘', (err) => {
    if(err) throw err
    console.log(`write complete`)  
})

//to add more content to the file we use appendFile
fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), ' more data in me to be added', (err) => {
    if(err) throw err
    console.log(`append complete`)  
})

//all this synchronouas approach can be done asyncnronously
//like write into a file then immedietly invoke a callback function
//to add/append more content to that file
//this makes sure it executes in order
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'I have been changed again 😘😘', (err) => {
    if(err) throw err
    console.log(`write complete`)  

    //to add more content to the file we use appendFile
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nmore data in me to be added onCallBack', (err) => {
        if(err) throw err
        console.log(`append complete`)  
    })
})


//what if we need to do more staff after the file is appended,
// add a callback to the append file e.g 
//to rename the file after data is appended

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'I have been changed again 😘😘', (err) => {
    if(err) throw err
    console.log(`write complete`)  

    //to add more content to the file we use appendFile
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nmore data in me to be added onCallBack', (err) => {
        if(err) throw err
        console.log(`append complete`)  

        //rename file after append
        //Asynchronously rename file at oldPath to the pathname provided as newPath.
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'), (err) => {
            if(err) throw err
            console.log(`rename complete`)  
        })
    })
})


//we controlling the execution flow but 
//this leads us to a callback hell