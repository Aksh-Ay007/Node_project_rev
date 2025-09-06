const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("this email is not validate please check" + value);
        }
      },
    },

    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("'hello pass word strong alla keto");
        }
      },
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },

      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("this gender is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "iam a hustler",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 3) {
          throw new Error("max 3 skills allowed");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo url" + value);
        }
      },
    },
  },

  { timestamps: true }
);

// const User = mongoose.model("User", userSchema);

// module.exports = User;

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "nodeRev@777!", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (UserPasswordInput) {
  const user = this;
  const passwordHash = user.password;

  const password = await bcrypt.compare(UserPasswordInput, passwordHash);
  return password;
};

module.exports = mongoose.model("User", userSchema);
