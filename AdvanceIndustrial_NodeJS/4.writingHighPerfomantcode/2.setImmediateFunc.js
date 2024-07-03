setImmediate(() => {
    console.log(`set immediate call`)
})
const message = 'hello'
console.log(message)
for(let i = 0; i < 3; i++) {
    console.log(i)
}
//any javascript code runs after setImmediate function
//How to use Set Immediate to write non blocking code  
const  http = require('http')

const  url  = require('url')
const querystring = require('querystring');
const { executionAsyncResource } = require('async_hooks');
const server = http.createServer((req, res) => {
    res.write('your request is being processed....\n')
    const query  = url.parse(req.url).query;
    const n = Number(querystring.parse(query)['n'])
    let sum = 0
    //lets use setImmediate to avoid blocking 
    findSum(n, (sum) => {
        res.end(`The sum is ${sum} \n`)
    })
})


server.listen(3000, () => {
    console.log(`server running on port 3000`)
})

function findSum(n, sumCallback) {
    let sum = 0
    function add(i, cb) {
        sum +=i
         if(i == n) {
            return cb(sum)
        }
        setImmediate(add.bind(null, i +1, cb))
    }

    add(1, sumCallback)
}

//this code doesnt block code even while running big number 