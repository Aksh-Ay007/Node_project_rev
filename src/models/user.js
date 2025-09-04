const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },

  password: {
    type: String,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,

    validate(value){

      if(!["male","female","others"].includes(value)){

        throw new Error('this gender is not valid')
      }
    }
  },
  about: {
    type: String,
    default: "iam a hustler",
  },
  skills: {
    type: [String],
    validate(value){

      if(value.length>3){
        throw new Error("max 3 skills allowed");

      }
    }
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  },
},

{timestamps:true}
);

// const User = mongoose.model("User", userSchema);

// module.exports = User;


module.exports = mongoose.model("User", userSchema);
