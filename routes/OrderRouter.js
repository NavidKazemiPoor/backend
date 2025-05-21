const {
    createOrder,getAllOrders,getSingleOrder,getCurrentOrder,deleteOrder,editOrder
} = require("./../controller/ordersController")

const express = require("express")
const router = express.Router();

router.route('/').get(getAllOrders).post(createOrder);
router.route("/:id").get(getSingleOrder).patch(editOrder).delete(deleteOrder);

router.route('/myorders/:id').get(getCurrentOrder)



module.exports = router;