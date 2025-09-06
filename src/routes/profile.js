const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateProfileEdit } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("user profile is: " + user);
  } catch (error) {
    res.status(401).send("ERR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("invalid profile field edit..!");
    }

    const loginUser = req.user;

    Object.keys(req.body).forEach((key) => (loginUser[key] = req.body[key]));
    await loginUser.save();

    res.json({
      message: `${loginUser.firstName} your profile is updated succefully...!`,
      data:loginUser
    });
  } catch (error) {
    res.status(402).send("something went wrong! " + error.message);
  }
});

module.exports = { profileRouter };
