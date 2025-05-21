const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام محصول نمیتواند خالی باشد"],
  },
  price: {
    type: Number,
    required: [true, "قیمت محصول نمیتواند خالی باشد"],
  },
  description: {
    type: String,
    default: "ندارد",
  },
  category: {
    type: String,
    required: [true, "دسته بندی نمیتواند خالی باشد"],
    enum: ["لپ تاپ", "کنسول", "کامپیوتر"],
  },
 
  productImage:{
    type:String,
    default:"/uploads/example.png"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
