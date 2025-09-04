const express = require("express");
const bcrypt = require("bcrypt");
const connectDb = require("./config/database");

const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");

const app = express();

app.use(express.json());

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
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("you are not a user please signup first..!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("user login succefully..!");
    }
    else{
      throw new Error("please check your password");

    }
  } catch (error) {
    res.status(404).send("something went wrong" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      res.send("user not found!");
    }

    if (user.length === 0) {
      res.status(404).send("user not found!");
    }

    res.send(user);
  } catch (error) {
    res.status(404).send("something went wrong!");
  }
});

app.get("/userId", async (req, res) => {
  const userId = req.body._id;

  try {
    const user = await User.findById({ _id: userId });
    res.send(user);
  } catch (error) {
    res.status(401).send("something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(401).send("something went wrong!");
  }
});

// app.delete("/userDelete", async (req, res) => {
//   const userId = req.body.id;
//   try {
//     await User.findByIdAndDelete({ _id: userId });
//     //  await User.findByIdAndDelete(userId)

//     res.send("user deleted succefully!");
//   } catch (error) {
//     res.status(401).send("something went wrong!");
//   }
// });
app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);
  const data = req.body;

  try {
    const Allowed_Updates = ["age", "about", "skills", "photoUrl"];

    const isAllowed_Updates = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k)
    );

    if (!isAllowed_Updates) {
      throw new Error("bro update is not allowed for this field!..");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      throw new Error("user is not here");
    }

    res.send(user, "update succefully!");
  } catch (error) {
    res.status(401).send(error.message);
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
