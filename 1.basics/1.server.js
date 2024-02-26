//commonjs
const os = require('os')
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

//path module
const path = require('path')
console.log(path.dirname(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))

//node js has a global object(global) and not a window object(window)
//--window is for client/browser
console.log(global)