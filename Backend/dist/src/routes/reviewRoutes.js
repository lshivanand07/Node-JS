"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const reviewsController_1 = require("../controllers/reviewsController");
const authorization_1 = require("../middleware/authorization");
/**
 * @swagger
 * /get-all-reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Get all reviews
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-all-reviews', reviewsController_1.getReviews);
/**
 * @swagger
 * /get-one-reviews/{reviewID}:
 *   get:
 *     summary: Get one review
 *     description: Retrieve a single review by its ID
 *     parameters:
 *       - in: path
 *         name: reviewID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to fetch
 *     responses:
 *       200:
 *         description: Successfully retrieved review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Review not found
 */
router.get('/get-one-reviews/:reviewID', reviewsController_1.getReviews);
/**
 * @swagger
 * /post-reviews:
 *   post:
 *     summary: Post a review about the product
 *     description: Post a review about the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - rating
 *               - comment
 *               - product_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               product_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: review inserted successfully
 */
router.post('/post-reviews', authorization_1.autoMiddleware, reviewsController_1.createReviews);
/**
 * @swagger
 * /edit-review/{reviewID}:
 *   put:
 *     summary: Edit review by reviewID
 *     description: Edit review by reviewID
 *     parameters:
 *       - in: path
 *         name: reviewID
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
 *         description: review updated successfully
 */
router.put('/edit-review/:reviewID', authorization_1.autoMiddleware, reviewsController_1.updateReviews);
/**
 * @swagger
 * /delete-review/{reviewID}:
 *   delete:
 *     summary: delete one review
 *     description: delete a single review by its ID
 *     parameters:
 *       - in: path
 *         name: reviewID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to fetch
 *     responses:
 *       200:
 *         description: review deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Review not found
 */
router.delete('/delete-review/:reviewID', authorization_1.autoMiddleware, reviewsController_1.deleteReviews);
//# sourceMappingURL=reviewRoutes.js.map