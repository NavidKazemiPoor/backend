const {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  login,
  getCurrentUser,
  logout
} = require("./../controller/UserController");
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const express = require('express')

const router = express.Router();

router.route('/').get(authenticateUser, authorizePermissions('admin'),getAllUsers).post(createUser)
router.route('/:id').get(authenticateUser, authorizePermissions('admin'),getSingleUser).patch(updateUser).delete(deleteUser)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/showme/:id').get(getCurrentUser);

module.exports = router;