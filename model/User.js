const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام نمیتواند خالی باشد"],
  },
  email: {
    unique: true,
    type: String,
    required: [true, "ایمیل نباید خالی باشد"],
    validate: {
      validator: validator.isEmail,
      message: "ایمیل معتبر وارد کنید",
    },
  },
  password: {
    type: String,
    required: [true, "پسورد نباید خالی باشد"],
  },
  role: {
    type: String,
    default: "user",
  },
});


module.exports = mongoose.model('User', UserSchema);
