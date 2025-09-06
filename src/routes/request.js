const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  async (req, res) => {
    try {
      const senderUserId = req.user._id;
      const receiverUserId = req.params.receiverUserId;
      const status = req.params.status;

      const AllowedStatus = ["interested","ignored"];

      if(!AllowedStatus.includes(status)){
        return res.status(400).json({message:"invalid status type "+ status})
      }

      const toReciever=await User.findById(receiverUserId)

      if(!toReciever){
      return  res.status(400).json({message:"user not found"})
      }


      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { senderUserId, receiverUserId },
          { senderUserId: receiverUserId, receiverUserId: senderUserId }
        ],
      });


      if(existingConnection){

        return res.status(400).json({message:"connection request already exist"})
      }

      const connectionRequest = await new ConnectionRequest({
        senderUserId,
        receiverUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({ message: "connection req send succefully", data });
    } catch (error) {
      res.status(402).send("something went wrong! " + error.message);
    }
  }
);

module.exports = { requestRouter };
