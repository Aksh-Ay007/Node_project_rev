const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  //read the token,
  //validate token
  //find the user
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error(
        "token is not valid..Please login to access the request..!"
      );
    }

    const varifyToken = await jwt.verify(token, "nodeRev@777!");

    const { _id } = varifyToken;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user is not found");
    }
    if (!varifyToken) {
      throw new Error("please login again");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send("varification failed " + error.message);
  }
};

module.exports = { userAuth };
