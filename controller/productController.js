const { StatusCodes } = require("http-status-codes");
const Product = require("./../model/Products");
const CustomError = require("./../errors");
const path = require('path');

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};
const getAllProduct = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json(product);
};
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });
  res.status(StatusCodes.OK).json(product);
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json(product);
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "حذف انجام شد." });
};
const uploadImage = async (req, res) => {
    // console.log(req);
  if (!req.files) {
    throw new Error("فایلی آپلود نشده")
  }
  const productImage = req.files.Image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};


const searchProduct = async (req, res) => {
  const { name } = req.query;
  console.log(name)
  if (!name) {
    throw new CustomError.BadRequestError("لطفاً نام محصول را وارد کنید");
  }

  const products = await Product.find({name:{ $regex: name, $options: 'i' }});
  res.status(StatusCodes.OK).json(products);
};
module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  uploadImage,
  updateProduct,
  searchProduct
};
