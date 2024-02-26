//destructure the same nmae from exports.objName
const {mathFunctions} = require('./math')
//mathFunctions dirs
console.log(mathFunctions.add(2,3)) //5

//use the function directly exported by destructuring
const {divide, multiply} = require('./math')
console.log(divide(9,3)) //3
console.log(multiply(3,4)) //12