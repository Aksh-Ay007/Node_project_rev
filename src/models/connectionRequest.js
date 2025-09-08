const { status, type } = require("express/lib/response");
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({senderUserId:1,receiverUserId:1})

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
    throw new Error("you cannot send request yoursel..!");
  }

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
