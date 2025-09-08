const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { status } = require("express/lib/response");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  async (req, res) => {
    try {
      const senderUserId = req.user._id;
      const { firstName } = req.user;
      const receiverUserId = req.params.receiverUserId;
      const status = req.params.status;

      const AllowedStatus = ["interested", "ignored"];

      if (!AllowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type " + status });
      }

      const toReciever = await User.findById(receiverUserId);

      if (!toReciever) {
        return res.status(400).json({ message: "user not found" });
      }

      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { senderUserId, receiverUserId },
          { senderUserId: receiverUserId, receiverUserId: senderUserId },
        ],
      });

      if (existingConnection) {
        return res
          .status(400)
          .json({ message: "connection request already exist" });
      }

      const connectionRequest = await new ConnectionRequest({
        senderUserId,
        receiverUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${firstName} is ${status} ${toReciever.firstName}`,
        data,
      });
    } catch (error) {
      res.status(402).send("something went wrong! " + error.message);
    }
  }
);

//accept or rejected

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      //1 akshay-aromal
      //loginUser=receiverUserId
      //status should be intersted in database
      //sending status should be accepted or ignored
      //requestId should be present in database

      const loginUser = req.user;
      const { status, requestId } = req.params;

      const Allowed_Status = ["accepted", "rejected"];

      if(!Allowed_Status.includes(status)){
        throw new Error("status is not allowed");

      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        receiverUserId: loginUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("connection request is not valide..!");
      }

      connectionRequest.status=status

      const data = await connectionRequest.save();

      res
        .status(200)
        .json({ message: `you have ${status} the friendRequest  `, data });
    } catch (error) {
      res.status(400).send("something went wrong..!" + error.message);
    }
  }
);

module.exports = { requestRouter };
