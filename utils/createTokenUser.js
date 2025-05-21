const createTokenUser = (user) => {
  return { name: user.fullName, userID: user._id, role: user.role };
};

module.exports = createTokenUser;
