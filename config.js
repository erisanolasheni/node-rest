// 

var environments = {};


// Set container for staging
environments.staging = {
    httpPort: process.env.port || 3000,
    httpsPort: process.env.port || 3001,
    envName: 'staging',
    'keyFile': './https/key.pem',
    'certFile': './https/cert.pem',
}


// Set container for production
environments.production = {
    httpPort: process.env.port || 5000,
    httpsPort: process.env.port || 5001,
    envName: 'production',
    'keyFile': './https/key.pem',
    'certFile': './https/cert.pem',
}

// Get current environment
var currentEnvironment = typeof process.env.NODE_ENV !== 'undefined' ? process.env.NODE_ENV.toLowerCase() : 'staging'

console.log(currentEnvironment)
// Decide enviroment to export
module.exports = environments[currentEnvironment]