"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const returnOrderController_1 = require("../controllers/returnOrderController");
const authorization_1 = require("../middleware/authorization");
/**
 * @swagger
 * /get-return-status/{orderID}:
 *   get:
 *     summary: Get return order status
 *     description: Get return order status by orderID
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *         description: orderID of the return order status to fetch
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
router.get('/get-return-status/:orderID', authorization_1.autoMiddleware, returnOrderController_1.getReturnStatus);
/**
 * @swagger
 * /get-refund-status/{orderID}:
 *   get:
 *     summary: Get refund status
 *     description: Get return order refund status by orderID
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *         description: orderID of the refund status to fetch
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
router.get('/get-refund-status/:orderID', authorization_1.autoMiddleware, returnOrderController_1.getRefundStatus);
/**
 * @swagger
 * /post-return-orders:
 *   post:
 *     summary: post-return-orders
 *     description: post-return-orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *               - orderId
 *             properties:
 *               reason:
 *                 type: string
 *               orderId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: return-orders inserted successfully
 */
router.post('/post-return-orders', authorization_1.autoMiddleware, returnOrderController_1.createReturnOrders);
/**
 * @swagger
 * /edit-return-order-status/{orderID}:
 *   put:
 *     summary: Edit-return-order-status
 *     description: Edit-return-order-status by orderID
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - return_status
 *             properties:
 *               return_status:
 *                 type: string
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
router.put('/edit-return-order-status/:orderID', authorization_1.autoMiddleware, returnOrderController_1.updateReturnStatusByOrderID);
/**
 * @swagger
 * /edit-refund-status/{orderID}:
 *   put:
 *     summary: Edit-refund-status
 *     description: Edit-refund-status by orderID
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refund_status
 *             properties:
 *               refund_status:
 *                 type: string
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
router.put('/edit-refund-status/:orderID', authorization_1.autoMiddleware, returnOrderController_1.updateRefundsStatusOrderID);
//# sourceMappingURL=returnOrderRoutes.js.map