const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      receiverUserId: loginUser._id,
      status: "interested",
    }).populate("senderUserId", [
      "firstName",
      "lastName",
      "about",
      "skills",
      "photoUrl",
    ]);

    if (!connectionRequest || connectionRequest.length === 0) {
      throw new Error("you have not request yet..!");
    }

    res.json({ message: "request connections data", connectionRequest });
  } catch (error) {
    res.status(400).send("something went wrong " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { senderUserId: loginUser._id, status: "accepted" },
        { receiverUserId: loginUser._id, status: "accepted" },
      ],
    })
      .populate("senderUserId", [
        "firstName",
        "lastName",
        "gender",
        "photoUrl",
        "about",
        "skills",
      ])
      .populate("receiverUserId", [
        "firstName",
        "lastName",
        "gender",
        "photoUrl",
        "about",
        "skills",
      ]);

    const data = connections.map((row) => {
      if (row.senderUserId.equals(loginUser._id)) {
        return row.receiverUserId;
      }
      return row.senderUserId;
    });

    res.json({ message: "your connection requests are: ", connections: data });
  } catch (error) {
    res.status(400).send("something went wrong " + error.message);
  }
});

module.exports = { userRouter };
