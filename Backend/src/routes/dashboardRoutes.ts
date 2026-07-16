import express  from "express"
const router = express.Router()

import getRecords from "../controllers/dashboardController"
import { autoMiddleware } from "../middleware/authorization";


/**
 * @swagger
 * /get-flipkart-records:
 *   get:
 *     summary: Get Flipkart records
 *     description: Get Flipkart records
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-flipkart-records', autoMiddleware, getRecords);

export {router}