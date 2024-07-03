const http = require("http");
const { version } = require("os");
const url = require("url");
const queryString = require("querystring");
http
  .createServer((req, res) => {
    //console.log(url.parse(req.url))
    const path = url.parse(req.url);
    //then we can add queries and etc to the url to show them on that objcet
    const query = queryString.parse(path.query);
    if (path.pathname == "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'})
      res.write(`Hello World ${query["name"]}`);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Not Found')

    }
    res.end()
    console.log(query["name"]);

    //The writable.write() method writes some data to the stream, and calls the supplied callback
    //once the data has been fully handled. If an error occurs, the callback will be called with the
    //error as its first argument. The callback is called asynchronously and before 'error' is emitted.
    res.write("Hello World");
    //writable.end() method signals that no more data will be written to the Writable
    res.end();
  })
  .listen(3000);
console.log(`server running at port: ${3000}`);
//Req Objects - contain s info like :
//   - Http METHODS
//    - Http version
//    Http Headers
//     - Req Object
//     - cookies
//     - http url
