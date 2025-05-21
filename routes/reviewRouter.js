const express = require("express");

const {
  getAllReview,
  createReview,
  getSingleReview,
  deleteReview,
  getCurrentUserReview,
  updateReview,
  getSingleProductReviews
} = require("./../controller/reviewController");

const router = express.Router();

router.route('/').get(getAllReview).post(createReview)

router.route('/:id').get(getSingleReview).patch(updateReview).delete(deleteReview);
router.route('/single/:id').get(getSingleProductReviews)
router.route('/myreviews/:id').get(getCurrentUserReview);

module.exports = router;
