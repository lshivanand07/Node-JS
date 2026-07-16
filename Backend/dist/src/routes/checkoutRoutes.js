"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const checkoutController_1 = require("../controllers/checkoutController");
const authorization_1 = require("../middleware/authorization");
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
router.post('/checkout-orderItem', authorization_1.autoMiddleware, checkoutController_1.checkoutController);
//# sourceMappingURL=checkoutRoutes.js.map