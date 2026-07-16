"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const invoiceController_1 = require("../controllers/invoiceController");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
exports.router = router;
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
router.get("/download-invoice/:orderID", authorization_1.autoMiddleware, invoiceController_1.downloadInvoice);
//# sourceMappingURL=invoiceRoutes.js.map