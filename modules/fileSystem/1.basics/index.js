const fs = require('fs')

fs.readFile('./starter.txt', (err, data) => {
    if(err) throw err
    console.log(data)
    //this will log the info in Buffer data
    //to read the data add a .toString()
    console.log(data.toString()) //Hey I am a file to be read
})

//we can also add a unicode utf8 if we dont want to use the
//toString() method
fs.readFile('./starter.txt', 'utf8', (err, data) => {
    if(err) throw err
    console.log(data) //Hey I am a file to be read 
})
