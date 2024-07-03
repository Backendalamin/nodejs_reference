console.log(require('module').wrapper.toString())
//(function (exports, require, module, __filename, __dirname) { ,});
console.log(require)
//  resolve: [Function: resolve] { paths: [Function: paths] },
// this finds the full path and the extension if not provided

console.log(require.resolve('./notes.txt'))
//c:\Dev\nodejs_reference\AdvanceIndustrial_NodeJS\1-basic\notes.txt

console.log(require.extensions)
/*[Object: null prototype] {
  '.js': [Function (anonymous)],
  '.json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}*/


console.log(require.extensions['.js'].toString())