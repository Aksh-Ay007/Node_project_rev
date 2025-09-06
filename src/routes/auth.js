const express = require("express");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    //hashpassword

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();

    res.send("signup succefully!");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("you are not a user please signup first..!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      let token = await user.getJWT();
      res
        .cookie("token", token, {
          expires: new Date(Date.now() + 1 * 3600000),
        })
        .send("user login succefully..!");
    } else {
      throw new Error("please check your password");
    }
  } catch (error) {
    res.status(404).send("something went wrong" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout the user succefully!..");
});

module.exports = { authRouter };
