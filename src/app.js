const express = require("express");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

const connectDb = require("./config/database");

const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const { userAuth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    //hashpassword

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

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

app.post("/login", async (req, res) => {
  try {
    const { _id, emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("you are not a user please signup first..!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      let token = await user.getJWT();
      console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.send("user login succefully..!");
    } else {
      throw new Error("please check your password");
    }
  } catch (error) {
    res.status(404).send("something went wrong" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("user profile is: " + user);
  } catch (error) {
    res.status(401).send("ERR:" + error.message);
  }
});

app.post("/sendConnectionReq", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName, "send connection request");
  } catch (error) {
    res.status(402).send("something went wrong! " + error.message);
  }
});

connectDb()
  .then(() => {
    console.log("database connected succefully!");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.error("database canot connected");
  });
