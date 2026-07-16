"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const userController_1 = require("../controllers/userController");
const authorization_1 = require("../middleware/authorization");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
/**
 * @swagger
 * /get-all-users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/get-all-users', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), userController_1.getUsers);
/**
 * @swagger
 * /get-one-user/{userID}:
 *   get:
 *     summary: Get one user
 *     description: Get one user
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *         description: userID of the users to fetch
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/get-one-user/:userID', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), userController_1.getUsers);
/**
 * @swagger
 * /get-my-info:
 *   get:
 *     summary: Get one user
 *     description: Get one user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get('/get-my-info', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin', 'seller'), userController_1.getMyDetails);
/**
 * @swagger
 * /post-one-user:
 *   post:
 *     summary: New User Register
 *     description: New User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - user_name
 *               - email
 *               - password
 *               - dob
 *               - phone
 *               - role
 *             properties:
 *               user_id:
 *                 type: integer
 *               user_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               dob:
 *                 type: date
 *               phone:
 *                 type: bigint
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: user data inserted successfully
 */
router.post('/post-one-user', userController_1.postUsers);
/**
 * @swagger
 * /edit-one-user/{userID}:
 *   put:
 *     summary: edit User info
 *     description: edit User info by user id
 *     parameters:
 *       - in: path
 *         name: userID
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
 *         description: Updated successfully
 *       404:
 *         description: user id not found
 */
router.put('/edit-one-user/:userID', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin', 'seller'), userController_1.updateUsers);
/**
 * @swagger
 * /delete-one-user/{userID}:
 *   delete:
 *     summary: Delete one user
 *     description: Delete one user by user id
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *         description: userID of the users to Delete
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/delete-one-user/:userID', authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('customer', 'admin', 'seller'), userController_1.deleteUsers);
//# sourceMappingURL=userRoutes.js.map