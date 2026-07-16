"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoupons = exports.createUserCoupons = exports.createCoupons = exports.getCoupons = void 0;
const couponsModel_1 = require("../models/couponsModel");
const getCoupons = async (req, res, next) => {
    try {
        const userID = Number(req.params.userID);
        const couponID = Number(req.params.couponID);
        if (userID && !couponID) {
            const rows = await (0, couponsModel_1.fetchCouponsByUserId)(userID);
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("user id not found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else if (couponID) {
            const rows = await (0, couponsModel_1.fetchOneCouponsByCouponId)(couponID);
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("coupon id not found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else {
            const rows = await (0, couponsModel_1.fetchCoupons)();
            res.status(200).send(rows);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getCoupons = getCoupons;
const createCoupons = async (req, res, next) => {
    try {
        const couponData = req.body;
        const result = await (0, couponsModel_1.insertCoupons)(couponData);
        res.status(201).send({ message: "couponData inserted successfully",
            data: result });
    }
    catch (err) {
        return next(err);
    }
};
exports.createCoupons = createCoupons;
const createUserCoupons = async (req, res, next) => {
    try {
        const userCouponsData = req.body;
        const result = await (0, couponsModel_1.insertUserCoupons)(userCouponsData);
        if (!result) {
            return res.status(404).send("Coupon not found");
        }
        res.status(201).send({ message: "User couponData inserted successfully",
            data: result });
    }
    catch (err) {
        return next(err);
    }
};
exports.createUserCoupons = createUserCoupons;
const updateCoupons = async (req, res, next) => {
    try {
        const couponID = Number(req.params.couponID);
        const couponsData = req.body;
        const result = await (0, couponsModel_1.updateCouponsById)(couponID, couponsData);
        if (result.affectedRows === 0) {
            res.status(404).send("coupon id Not found");
        }
        else {
            res.status(200).send("coupon data updated successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateCoupons = updateCoupons;
//# sourceMappingURL=couponsController.js.map