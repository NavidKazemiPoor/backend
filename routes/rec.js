const {
  getProductRecommendations,
} = require("./../controller/productRecomendation");

const express = require("express");
const router = express.Router();


router.route("/:id").get(getProductRecommendations)

module.exports = router;
