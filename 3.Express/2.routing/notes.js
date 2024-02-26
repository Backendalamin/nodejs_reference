//basic routing 
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

//2 - routing methods
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

// 3.Route paths
// Route paths, in combination with a request method, define the endpoints at which requests can be made.
//  Route paths can be strings, string patterns, or regular expressions.

// The characters ?, +, *, and () are subsets of their regular expression counterparts.
//  The hyphen (-) and the dot (.) are interpreted literally by string-based paths.

// If you need to use the dollar character ($) in a path string, 
//use https://www.npmjs.com/package/path-to-regexp  for matching the route paths;
// see the path-to-regexp documentation for all the possibilities in defining route paths

// This route path will match requests to /about.
app.get('/about', (req, res) => {
  res.send('about')
})