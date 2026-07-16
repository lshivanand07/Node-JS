"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRefundsStatusOrderID = exports.updateReturnStatusByOrderID = exports.createReturnOrders = exports.getRefundStatus = exports.getReturnStatus = void 0;
const returnOrderModel_1 = require("../models/returnOrderModel");
const getReturnStatus = async (req, res, next) => {
    try {
        const orderID = Number(req.params.orderID);
        const rows = await (0, returnOrderModel_1.fetchReturnStatus)(orderID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("Order Id is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getReturnStatus = getReturnStatus;
const getRefundStatus = async (req, res, next) => {
    try {
        const orderID = Number(req.params.orderID);
        const rows = await (0, returnOrderModel_1.fetchRefundStatus)(orderID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("Order Id is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getRefundStatus = getRefundStatus;
const createReturnOrders = async (req, res, next) => {
    try {
        const returnOrderData = req.body;
        if (returnOrderData.reason === undefined) {
            res.status(400).send("Return order reason required");
        }
        else {
            const result = await (0, returnOrderModel_1.insertReturnOrders)(returnOrderData);
            res.status(201).send({ message: "return data has been successfully inserted.",
                data: result
            });
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.createReturnOrders = createReturnOrders;
const updateReturnStatusByOrderID = async (req, res, next) => {
    try {
        const orderID = Number(req.params.orderID);
        const returnOrderData = req.body;
        const result = await (0, returnOrderModel_1.updateReturnOrder)(orderID, returnOrderData);
        if (result.returnStatusResult.affectedRows === 0) {
            res.status(404).send("order Id is Not Found");
        }
        else {
            res.status(200).send("return status updated successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateReturnStatusByOrderID = updateReturnStatusByOrderID;
const updateRefundsStatusOrderID = async (req, res, next) => {
    try {
        const orderID = Number(req.params.orderID);
        const refundData = req.body;
        const result = await (0, returnOrderModel_1.updateRefunds)(orderID, refundData);
        if (!result || result.result.affectedRows === 0) {
            res.status(404).send("order Id is Not Found");
        }
        else {
            res.status(200).send("Refunds status updated successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateRefundsStatusOrderID = updateRefundsStatusOrderID;
//# sourceMappingURL=returnOrderController.js.map