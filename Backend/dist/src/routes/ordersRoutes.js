"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const ordersController_1 = require("../controllers/ordersController");
const authorization_1 = require("../middleware/authorization");
/**
 * @swagger
 * /get-all-orders:
 *   get:
 *     summary: Get all orders
 *     description: Get all orders
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-all-orders', authorization_1.autoMiddleware, ordersController_1.getAllOrders);
/**
 * @swagger
 * /get-orders-By-status/{orderStatus}:
 *   get:
 *     summary: Get orders-By-status
 *     description: Get orders-By-status by orderStatus
 *     parameters:
 *       - in: path
 *         name: orderStatus
 *         required: true
 *         schema:
 *           type: string
 *         description: orderStatus of the orders-By-status to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: orderStatus is not found
 */
router.get('/get-orders-By-status/:orderStatus', authorization_1.autoMiddleware, ordersController_1.getOrders);
/**
 * @swagger
 * /Individual-Product-Order-history/{productID}:
 *   get:
 *     summary: Get Individual-Product-Order-history
 *     description: Get Individual-Product-Order-history by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get('/Individual-Product-Order-history/:productID', authorization_1.autoMiddleware, ordersController_1.getOrders);
/**
 * @swagger
 * /get-user-orders:
 *   get:
 *     summary: Get user-orders
 *     description: Get user-orders by userID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: userID is not found
 */
router.get('/get-user-orders', authorization_1.autoMiddleware, ordersController_1.getOrders);
/**
 * @swagger
 * /get-order/{orderID}:
 *   get:
 *     summary: Get one order
 *     description: Get one order by orderID
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: orderID is not found
 */
router.get('/get-order/:orderID', authorization_1.autoMiddleware, ordersController_1.getOrders);
/**
 * @swagger
 * /edit-user/{userID}/order/{orderId}:
 *   put:
 *     summary:  Edit order data
 *     description: Edit order data by used id and order id
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: order data updated successfully
 */
router.put('/edit-user/:userID/order/:orderId', authorization_1.autoMiddleware, ordersController_1.updateOrders);
//# sourceMappingURL=ordersRoutes.js.map