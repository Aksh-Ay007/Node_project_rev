const express = require("express");
var cookieParser = require("cookie-parser");
const connectDb = require("./config/database");

const app = express();
app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use('/',userRouter)

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
