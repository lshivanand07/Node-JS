import  express  from "express";
const router = express.Router()

import { getAddress, createAddress, updateAddress, deleteAddress} from "../controllers/addressController";
import { autoMiddleware }  from '../middleware/authorization'

/**
 * @swagger
 * /get-all-address:
 *   get:
 *     summary: Get all address
 *     description: Get all address
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-all-address', autoMiddleware, getAddress);

/**
 * @swagger
 * /get-user-address:
 *   get:
 *     summary: Get user address by user ID
 *     description: Retrieve address details using user ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User ID not found
 */
router.get('/get-user-address', autoMiddleware, getAddress);

/**
 * @swagger
 * /post-user-address:
 *   post:
 *     summary: post User address
 *     description: post User address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - state
 *               - districts
 *               - city
 *               - street
 *               - landmark
 *               - pincode
 *               - user_address_status
 *               - is_default
 *             properties:
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               districts:
 *                 type: string
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               landmark:
 *                 type: string
 *               pincode:
 *                 type: bigint
 *               user_address_status:
 *                 type: string
 *               is_default:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: address inserted successfully
 */
router.post('/post-user-address', autoMiddleware, createAddress);

/**
 * @swagger
 * /edit-user-address/{userAddressStatus}:
 *   put:
 *     summary: edit User address
 *     description: edit User address by user id and userAddressStatus
 *     parameters:
 *       - in: path
 *         name: userAddressStatus
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: address update successfully
 *       401:
 *         description: userID not found
 */
router.put('/edit-user-address/:userAddressStatus', autoMiddleware, updateAddress);


/**
 * @swagger
 * /delete-user-address/{userAddressStatus}:
 *   delete:
 *     summary: Delete user address
 *     description: Delete user address by user ID and address status
 *     parameters:
 *       - in: path
 *         name: userAddressStatus
 *         required: true
 *         schema:
 *           type: string
 *         description: User address status
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User ID not found
 */
router.delete('/delete-user-address/:userAddressStatus', autoMiddleware, deleteAddress);

export  {router}
