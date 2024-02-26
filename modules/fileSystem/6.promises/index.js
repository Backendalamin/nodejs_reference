// const fs =require('fs')
// const path = require('path')

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'I have been changed again 😘😘', (err) => {
//     if(err) throw err
//     console.log(`write complete`)  

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nmore data in me to be added onCallBack', (err) => {
//         if(err) throw err
//         console.log(`append complete`)  

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'), (err) => {
//             if(err) throw err
//             console.log(`rename complete`)  
//         })
//     })
// })


//we controlling the execution flow but 
//this leads us to a callback hell

//solution using promises

const fsPromise = require('fs').promises
const path = require('path')

const filesOps = async () => {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data)
    }
    catch(err){
        console.error(err)
    }
}
filesOps()

//we can add more functions after every promise
const filesOps2 = async () => {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data)

        //we can even delete the original file starter since we wont 
        //use it anymore 
        await fsPromise.unlink(path.join(__dirname, 'files', 'starter.txt'))


        //add another async operation like writing into files
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiserite.txt'), data)

        //add another async operation like appending more data into file
        await fsPromise.appendFile(path.join(__dirname, 'files', 'promiserite.txt'), '\n\nI have been changed and more data in me now  😘😘')

        //we can go ahead and remame the file 
        await fsPromise.rename(path.join(__dirname, 'files', 'promiserite.txt'), path.join(__dirname, 'files', 'promiseRename.txt'))

        //lets read the new data
        const newdata = await fsPromise.readFile(path.join(__dirname, 'files', 'promiseRename.txt'), 'utf8')
        console.log(newdata)
    }
    catch(err){
        console.error(err)
    }
}
filesOps2()