const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser,sendVerificationEmail } = require('../utils');
const crypto = require("crypto")
const register = async (req, res) => { //ثبت نام
  const { email, fullName, password } = req.body;

  // آیا ایمیل وجود دارد
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('این ایمیل قبلا ثبت شده');
  }

  // تبدیل اولین عضویت به ادمین
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(25).toString('hex');

  const user = await User.create({
    fullName,
    email,
    password,
    role,
    verificationToken,
  });
  const origin = 'http://localhost:3000';
  // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

  // const tempOrigin = req.get('origin');
  // const protocol = req.protocol;
  // const host = req.get('host');
  // const forwardedHost = req.get('x-forwarded-host');
  // const forwardedProtocol = req.get('x-forwarded-proto');

  await sendVerificationEmail({
    name: user.fullName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'با موفقیت ثبت شد لطفا ایمیل را تایید کنید',
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('در وریفای ایمیل مشکلی پیش آمده.');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('در وریفای ایمیل مشکلی پیش آمده.');
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'ایمیل با موقیت تایید شد' });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('ایمیل و پسورد نباید خالی باشد');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('ایمیل یا پسورد اشتباه است');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('ایمیل یا پسورد اشتباه است');
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('ایمیل شما تایید نشده');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
const userD = async (req, res) => {
  await User.deleteMany({});
  res.send("ok")
};
module.exports = {
  register,
  login,
  verifyEmail,
  logout,
  userD,
};
