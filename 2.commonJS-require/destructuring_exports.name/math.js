const add = (a,b) => (a + b)
const sub = (a,b) => (a - b)


//better idea you destructure all the functions in one name and export them
exports.mathFunctions = {add, sub}


//we can also add export.functionName to the function 
//and later destructure them where they
//will be used

exports.divide = (a,b) => a / b
exports.multiply = (a,b) => a * b
