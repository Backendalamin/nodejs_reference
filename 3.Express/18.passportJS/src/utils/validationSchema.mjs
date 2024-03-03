export const createValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username can not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 12,
      },
      errorMessage: "Username must be between 5 and 12 characters",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName cannot be empty",
    },
  },
};

//then you need to pass this object isnide checkSchema function