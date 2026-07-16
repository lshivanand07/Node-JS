"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const couponsController_1 = require("../controllers/couponsController");
const authorization_1 = require("../middleware/authorization");
/**
 * @swagger
 * /get-all-coupons:
 *   get:
 *     summary: Get all coupons
 *     description: Get all coupons
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-all-coupons', authorization_1.autoMiddleware, couponsController_1.getCoupons);
/**
 * @swagger
 * /get-one-coupons/{couponID}:
 *   get:
 *     summary: Get one coupon
 *     description: Get one coupon by couponID
 *     parameters:
 *       - in: path
 *         name: couponID
 *         required: true
 *         schema:
 *           type: integer
 *         description: couponID of the coupons to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: couponID is not found
 */
router.get('/get-one-coupons/:couponID', authorization_1.autoMiddleware, couponsController_1.getCoupons);
/**
 * @swagger
 * /get-user-coupons/{userID}:
 *   get:
 *     summary: Get user coupon
 *     description: Get user coupon by userID
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *         description: userID of the user coupons to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: coupons is not found
 */
router.get('/get-user-coupons/:userID', authorization_1.autoMiddleware, couponsController_1.getCoupons);
/**
 * @swagger
 * /post-coupons:
 *   post:
 *     summary:  post New coupon
 *     description: post New coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coupon_code
 *                - discount
 *                - expiry_date
 *                - min_purchase_amount
 *                - max_discount
 *                - user_limit
 *             properties:
 *               coupon_code:
 *                 type: string
 *               discount:
 *                 type: integer
 *               expiry_date:
 *                 type: date
 *               min_purchase_amount:
 *                 type: integer
 *               max_discount:
 *                 type: integer
 *               user_limit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: user data inserted successfully
 */
router.post('/post-coupons', authorization_1.autoMiddleware, couponsController_1.createCoupons);
/**
 * @swagger
 * /post-user-coupons:
 *   post:
 *     summary:  insert New user-coupons
 *     description: insert New user-coupons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - couponCode
 *               - used
 *               - user_id
 *               - usage_count
 *             properties:
 *               couponCode:
 *                 type: string
 *               used:
 *                 type: boolean
 *               user_id:
 *                 type: integer
 *               usage_count:
 *                 type: integer
 *     responses:
 *       200:
 *         description: user coupon inserted successfully
 */
router.post('/post-user-coupons', authorization_1.autoMiddleware, couponsController_1.createUserCoupons);
/**
 * @swagger
 * /edit-coupons/{couponID}:
 *   put:
 *     summary: Edit coupons
 *     description: Edit Coupons by user Id
 *     parameters:
 *       - in: path
 *         name: couponID
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
 *         description: user cart updated successfully
 */
router.put('/edit-coupons/:couponID', authorization_1.autoMiddleware, couponsController_1.updateCoupons);
//# sourceMappingURL=couponsRoutes.js.map