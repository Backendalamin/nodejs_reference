const fs = require('fs')
const fsProm = require('fs').promises

//import modules like time fns amd uuid 
const dateTime = require('date-fns')
const {v4: uuid} = require('uuid')
const path = require('path')
//demonstrate 12-05-2023 uyiodhg465bao784 time-logged with a unique id

exports.logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid}\t${message}\n`
    console.log(logTime)

    try {
        //first we check if a folder doesnt exist hence we create it
        //then we create a file to the folder
        //then we appendData to it, so appendFile will automatically create
        //and append data to a file if didnt exist
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsProm.mkdir(path.join(__dirname, 'logs'))
        }
        await fsProm.appendFile(path.join(__dirname, 'logs', 'eventLogs.txt'), logItem)
        
    } catch (error) {
        console.log(error)        
    }
}
