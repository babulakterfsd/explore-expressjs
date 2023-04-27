const express = require('express');

const router = express.Router();
const orderController = require('../../controllers/order.controller');

/*
 * @api {get} /orders All orders
 * @apiDescription Get all the orders
 * @apiPermission every logged in user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the orders.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.route('/').get(orderController.getAllOrders);

// get specific users orders
router.route('/:email').get(orderController.getSpecificUserOrders);

router
    .route('/:id')
    // update order status
    .put(orderController.updateAnOrderStatus)
    // delete order
    .delete(orderController.deleteAnOrder);

/*
 * @api {post} /orders/placeorder ----> Place an order
 * @apiDescription Place an order
 * @apiPermission every logged in user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess {Object[]} orderde package details.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only an user can place an order
 */
router.route('/placeorder').post(orderController.placeOrder);

module.exports = router;
