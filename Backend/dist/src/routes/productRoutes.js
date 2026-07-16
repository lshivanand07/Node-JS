"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const productController_1 = require("../controllers/productController");
const authorization_1 = require("../middleware/authorization");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
/**
 * @swagger
 * /get-all-products:
 *   get:
 *     summary: Get all products
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/get-all-products", productController_1.getProducts);
/**
 * @swagger
 * /get-one-products/{productID}:
 *   get:
 *     summary: Get one product
 *     description: Get one product by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the product to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-one-products/:productID", productController_1.getProducts);
/**
 * @swagger
 * /get-products-discount/{productID}:
 *   get:
 *     summary: Get products discount
 *     description: Get products discount by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the product discount to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-products-discount/:productID", productController_1.getProductDiscount);
/**
 * @swagger
 * /get-products-reviews/{productID}:
 *   get:
 *     summary: Get products reviews
 *     description: Get products reviews by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the products reviews to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-products-reviews/:productID", productController_1.getProductReviews);
/**
 * @swagger
 * /get-products-images/{productID}:
 *   get:
 *     summary: Get products-images
 *     description: Get products-images by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the products-images to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-products-images/:productID", productController_1.getProductImages);
/**
 * @swagger
 * /get-products-brand/{productID}:
 *   get:
 *     summary: Get products-brand
 *     description: Get products-brand by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the products-brand to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-products-brand/:productID", productController_1.getProductBrand);
/**
 * @swagger
 * /get-products-variants/{productID}:
 *   get:
 *     summary: Get products-variants
 *     description: Get products-variants by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the products-variants to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.get("/get-products-variants/:productID", productController_1.getProductVariants);
/**
 * @swagger
 * /post-product-info:
 *   post:
 *     summary: Create new product with variants and discount
 *     description: Insert product with discount, image, and variants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_name
 *               - description
 *               - price
 *               - stock
 *               - seller_id
 *             properties:
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               seller_id:
 *                 type: integer
 *               discount:
 *                 type: object
 *                 properties:
 *                   discount_percentage:
 *                     type: integer
 *                   start_date:
 *                     type: date
 *                   end_date:
 *                     type: date
 *               image_url:
 *                 type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     price:
 *                       type: integer
 *                     stock:
 *                       type: integer
 *     responses:
 *       200:
 *         description: product data inserted successfully
 */
router.post("/post-product-info", authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('seller', 'admin'), productController_1.createProducts);
/**
 * @swagger
 * /edit-product-info/{productID}:
 *   put:
 *     summary:  Edit product data
 *     description: Edit product dataa by productID
 *     parameters:
 *       - in: path
 *         name: productID
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
 *         description: product data updated successfully
 */
router.put("/edit-product-info/:productID", authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('seller', 'admin'), productController_1.updateProduct);
/**
 * @swagger
 * /delete-product/{productID}:
 *   delete:
 *     summary: Delete product
 *     description: Delete product by productID
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: integer
 *         description: productID of the products to delete
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: productID is not found
 */
router.delete("/delete-product/:productID", authorization_1.autoMiddleware, (0, roleMiddleware_1.authorizeRoles)('seller', 'admin'), productController_1.deleteProduct);
//# sourceMappingURL=productRoutes.js.map