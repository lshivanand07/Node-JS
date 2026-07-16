"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const checkoutModel_1 = require("../models/checkoutModel");
const checkoutController = async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = req.user.user_id;
        const orderData = req.body;
        const result = await (0, checkoutModel_1.createOrderFromCart)(userID, orderData);
        res.json({ message: "Order placed successfully",
            order: result
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.checkoutController = checkoutController;
//# sourceMappingURL=checkoutController.js.map