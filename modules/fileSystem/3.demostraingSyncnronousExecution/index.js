const fs = require('fs')

fs.readFile('./starter.txt', (err, data) => {
    if(err) throw err
    console.log(data.toString()) //Hey I am a file to be read
})

//second program
console.log('Hello I executed first, why🫨🫨? ')

fs.readFile('./starter.txt', 'utf8', (err, data) => {
    if(err) throw err
    console.log(`${data}`) //Hey I am a file to be read 
})

//node went to read the file first and hence went ahead to
//execute the second program first then came back and executed
// the file reading

// to avoid it, we can control it with callbacks
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

