const express = require("express");
const connectDb = require("./config/database");

const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();

    res.send("signup succefully!");
  } catch (error) {
    res.status(401).send(error.message);
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
app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data,{returnDocument:"after",runValidators:true});

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
