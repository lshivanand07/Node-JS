"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const cartsController_1 = require("../controllers/cartsController");
const authorization_1 = require("../middleware/authorization");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
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
router.get('/get-user-cart', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin'), cartsController_1.getUserCartByUserID);
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
router.post('/post-user-cart', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin'), cartsController_1.createUserCarts);
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
router.put('/edit-cart-items/:productVariantID', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin'), cartsController_1.upadateCartItems);
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
router.delete('/delete-cart-product/:productID/:variantID', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin'), cartsController_1.deleteUserCart);
//# sourceMappingURL=cartRoutes.js.map