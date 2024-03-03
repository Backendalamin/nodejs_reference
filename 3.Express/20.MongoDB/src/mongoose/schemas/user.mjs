import mongoose, { Schema } from "mongoose";

const userSChema = new mongoose.Schema({
  //we need to define data-types
  //if we were using Typescript
  //lets say some fields could be required or unique we can pass in
  //an object
  //required means it is needed
  //unique means cant add another field with same data
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  displayName: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});


//2: compile it into a modal
export const UserModel = mongoose.model('User', userSChema);



// wre use user model to perform operations like searching for a user

