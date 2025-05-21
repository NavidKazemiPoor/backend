const CustomError = require("./../errors/index");
const Product = require("./../model/Products");
const Orders = require("./../model/Orders");
const { StatusCodes } = require("http-status-codes");
const createOrder = async (req, res) => {
  const { items, total, status, userID } = req.body;
  if (!items || items.length < 1) {
    throw new CustomError.BadRequestError("آیتمی وجود ندارد");
  }
  let orderItems = [];
  for (const item of items) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.BadRequestError("آیتمی با این شناسه یافت نشد");
    }
    const { name, price, productImage, _id } = dbProduct;
    const singleOrderItem = {
      name,
      price,
      image: productImage,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
  }
  const order = await Orders.create({
    orderItems,
    total,
    status,
    user: userID,
  });
  res.status(StatusCodes.CREATED).json(order);
};
const getAllOrders = async (req, res) => {
  const order = await Orders.find({}).sort({ createdAt: -1 }).populate({
    path:'user',select:"name role",options: { strictPopulate: false }
  });

  res.status(StatusCodes.OK).json({ order });
};
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Orders.findById({ _id: id });
  if (!order) {
    throw new CustomError.BadRequestError("سفارشی با این شناسه وجود ندارد");
  }
  res.status(StatusCodes.OK).json(order);
};

const getCurrentOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Orders.find({ user: id }).populate({
    path:'user',select:"name",options: { strictPopulate: false }
  });;
  
  if (!order) {
    throw new CustomError.BadRequestError("سفارشی با این شناسه وجود ندارد");
  }
  res.status(StatusCodes.OK).json(order);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Orders.deleteOne({ _id: id });
  if (!order) {
    throw new CustomError.BadRequestError("سفارشی با این شناسه وجود ندارد");
  }
  res.status(StatusCodes.OK).json("حذف انجام شد.");
  // res.status(StatusCodes.OK).json(order);
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Orders.findByIdAndUpdate(
    { _id: id },
    { status: status },
    { runValidators: true, new: true }
  );
  if (!order) {
    throw new CustomError.BadRequestError("سفارشی با این شناسه وجود ندارد");
  }
  res.status(StatusCodes.OK).json(order);
};
module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrder,
  deleteOrder,
  editOrder,
};
