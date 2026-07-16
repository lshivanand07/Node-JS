import  express from "express";
const router = express.Router()

import { loginUser } from "../controllers/loginController"


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
router.post('/login', loginUser);

export { router }



