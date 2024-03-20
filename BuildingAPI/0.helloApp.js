var http = require("http");

var url = require("url");

var StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function (req, res) {
  //get the url and parse it
  var parsedURL = url.parse(req.url, true);
  //get the path
  var path = parsedURL.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get the headers as an object
  var headers = req.headers;
  //send the response

  //get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    //Choose the handler this request should go to
    var chosenHandler = router[trimmedPath] || handlers.notfound;

    //Construct the data object to send the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    //Route the request to the handler
    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      payload = typeof payload == "object" ? payload : {};

      var payloadString = JSON.stringify(payload);
      res.writeHead(statusCode);

      res.end(payloadString);

      //Log the path
      console.log("Returning this respond: ", statusCode, payloadString);
    });

    console.log("Request recieved on this path" + trimmedPath);

    server.listen(3000, function () {
      console.log(`server running on port, 3000`);
    });
  });
});
//define the handler
var handlers = {};


//sample handler
handlers.sample = function(data,callback) {
    callback(406, {'name' : 'sample handler'})
};

//not found handler
handlers.notfound = function(data, callback) {
    callback(404);
};


//define a request router

var router = {
    'sample' : handlers.sample

};

