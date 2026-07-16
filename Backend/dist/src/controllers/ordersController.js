"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrders = exports.getAllOrders = exports.getOrders = void 0;
const ordersModel_1 = require("../models/ordersModel");
const getOrders = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        const orderStatus = req.params.orderStatus;
        const orderID = Number(req.params.orderID);
        const productID = Number(req.params.productID);
        const handelResponse = (rows, message) => {
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(200).send(message);
            }
            else {
                res.status(200).send(data);
            }
        };
        if (orderID) {
            const rows = await (0, ordersModel_1.fetchOrderByOrderId)(orderID);
            handelResponse(rows, "Order ID not found");
            return;
        }
        if (orderStatus) {
            const rows = await (0, ordersModel_1.fetchOrdersByOrderStatus)(orderStatus);
            handelResponse(rows, "No orders found for this status");
            return;
        }
        if (productID) {
            const rows = await (0, ordersModel_1.individualProductOrder)(productID);
            handelResponse(rows, "No orders found for this product");
            return;
        }
        if (userID) {
            const rows = await (0, ordersModel_1.fetchOrdersByUserId)(userID);
            handelResponse(rows, "No orders found for user");
            return;
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getOrders = getOrders;
const getAllOrders = async (req, res, next) => {
    try {
        const rows = await (0, ordersModel_1.fetchAllOrders)();
        res.status(200).send(rows);
    }
    catch (err) {
        return next(err);
    }
};
exports.getAllOrders = getAllOrders;
const updateOrders = async (req, res, next) => {
    try {
        const userID = Number(req.params.userID);
        const orderId = Number(req.params.orderId);
        const ordersData = req.body;
        const result = await (0, ordersModel_1.updateOrdersByUserId)(userID, orderId, ordersData);
        if (result.affectedRows === 0) {
            res.status(404).send("user id not found");
        }
        else {
            res.status(200).send("order and payment status updated successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateOrders = updateOrders;
//# sourceMappingURL=ordersController.js.map