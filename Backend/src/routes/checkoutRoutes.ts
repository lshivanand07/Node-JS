import express  from "express";

const router = express.Router();

import { checkoutController } from '../controllers/checkoutController'
import { autoMiddleware } from '../middleware/authorization'

/**
 * @swagger
 * /checkout-orderItem:
 *   post:
 *     summary: post order details
 *     description: insert order and order items into db
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payment_method_name
 *               - transaction_id
 *               - address_status
 *             properties:
 *               payment_method_name:
 *                 type: string
 *               transaction_id:
 *                 type: string
 *               address_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order placed successfully
 */
router.post('/checkout-orderItem', autoMiddleware, checkoutController)

export {router}