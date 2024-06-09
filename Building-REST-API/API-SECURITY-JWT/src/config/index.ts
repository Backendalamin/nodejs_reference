import * as dotenv from 'dotenv'
dotenv.config()

// Create a configuration object to hold those environment variables.
const config = {
    //JWT importatnt viariables
    jwt: {
        //The secret is used to sign and validate signatures.
        secret: process.env.JWT_SECRET,
        //this audience and issuer are used for validation process
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    //the basic API port and prefix configuration values are:
    port: process.env.PORT || 3500,
    prefix: process.env.JWT_ISSUER
}
//make our confirmation object available to the rest of our code.
export default config