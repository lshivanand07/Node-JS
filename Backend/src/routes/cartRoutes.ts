import express from "express";

const router = express.Router();

import { getUserCartByUserID, createUserCarts, upadateCartItems, deleteUserCart} from '../controllers/cartsController'
import { autoMiddleware } from '../middleware/authorization'
import { authorizeRoles } from '../middleware/roleMiddleware'

/**
 * @swagger
 * /get-user-cart:
 *   get:
 *     summary: Get user cart
 *     description: Get user carts by user id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: cart is not found
 */
router.get('/get-user-cart', autoMiddleware, authorizeRoles('customer', 'admin'), getUserCartByUserID)

/**
 * @swagger
 * /post-user-cart:
 *   post:
 *     summary: post user cart
 *     description: post user cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *               - variant_id
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               variant_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: user cart inserted successfully
 */
router.post('/post-user-cart', autoMiddleware, authorizeRoles('customer', 'admin'), createUserCarts)

/**
 * @swagger
 * /edit-cart-items/{productVariantID}:
 *   put:
 *     summary: Edit user cart items
 *     description: Edit user cart items by product variantId
 *     parameters:
 *       - in: path
 *         name: productVariantID
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
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: user cart item updated successfully
 */
router.put('/edit-cart-items/:productVariantID', autoMiddleware, authorizeRoles('customer', 'admin'), upadateCartItems)

/**
 * @swagger
 * /delete-cart-product/{productID}/{variantID}:
 *   delete:
 *     summary: Delete user cart item
 *     description: Delete cart item using user ID and product ID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: variantID
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
 *         description: Cart not found
 */
router.delete('/delete-cart-product/:productID/:variantID', autoMiddleware, authorizeRoles('customer', 'admin'), deleteUserCart);

export {router}