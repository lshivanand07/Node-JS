import  Express  from "express";
const router = Express.Router()

import {getReturnStatus, getRefundStatus, createReturnOrders, updateReturnStatusByOrderID, updateRefundsStatusOrderID} from '../controllers/returnOrderController'
import { autoMiddleware } from '../middleware/authorization'

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
router.get('/get-return-status/:orderID', autoMiddleware, getReturnStatus)

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
router.get('/get-refund-status/:orderID', autoMiddleware, getRefundStatus)

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
router.post('/post-return-orders', autoMiddleware, createReturnOrders)

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
router.put('/edit-return-order-status/:orderID', autoMiddleware, updateReturnStatusByOrderID);

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
router.put('/edit-refund-status/:orderID', autoMiddleware, updateRefundsStatusOrderID);

export {router}