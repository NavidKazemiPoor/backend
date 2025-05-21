const {
  createProduct,getAllProduct,getSingleProduct,deleteProduct,uploadImage,updateProduct,
  searchProduct
} = require("../controller/productController");
const express = require('express')

const router = express.Router();

router.route('/').get(getAllProduct).post(createProduct)
router.route('/search').get(searchProduct)
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)
router.route('/uploadimg').post(uploadImage)

module.exports = router;