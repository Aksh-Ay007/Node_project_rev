const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DATABASE_URL;


const connectDb = async () => {
  await mongoose.connect(DB_URL);
};

module.exports=connectDb
