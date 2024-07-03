//global variables
// console.log(process.env)
console.log(process.argv);
/*
[
    'C:\\Program Files\\nodejs\\node.exe',
    'c:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\1-basic\\0-globalVariables.js'
] */

//we can go ahead and add data to the array
//node filename title=node-basics
/*$ node 0-globalVariables title=node-basics
    [
      'C:\\Program Files\\nodejs\\node.exe',
      'C:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\1-basic\\0-globalVariables',
      'title=node-basics'
    ]*/
const startTime = process.hrtime();
//this is the time it will take to run 10000 elements
// for(let i = 0 ; i < 10000; i++) {}
const endTime = process.hrtime(startTime);
console.log("time it took", endTime); //time it took [ 0, 2800 ] in seconds and nanoseconds
//after adding the for loop of 10000 items
console.log("time it took", endTime[1] / 1000000); //time it took 0.1275 milliseconds

console.log(__filename, __dirname);

console.log(module);
/*
    {
  id: '.',
  path: 'c:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\1-basic',
  exports: {},
  filename: 'c:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\1-basic\\0-globalVariables.js',
  loaded: false,
  children: [],
  paths: [
    'c:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\1-basic\\node_modules',
    'c:\\Dev\\nodejs_reference\\AdvanceIndustrial_NodeJS\\node_modules',
    'c:\\Dev\\nodejs_reference\\node_modules',
    'c:\\Dev\\node_modules',
    'c:\\node_modules'
  ]
}
    */
