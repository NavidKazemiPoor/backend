const Review = require("./../model/Review");
const CustomError = require("../errors");

const Product = require("./../model/Products");
const { StatusCodes } = require("http-status-codes");
const createReview = async (req, res) => {
  const { product: productId, user, comment } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};
const getAllReview = async (req, res) => {
  const reviews = await Review.find({}).populate([
    {
      path: "product",
      select: "name",
    },
    { path: "user", select: "name" },
  ]);
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById({ _id: id }).populate([
    { path: "user", select: "name" },
    { path: "product", select: "name" }
  ]
  );

  res.status(StatusCodes.OK).json(review);
};
const deleteReview = async (req, res) => {
    const {id} = req.params;
    const review = await Review.findByIdAndDelete({_id:id});
res.status(StatusCodes.OK).json("حذف انجام شد")
};
const getCurrentUserReview = async (req, res) => {
    const {id} = req.params;
    const review = await Review.find({user:id}).populate([
        {path:'product',select:'name'},
        {path:'user',select:'name'}
    ]);

    res.status(StatusCodes.OK).json(review);
};
const updateReview = async (req, res) => {
    const {id} = req.params;
    const {verify,answer} = req.body;
    const review = await Review.findByIdAndUpdate({_id:id},{verify,answer});
    res.status(StatusCodes.OK).json(review);
};


const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate([{
      path: 'product',
      select: 'name',
    },{path:"user",select:"name"}]);
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  };

module.exports = {
  getAllReview,
  getSingleProductReviews,
  createReview,
  getSingleReview,
  deleteReview,
  getCurrentUserReview,
  updateReview,
};
