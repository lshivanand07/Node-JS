import  express from "express";

const router = express.Router()

import {getReviews, createReviews, updateReviews, deleteReviews} from "../controllers/reviewsController";
import { autoMiddleware } from '../middleware/authorization'

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
router.get('/get-all-reviews', getReviews);

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
router.get('/get-one-reviews/:reviewID', getReviews);

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
router.post('/post-reviews', autoMiddleware, createReviews);

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
router.put('/edit-review/:reviewID',autoMiddleware,  updateReviews);

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
router.delete('/delete-review/:reviewID', autoMiddleware, deleteReviews);

export {router}