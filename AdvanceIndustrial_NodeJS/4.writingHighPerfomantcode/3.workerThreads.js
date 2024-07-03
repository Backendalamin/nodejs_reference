
const  http = require('http')
const  url  = require('url')
const querystring = require('querystring');
const { Worker } = require('worker_threads');
const { resolve } = require('path');
const { rejects } = require('assert');
const server = http.createServer((req, res) => {
    res.write('your request is being processed....\n')
    const query  = url.parse(req.url).query;
    const n = Number(querystring.parse(query)['n'])
    let sum = 0
  
})


server.listen(3000, () => {
    console.log(`server running on port 3000`)
})

function findSum(n){
    return new Promise((resolve, reject) => {
        const worker = new Worker("path to script", {workerData: {n}})
        worker.on("message", (data) => {
            resolve(data)
        })
        worker.on('error', reject)
    })
}