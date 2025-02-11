const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/shreedhar";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

module.exports = mongoose;
