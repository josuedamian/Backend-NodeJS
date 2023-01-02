const mongoose = require("mongoose");

const dbConnect = async (req, res) => {
  mongoose.set("strictQuery", true);
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
