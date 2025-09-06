const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (firstName.length < 4 || firstName.length > 10) {
    throw new Error("name should be beetween 4 and 15");
  } else if (lastName.length < 4 || lastName.length > 15) {
    throw new Error("lastName should be beetween 4 and 15");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("give valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("your password is not strong...!");
  }
};

const validateProfileEdit=(req)=>{

const user=req.body
  const allowedEditFiled = [
    "firstName",
    "lastName",
    "skills",
    "about",
    "photoUrl",
  ];


  const isAllowed=Object.keys(user).every((k)=>allowedEditFiled.includes(k))


  return isAllowed

}

module.exports = { validateSignupData, validateProfileEdit };
