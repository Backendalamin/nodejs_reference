const  http = require('http')

const  url  = require('url')
const querystring = require('querystring');
const { executionAsyncResource } = require('async_hooks');
const server = http.createServer((req, res) => {
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