// install bcrypt
//npm i bcrypt

//create a helper.js inside utils

//use the hashPasword function to bind the data.password to it

// since we using comparison for authentication
//passing in the password on request for /api/auth 
//will return bad crdentials 401

//we need to go to strategy and modify it
//we need to hash the password from req and compare it with
// //bcrypt.compare or bcrypt.compareSync() is used to commpare 
//we can add it as a helper function in helper.js

//ther hashed passwords
