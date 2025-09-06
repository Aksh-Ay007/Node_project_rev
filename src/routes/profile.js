const express = require("express");
const { userAuth } = require("../middleware/auth");
const {
  validateProfileEdit,
  validatePassword,
} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
      message: `Hey ${user.firstName}, your password has been updated successfully.`,
    });
  } catch (error) {
    res.status(402).send("something went wrong! " + error.message);
  }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const { newPassword } = req.body;

    validatePassword(req);

    if (!newPassword) {
      throw new Error("new password is required");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: `hey ${user.firstName} your password is updated and your new password is :`,
      data: newPassword,
    });

    console.log(password);
  } catch (error) {
    res.send("something went wrong " + error.message);
  }
});

module.exports = { profileRouter };
