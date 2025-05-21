// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');


const connectDB = (URL) => {
    return mongoose
      .connect(URL)
      .then(() => console.log("Connected."))
      .catch((err) => console.log(err));
  };
  

module.exports = connectDB;