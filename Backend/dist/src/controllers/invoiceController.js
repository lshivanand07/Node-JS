"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadInvoice = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const node_fs_1 = __importDefault(require("node:fs"));
const downloadInvoice = async (req, res) => {
    try {
        const orderId = req.params.orderID;
        const userId = req.user.user_id;
        const [rows] = await dbConnection_1.db.query(`SELECT invoice_path, user_id FROM orders WHERE order_id = ?`, [orderId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        const order = rows[0];
        if (order.user_id !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const filePath = order.invoice_path;
        if (!node_fs_1.default.existsSync(filePath)) {
            return res.status(404).json({ message: "Invoice file not found" });
        }
        return res.download(filePath, `invoice_${orderId}.pdf`);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.downloadInvoice = downloadInvoice;
//# sourceMappingURL=invoiceController.js.map