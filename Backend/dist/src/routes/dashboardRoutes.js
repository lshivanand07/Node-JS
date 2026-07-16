"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const authorization_1 = require("../middleware/authorization");
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
router.get('/get-flipkart-records', authorization_1.autoMiddleware, dashboardController_1.default);
//# sourceMappingURL=dashboardRoutes.js.map