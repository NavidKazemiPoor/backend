const CustomAPIError = require('./CustomAPIError');
const NotFoundError = require('./NotFoundError');
const UnauthenticatedError = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');
const BadRequestError = require('./BadRequestError');
module.exports = {
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
};
