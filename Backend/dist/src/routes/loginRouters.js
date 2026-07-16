"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const loginController_1 = require("../controllers/loginController");
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIs..."
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginController_1.loginUser);
//# sourceMappingURL=loginRouters.js.map