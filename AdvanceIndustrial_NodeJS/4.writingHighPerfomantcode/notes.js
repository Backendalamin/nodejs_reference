// writing high performant code means making use of threadpools and event loops
//the incoming request shouldnt take alot of time executing in the event pool 
//since the event loop uses a single thread, hence should not be blocked or 

//How to not block the event loop
//1: a single responsibility per API or callback 
/**
 * 
 instead of doing all tasks in a single API like this
 app.post('/all-work , (req, res) => {
    work1()
    work2()
    work3()
})

separate each work into diferent API workers to finish quickly
this also means mainantaince is easy
 app.post('/work1 , (req, res) => {
    work1()
})

 app.post('/work2 , (req, res) => {
    work2()
})

 app.post('/work3 , (req, res) => {
    work3()
})

 */

//2. Keep constant number of time complexity 
//and using validation inputs to avoid blocking event loop
const  http = require('http')

const  url  = require('url')
const querystring = require('querystring');
const { executionAsyncResource } = require('async_hooks');
const server = http.createServer((req, res) => {
    const query  = url.parse(req.url).query;
    const n = Number(querystring.parse(query)['n'])
    let sum = 0
    for(let i = 0; i < n; i++ ) {
        sum+= i
    }
    res.end(String(sum))
})


server.listen(3000, () => {
    console.log(`server running on port 3000`)
})

//in this code running http://localhost:3000/?n=10 is really faster to compute 
//than running http://localhost:3000/?n=10334455 this takes more time to laod  

//funny enough is when the worker is loading heavily, sending another request even for smaller number like
//1 will be blocked and not executionAsyncResource
// run  http://localhost:3000/?n=1076456t6754576 then open another tab abd run http://localhost:3000/?n=1
//it wont execute

//How can we solve this issue
//validating input to a certain range if arithmetics ops are to be done in node js
//this is bcz arithmetic ops are execited in Node just like any other aritmentic code in JS
const query  = url.parse(req.url).query;
const n = Number(querystring.parse(query)['n'])
let sum = 0
//lets limit the number to be passed 
if (n > 1000000) {
    return res.end("Please enter a number less than 1000000")
}
for(let i = 0; i < n; i++ ) {
    sum+= i
}
res.end(String(sum))

//But what if you need to compute big numbers or you have time taking operations?

// SetImmediate - used to run code after next iteration of next loop
//event loop will give us priority to what runs next like Initialization, 
// Assignment and Registering async code before calling setImmediate function 
setImmediate(() => {
    console.log(`set immediate`)
})
const message = 'hello'
console.log(message)
/**
 * 
 * //hello printed before setImmediate call
hello
set immediate called
 */
    
