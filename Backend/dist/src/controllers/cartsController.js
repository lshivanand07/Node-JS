"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCart = exports.upadateCartItems = exports.createUserCarts = exports.getUserCartByUserID = void 0;
const cartsModel_1 = require("../models/cartsModel");
// get user cart
const getUserCartByUserID = async (req, res, next) => {
    try {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = req.user.user_id;
        console.log(userID);
        const rows = await (0, cartsModel_1.fetchOneUserCartsByUserId)(userID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(200).send({ message: 'Your Cart is Empty' });
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getUserCartByUserID = getUserCartByUserID;
const createUserCarts = async (req, res, next) => {
    try {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = req.user.user_id;
        const cartData = req.body;
        const result = await (0, cartsModel_1.createUserCart)(userID, cartData);
        res.status(201).send({ message: "cart created successfully.",
            data: result });
    }
    catch (err) {
        return next(err);
    }
};
exports.createUserCarts = createUserCarts;
const upadateCartItems = async (req, res, next) => {
    try {
        const productVariantID = Number(req.params.productVariantID);
        const cartData = req.body;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = req.user.user_id;
        const result = await (0, cartsModel_1.updateCart)(productVariantID, cartData, userID);
        if (result.affectedRows === 0) {
            res.status(404).send("product variant is Not Found");
        }
        else {
            res.status(200).send("cart item upadate successfull");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.upadateCartItems = upadateCartItems;
const deleteUserCart = async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = req.user.user_id;
        console.log(userID);
        const productID = Number(req.params.productID);
        const variantID = Number(req.params.variantID);
        const result = await (0, cartsModel_1.deleteUserCartByUserId)(userID, productID, variantID);
        if (result.affectedRows === 0) {
            res.status(404).send("userID id is Not Found");
        }
        else {
            res.status(200).send("user cart delete Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteUserCart = deleteUserCart;
//# sourceMappingURL=cartsController.js.map