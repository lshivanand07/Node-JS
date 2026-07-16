import express from "express";
import { downloadInvoice } from "../controllers/invoiceController";
import { autoMiddleware } from "../middleware/authorization"

const router = express.Router();


/**
 * @swagger
 * /download-invoice/{orderID}:
 *   get:
 *     summary: Download invoice pdf
 *     description: Download invoice order pdf
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: user order invoice pdf not found
 */
router.get("/download-invoice/:orderID", autoMiddleware, downloadInvoice);

export {router};