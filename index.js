var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');


// Create an HTTP server
var httpServer = http.createServer((req, res) => {
    serverFunction(req, res)
});

// Create an HTTPS server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = http.createServer(httpsServerOptions, (req, res) => {
    serverFunction(req, res)
});

var serverFunction = (req, res) => {
    // Get the parsed URL
    var parsedUrl = url.parse(req.url, true);

    // Get URL path
    var path = parsedUrl.pathname;

    // Get trimmed path name
    var trimmedPath = path.replace(/^\/+|\/+$/gm,'');

    console.log("Path: ",trimmedPath)

    // Get request method
    var method = req.method.toLowerCase()

    // Get request headers
    var headers = req.headers

    // Get payload and parse it in as utf-8
    decoder = new StringDecoder('utf-8')
    var buffer = ''

    // Get the query-strings as an object
    var queryString = parsedUrl.query

    // Parse the query string as on object
    var queryStringObject = JSON.stringify(queryString)

    // Listen to request data
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    // Choose an handler for the request

    var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    var data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer

    };

    // 
    var statusCode = 200

    // Call the chosenHandler methode

    chosenHandler(data, (statusCode, payload) => {

        var payload = typeof (payload) == 'object' ? payload : {}

        var payloadString = JSON.stringify(payload)
        var statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
        var responseHeader = {
            'Content-Type': 'application/json'
        }

        // Write the response head
        res.writeHead(statusCode, responseHeader)

        // Write the response body
        res.end(payloadString)
    })



    // End the buffer when the request is ended
    req.on('end', () => {
        buffer += decoder.end()
    })


}


// Set HTTP listen
httpServer.listen(config.httpPort, () => {
    console.log(`Now listening to port ${config.httpPort} through on ${config.envName}.`)
});

// Set HTTPS listen
httpsServer.listen(config.httpsPort, () => {
    console.log(`Now listening to port ${config.httpsPort} on ${config.envName} mode`)
});

// Create request handlers

var handlers = {
    hello: (data = null, callback) => {
        callback(200, {
            'message': `Hi, how're you doing?`
        })
    },
    notFound: (data = null, callback) => {
        callback(404, {
            'message': `Sorry, resource not found! maybe you mean a resource at /hello.`
        })
    }
}
// Create router

var router = {
    hello: handlers.hello
};



