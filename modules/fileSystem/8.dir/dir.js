const fs = require('fs')

//adding an error handler
if(!fs.existsSync('./new'))
fs.mkdir('./new' , (err) => {
    if(err) throw err

    console.log(`directory created`)
})

//delete dir
//if file exists remove it
if(fs.existsSync('./new'))
fs.rmdir('./new' , (err) => {
    if(err) throw err

    console.log(`directory removed`)
})