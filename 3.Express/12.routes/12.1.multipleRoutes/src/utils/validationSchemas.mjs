export const createUserValidationSchema = {
    username: {
        //what you want to validate 
        //.isLength({ min: 2, max: 10 })
        isLength : {
            options : {
                min: 5,
                max: 12,
            },
            errorMessage : "Username must be between 5 to 12 characters",
        },
        //notEmpty has no options
        notEmpty : {
            errorMessage : "Username can not be empty",
        },
        isString: {
            errorMessage : "Username must be a string",
        },
    },
    displayName : {
        notEmpty : {
            errorMessage : "displayName can not be empty",
        },
    }
}