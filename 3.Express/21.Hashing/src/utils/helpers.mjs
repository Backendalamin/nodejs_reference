import bcrypt from "bcrypt";

const saltRounds = 10; //recommended by the docs
export const hashPassword = (password) => {
  //we need the plain password and the salt round
  //genSalt returns a promise is same as genSaltSync but calls it asyncronously
  //saame to hash and hashSync
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};
//if we used promise functions like genSalt and hash,
// we would be needed to add an async await
// export const hashPassword = async (password) => {
// const salt = await bcrypt.genSalt(saltRounds)
// console.log(salt)
// return bcrypt.hash(password, salt)
// }

// then where you call instanceof, you need to add an await like
// data.password =await  hashPassword()

//everytime we call the function, we pass in our password to hash and salt it
//before we create a user, we need to hash the password first
//in userRouter file, lets go make some changes

///a helper function to help us comapre passwords
//@param plain — The data to be encrypted.
//@param hashed — The data to be compared against.
export const comparePasswords = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);

//returns true or flase if passwords equal or not
