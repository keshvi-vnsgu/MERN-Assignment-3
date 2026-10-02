const { connect } = require("mongoose");

const connectDB = () => {
  try {
    connect(process.env.DBURI);
    console.log("Mongo Connected");
  } catch (e) {
    console.log("Error Connecting to Mongo!!");
  }
};

module.exports = connectDB;