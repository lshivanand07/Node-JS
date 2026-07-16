"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardModel_1 = __importDefault(require("../models/dashboardModel"));
const getRecords = async (req, res, next) => {
    try {
        const result = await (0, dashboardModel_1.default)();
        console.log('result', result);
        res.status(200).send(result);
    }
    catch (err) {
        return next(err);
    }
};
exports.default = getRecords;
//# sourceMappingURL=dashboardController.js.map