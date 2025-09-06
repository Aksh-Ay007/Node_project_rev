const express=require('express')
const {userAuth}=require('../middleware/auth')

const requestRouter=express.Router()


requestRouter.post("/sendConnectionReq", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName, "send connection request");
  } catch (error) {
    res.status(402).send("something went wrong! " + error.message);
  }
});



module.exports={requestRouter}
