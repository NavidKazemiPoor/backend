const User = require("./../model/User");
const StatusCodes = require("http-status-codes");
const CustomError = require("./../errors");
const { attachCookiesToResponse, createTokenUser } = require('../utils');

// ساخت یوزر
const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  // تبدیل اولین عضویت به ادمین
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  console.log(email);
  console.log(name);
  console.log(password);
  console.log(role);
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: role,
  });

  res.status(StatusCodes.CREATED).json(user);
};
// end
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  res.status(StatusCodes.OK).json(user);
};
const getCurrentUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.status(StatusCodes.OK).json(user);
};
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "حذف با موفقیت انجام شد" });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, email, name } = req.body;
  const user = {
    name: name,
    password: password,
    email: email,
  };
  const users = await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(users);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "ایمیل یا پسورد خالی است." });
      return
  }
  const user = await User.findOne({ email,password });
  console.log(user);
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "ایمیل یا پسورد اشتباه است." });
      return
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({user,tokenUser});
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  getCurrentUser,
  logout,
  login,
};
